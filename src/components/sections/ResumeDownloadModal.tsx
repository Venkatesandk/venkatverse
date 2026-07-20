"use client";

import { useState, useEffect, useRef, type ReactNode, type KeyboardEvent, type ClipboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ShieldCheck, Loader2, MessageCircle, PartyPopper, Mail } from "lucide-react";
import { developer } from "@/data/portfolio";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

type Step = "form" | "otp" | "success";

interface DeviceMeta {
  userAgent: string;
  platform: string;
  language: string;
  screen: string;
  timezone: string;
  publicIp?: string;
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
}

interface ResumeDownloadButtonProps {
  className?: string;
  children: ReactNode;
}

export function ResumeDownloadButton({ className, children }: ResumeDownloadButtonProps) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-resume-download"))} className={className}>
      {children}
    </button>
  );
}

function collectDeviceMeta(): Omit<DeviceMeta, "lat" | "lng" | "accuracy" | "publicIp"> {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform || "Unknown",
    language: navigator.language || "Unknown",
    screen: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
  };
}

function getGeoLocation(): Promise<{ lat: number | null; lng: number | null; accuracy: number | null }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: null, lng: null, accuracy: null });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      () => resolve({ lat: null, lng: null, accuracy: null }),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60_000 }
    );
  });
}

async function getPublicIp(): Promise<string | undefined> {
  try {
    const res = await fetch("https://api.ipify.org?format=json", { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { ip?: string };
    return data.ip;
  } catch {
    return undefined;
  }
}

async function buildMeta(): Promise<DeviceMeta> {
  const base = collectDeviceMeta();
  const [geo, publicIp] = await Promise.all([getGeoLocation(), getPublicIp()]);
  return { ...base, ...geo, publicIp };
}

function OtpBoxes({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? "");

  const setDigit = (index: number, digit: string) => {
    const next = digits.map((d, i) => (i === index ? digit : d));
    onChange(next.join("").slice(0, 6));
  };

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        setDigit(index, "");
      } else if (index > 0) {
        setDigit(index - 1, "");
        refs.current[index - 1]?.focus();
      }
      return;
    }
    if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) refs.current[index + 1]?.focus();
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    onChange(pasted);
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="flex justify-center gap-2">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(-1);
            setDigit(i, v);
            if (v && i < 5) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          className="h-12 w-10 rounded-lg border border-border bg-surface text-center text-lg font-bold tracking-widest text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-12 sm:w-11"
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}

export function ResumeDownloadModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [debugOtp, setDebugOtp] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState(developer.social.whatsapp);
  const [greeting, setGreeting] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [visitorMeta, setVisitorMeta] = useState<DeviceMeta | null>(null);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setStep("form");
      setForm({ name: "", email: "", phone: "" });
      setOtp("");
      setError("");
      setInfo("");
      setDebugOtp("");
      setMaskedEmail("");
      setGreeting("");
      setResendIn(0);
      setWhatsappUrl(developer.social.whatsapp);
      void buildMeta().then(setVisitorMeta);
    };
    window.addEventListener("open-resume-download", handler);
    return () => window.removeEventListener("open-resume-download", handler);
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = window.setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [resendIn]);

  const sendOtpRequest = async () => {
    setLoading(true);
    setError("");
    setInfo("");
    setDebugOtp("");
    try {
      const meta = visitorMeta ?? (await buildMeta());
      setVisitorMeta(meta);

      const res = await fetch("/api/resume/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, meta }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send OTP");
      setInfo(data.message);
      setMaskedEmail(data.maskedEmail ?? "");
      if (data.debugOtp) setDebugOtp(data.debugOtp);
      setStep("otp");
      setResendIn(30);
      setOtp("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendOtpRequest();
  };

  const resendOtp = async () => {
    if (resendIn > 0 || loading) return;
    setOtp("");
    await sendOtpRequest();
  };

  const verifyAndDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const meta = visitorMeta ?? (await buildMeta());
      const res = await fetch("/api/resume/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, otp, meta }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Invalid OTP");

      setGreeting(data.greeting ?? "Thanks for downloading!");
      if (data.whatsappUrl) setWhatsappUrl(data.whatsappUrl);
      setStep("success");
      window.dispatchEvent(new CustomEvent("resume-downloaded"));

      const link = document.createElement("a");
      link.href = data.downloadUrl ?? developer.resumeUrl;
      link.download = "Venkatesan-D-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        window.open(data.whatsappUrl ?? developer.social.whatsapp, "_blank", "noopener,noreferrer");
      }, 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="card mb-[var(--mobile-bar)] w-full max-w-md overflow-hidden rounded-t-2xl p-5 sm:mb-0 sm:rounded-2xl sm:p-6"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="mb-1 flex items-center gap-2 text-primary">
                  <ShieldCheck size={18} />
                  <span className="text-sm font-semibold">Download My Resume</span>
                </div>
                <p className="text-xs text-muted">
                  Enter details and verify the OTP sent to your email to unlock the resume.
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-surface-2" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {step === "form" && (
                <motion.form
                  key="form"
                  onSubmit={requestOtp}
                  className="space-y-3"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                >
                  <div>
                    <label htmlFor="resume-name" className="mb-1 block text-xs font-medium">Full Name</label>
                    <input
                      id="resume-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-field !py-2 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="resume-email" className="mb-1 block text-xs font-medium">Email (OTP will be sent here)</label>
                    <input
                      id="resume-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field !py-2 text-sm"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="resume-phone" className="mb-1 block text-xs font-medium">WhatsApp / Mobile</label>
                    <input
                      id="resume-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-field !py-2 text-sm"
                      placeholder="9688213541"
                    />
                  </div>
                  <p className="text-[10px] text-muted">
                    Allow location when prompted so the download log can include approximate lat/long for security.
                  </p>
                  {error && <p className="text-xs text-red-500">{error}</p>}
                  <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending OTP…
                      </>
                    ) : (
                      <>
                        <Mail size={16} /> Send Email OTP
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {step === "otp" && (
                <motion.form
                  key="otp"
                  onSubmit={verifyAndDownload}
                  className="space-y-3"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                >
                  {info && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary"
                    >
                      {info}
                    </motion.p>
                  )}
                  {maskedEmail && (
                    <p className="text-center text-[11px] text-muted">
                      Sent to <span className="font-semibold text-foreground">{maskedEmail}</span>
                    </p>
                  )}
                  {debugOtp && (
                    <p className="rounded-lg border border-dashed border-amber-500/50 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
                      Dev mode (email not configured): <strong>{debugOtp}</strong>
                    </p>
                  )}
                  <div>
                    <label className="mb-2 block text-center text-xs font-medium">Enter 6-digit OTP</label>
                    <OtpBoxes value={otp} onChange={setOtp} />
                  </div>
                  {error && <p className="text-center text-xs text-red-500">{error}</p>}
                  <button type="submit" className="btn btn-primary w-full" disabled={loading || otp.length !== 6}>
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <><Download size={16} /> Verify & Download</>}
                  </button>
                  <div className="flex flex-col gap-1.5 text-center text-xs text-muted">
                    <button
                      type="button"
                      className="hover:text-primary disabled:opacity-50"
                      disabled={resendIn > 0 || loading}
                      onClick={resendOtp}
                    >
                      {resendIn > 0 ? `Resend OTP in ${resendIn}s` : "Resend OTP to email"}
                    </button>
                    <button
                      type="button"
                      className="hover:text-primary"
                      onClick={() => { setStep("form"); setOtp(""); setError(""); setDebugOtp(""); }}
                    >
                      Change details
                    </button>
                  </div>
                </motion.form>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  className="py-2 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  <motion.div
                    className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.15, 1] }}
                    transition={{ duration: 0.55 }}
                  >
                    <PartyPopper size={24} />
                  </motion.div>
                  <p className="font-semibold">{greeting || "Download started!"}</p>
                  <p className="mt-1 text-sm text-muted">
                    A thank-you greeting is opening on WhatsApp. You&apos;ll also get a confirmation email.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp mt-4 w-full"
                  >
                    <WhatsAppIcon width={17} height={17} />
                    Send WhatsApp Thanks
                  </a>
                  <button type="button" className="btn btn-glass mt-2.5 w-full" onClick={() => setOpen(false)}>
                    <MessageCircle size={16} /> Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

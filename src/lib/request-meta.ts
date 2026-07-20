import type { VisitorMeta } from "@/lib/otp-store";

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || undefined;
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    undefined
  );
}

export function buildDeviceSummary(userAgent?: string, platform?: string) {
  const ua = userAgent || "";
  let browser = "Browser";
  if (/edg\//i.test(ua)) browser = "Edge";
  else if (/chrome\//i.test(ua) && !/edg\//i.test(ua)) browser = "Chrome";
  else if (/safari\//i.test(ua) && !/chrome\//i.test(ua)) browser = "Safari";
  else if (/firefox\//i.test(ua)) browser = "Firefox";

  let os = platform || "Unknown OS";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/mac os/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";

  const mobile = /mobile|android|iphone/i.test(ua) ? "Mobile" : "Desktop";
  return `${mobile} · ${os} · ${browser}`;
}

export function parseVisitorMeta(
  request: Request,
  bodyMeta?: Partial<VisitorMeta> | null
): VisitorMeta {
  const userAgent = bodyMeta?.userAgent || request.headers.get("user-agent") || undefined;
  const language =
    bodyMeta?.language ||
    request.headers.get("accept-language")?.split(",")[0] ||
    undefined;

  const lat =
    typeof bodyMeta?.lat === "number" && Number.isFinite(bodyMeta.lat) ? bodyMeta.lat : null;
  const lng =
    typeof bodyMeta?.lng === "number" && Number.isFinite(bodyMeta.lng) ? bodyMeta.lng : null;
  const accuracy =
    typeof bodyMeta?.accuracy === "number" && Number.isFinite(bodyMeta.accuracy)
      ? bodyMeta.accuracy
      : null;

  return {
    userAgent,
    platform: bodyMeta?.platform || undefined,
    language,
    screen: bodyMeta?.screen || undefined,
    timezone: bodyMeta?.timezone || undefined,
    ip: getClientIp(request),
    publicIp:
      typeof bodyMeta?.publicIp === "string" && bodyMeta.publicIp.trim()
        ? bodyMeta.publicIp.trim()
        : undefined,
    lat,
    lng,
    accuracy,
    deviceSummary: buildDeviceSummary(userAgent, bodyMeta?.platform),
  };
}

export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `+91${digits.slice(1)}`;
  return `+${digits}`;
}

interface OtpEntry {
  otp: string;
  expiresAt: number;
  name: string;
  email: string;
  phone: string;
}

const OTP_TTL_MS = 10 * 60 * 1000;
const store = new Map<string, OtpEntry>();

export function otpKey(phone: string, email: string) {
  return `${phone.replace(/\D/g, "")}:${email.trim().toLowerCase()}`;
}

export function saveOtp(key: string, entry: Omit<OtpEntry, "expiresAt">) {
  store.set(key, { ...entry, expiresAt: Date.now() + OTP_TTL_MS });
}

export function verifyOtp(key: string, otp: string): OtpEntry | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  if (entry.otp !== otp.trim()) return null;
  store.delete(key);
  return entry;
}

export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

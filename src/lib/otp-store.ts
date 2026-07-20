import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export interface OtpEntry {
  otp: string;
  expiresAt: number;
  name: string;
  email: string;
  phone: string;
  meta?: VisitorMeta;
}

export interface VisitorMeta {
  userAgent?: string;
  platform?: string;
  language?: string;
  screen?: string;
  timezone?: string;
  ip?: string;
  publicIp?: string;
  lat?: number | null;
  lng?: number | null;
  accuracy?: number | null;
  deviceSummary?: string;
}

const OTP_TTL_MS = 10 * 60 * 1000;
const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "otp-store.json");

type StoreShape = Record<string, OtpEntry>;

async function readStore(): Promise<StoreShape> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as StoreShape;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeStore(store: StoreShape) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE, JSON.stringify(store, null, 2), "utf8");
}

function prune(store: StoreShape) {
  const now = Date.now();
  for (const [k, v] of Object.entries(store)) {
    if (!v?.expiresAt || v.expiresAt < now) delete store[k];
  }
}

export function otpKey(phone: string, email: string) {
  return `${phone.replace(/\D/g, "")}:${email.trim().toLowerCase()}`;
}

export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function saveOtp(
  key: string,
  entry: Omit<OtpEntry, "expiresAt">
) {
  const store = await readStore();
  prune(store);
  store[key] = { ...entry, expiresAt: Date.now() + OTP_TTL_MS };
  await writeStore(store);
}

export async function verifyOtp(key: string, otp: string): Promise<OtpEntry | null> {
  const store = await readStore();
  prune(store);

  const entry = store[key];
  if (!entry) {
    await writeStore(store);
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    delete store[key];
    await writeStore(store);
    return null;
  }

  const incoming = String(otp ?? "").replace(/\D/g, "").trim();
  if (entry.otp !== incoming) {
    await writeStore(store);
    return null;
  }

  delete store[key];
  await writeStore(store);
  return entry;
}

export async function peekOtp(key: string): Promise<OtpEntry | null> {
  const store = await readStore();
  prune(store);
  await writeStore(store);
  return store[key] ?? null;
}

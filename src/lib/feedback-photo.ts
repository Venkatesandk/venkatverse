import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { getWritableDataDir } from "@/lib/data-path";

const AVATAR_DIR = () => path.join(getWritableDataDir(), "feedback-avatars");

/** Save a review photo; returns public API path or null. Max ~512KB. */
export async function saveFeedbackPhoto(
  feedbackId: string,
  dataUrl: string
): Promise<string | null> {
  const match = dataUrl.match(/^data:image\/(jpeg|jpg|png|webp);base64,(.+)$/i);
  if (!match) return null;

  const ext = match[1].toLowerCase() === "jpeg" ? "jpg" : match[1].toLowerCase();
  const buf = Buffer.from(match[2], "base64");
  if (buf.length > 512 * 1024) return null;

  await mkdir(AVATAR_DIR(), { recursive: true });
  await writeFile(path.join(AVATAR_DIR(), `${feedbackId}.${ext}`), buf);
  return `/api/feedback/avatar/${feedbackId}`;
}

export async function readFeedbackPhoto(feedbackId: string): Promise<{
  buf: Buffer;
  type: string;
} | null> {
  for (const [ext, type] of [
    ["jpg", "image/jpeg"],
    ["jpeg", "image/jpeg"],
    ["png", "image/png"],
    ["webp", "image/webp"],
  ] as const) {
    try {
      const buf = await readFile(path.join(AVATAR_DIR(), `${feedbackId}.${ext}`));
      return { buf, type };
    } catch {
      /* try next */
    }
  }
  return null;
}

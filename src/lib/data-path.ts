import path from "path";

/**
 * Local: write under ./data
 * Vercel/serverless: filesystem is read-only except /tmp
 */
export function getWritableDataDir(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join("/tmp", "venkatverse-data");
  }
  return path.join(process.cwd(), "data");
}

/** Bundled seed files shipped with the app (read-only on Vercel) */
export function getSeedDataDir(): string {
  return path.join(process.cwd(), "data");
}

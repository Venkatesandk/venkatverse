/**
 * Sliding-window in-memory rate limiter for API Route Handlers.
 * Automatically prunes expired buckets to prevent unbounded memory growth.
 */
interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
let lastPrune = 0;

function pruneExpired(now: number) {
  if (now - lastPrune < 60_000) return;
  lastPrune = now;
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function checkRateLimit(options: {
  namespace: string;
  key: string;
  maxRequests: number;
  windowMs: number;
}): { allowed: boolean; retryAfterSec: number; remaining: number } {
  const now = Date.now();
  pruneExpired(now);

  const composite = `${options.namespace}:${options.key}`;
  const current = buckets.get(composite);

  if (!current || current.resetAt <= now) {
    buckets.set(composite, { count: 1, resetAt: now + options.windowMs });
    return {
      allowed: true,
      retryAfterSec: Math.ceil(options.windowMs / 1000),
      remaining: Math.max(0, options.maxRequests - 1),
    };
  }

  if (current.count >= options.maxRequests) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
      remaining: 0,
    };
  }

  current.count += 1;
  return {
    allowed: true,
    retryAfterSec: Math.ceil((current.resetAt - now) / 1000),
    remaining: Math.max(0, options.maxRequests - current.count),
  };
}

export function getRateLimitClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "anonymous"
  );
}


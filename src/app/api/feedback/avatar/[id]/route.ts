import { NextResponse } from "next/server";
import { readFeedbackPhoto } from "@/lib/feedback-photo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteCtx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, ctx: RouteCtx) {
  try {
    const { id } = await ctx.params;
    if (!/^fb_[a-z0-9_]+$/i.test(id)) {
      return new NextResponse("Not found", { status: 404 });
    }

    const file = await readFeedbackPhoto(id);
    if (!file) return new NextResponse("Not found", { status: 404 });

    return new NextResponse(new Uint8Array(file.buf), {
      headers: {
        "Content-Type": file.type,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}

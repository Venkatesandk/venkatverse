import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { deleteFeedback, updateFeedback } from "@/lib/feedback-store";

type RouteCtx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: RouteCtx) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  try {
    const { id } = await ctx.params;
    const body = await request.json();
    const name = body.name !== undefined ? String(body.name) : undefined;
    const message = body.message !== undefined ? String(body.message) : undefined;
    const rating = body.rating !== undefined ? Number(body.rating) : undefined;

    const updated = await updateFeedback(id, { name, message, rating });
    if (!updated) {
      return NextResponse.json({ error: "Feedback not found or invalid data." }, { status: 404 });
    }

    return NextResponse.json({ success: true, feedback: updated });
  } catch (err) {
    console.error("[feedback PATCH]", err);
    return NextResponse.json({ error: "Could not update feedback." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, ctx: RouteCtx) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  try {
    const { id } = await ctx.params;
    const ok = await deleteFeedback(id);
    if (!ok) {
      return NextResponse.json({ error: "Feedback not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[feedback DELETE]", err);
    return NextResponse.json({ error: "Could not delete feedback." }, { status: 500 });
  }
}

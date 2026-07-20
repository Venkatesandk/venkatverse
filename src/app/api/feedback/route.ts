import { NextResponse } from "next/server";
import { addFeedback, listFeedback } from "@/lib/feedback-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const feedback = await listFeedback(30);
    return NextResponse.json(
      { feedback },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch {
    return NextResponse.json({ feedback: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const message = String(body.message ?? "").trim();
    const email = String(body.email ?? "").trim();
    const rating = Number(body.rating ?? 5);
    const photoBase64 =
      typeof body.photoBase64 === "string" && body.photoBase64.startsWith("data:image/")
        ? body.photoBase64
        : undefined;

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!message || message.length < 8) {
      return NextResponse.json({ error: "Please write a short feedback message." }, { status: 400 });
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
    }

    const entry = await addFeedback({ name, email: email || undefined, rating, message, photoBase64 });
    return NextResponse.json({ success: true, feedback: entry });
  } catch (err) {
    console.error("[feedback]", err);
    return NextResponse.json({ error: "Could not save feedback. Please try again." }, { status: 500 });
  }
}

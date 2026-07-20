import { NextResponse } from "next/server";
import { getMapPins } from "@/lib/map-pins-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getMapPins(80);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ pins: [], visits: 0, downloads: 0, total: 0 });
  }
}

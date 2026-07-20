import { NextResponse } from "next/server";
import { BASE_DOWNLOAD_COUNT, getDownloadStats } from "@/lib/resume-leads";

export async function GET() {
  try {
    const stats = await getDownloadStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ total: BASE_DOWNLOAD_COUNT, recent: [] });
  }
}

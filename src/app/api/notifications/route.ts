import { NextResponse } from "next/server";
import { getNotifications } from "@/lib/notification-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const notifications = await getNotifications(30);
    return NextResponse.json({
      notifications,
      count: notifications.length,
      total: notifications.length,
    });
  } catch {
    return NextResponse.json({ notifications: [], count: 0, total: 0 });
  }
}

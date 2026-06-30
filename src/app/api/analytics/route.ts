import { NextResponse } from "next/server";

let visitorCount = 1284;

export async function POST() {
  visitorCount += 1;
  return NextResponse.json({ visitors: visitorCount });
}

export async function GET() {
  return NextResponse.json({ visitors: visitorCount });
}

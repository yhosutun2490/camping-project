import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({ ok: true }, {
    status: 200,
    headers: { "x-hello-from-mw": "yes" },
  });
}
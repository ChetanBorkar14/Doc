import { NextRequest, NextResponse } from "next/server";
import { getDb, collection } from "@/lib/db";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const doctors = collection<any>(db, "doctors");
  const url = new URL(req.url);
  const doctorId = url.searchParams.get("doctor_id");

  const query = doctorId ? { doctor_id: doctorId } : {};
  const list = await doctors.find(query).limit(1).toArray();
  const doctor = list[0] || null;
  return NextResponse.json({ doctor });
}



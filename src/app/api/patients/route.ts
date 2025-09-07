import { NextResponse } from "next/server";
import { getDb, collection } from "@/lib/db";

export async function GET() {
  const db = await getDb();
  const patients = collection<any>(db, "patients");
  const list = await patients.find({}).sort({ created_at: -1 }).toArray();
  return NextResponse.json({ patients: list });
}



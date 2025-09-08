import { NextRequest, NextResponse } from "next/server";
import { getDb, collection } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const db = await getDb();
  const patients = collection<any>(db, "patients");
  const doc = await patients.findOne({ patient_id: params.id });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ patient: doc });
}



import { NextResponse } from "next/server";
import { getDb, collection } from "@/lib/db";

export async function GET() {
  const db = await getDb();
  const pharmacies = collection<any>(db, "pharmacies");
  const ph = await pharmacies.findOne({});
  return NextResponse.json({ pharmacy: ph });
}



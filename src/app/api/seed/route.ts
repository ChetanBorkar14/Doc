import { NextRequest, NextResponse } from "next/server";
import { getDb, collection } from "@/lib/db";
import { db as localData } from "@/data/data";

export async function POST(_req: NextRequest) {
  const db = await getDb();

  // Collections
  const doctors = collection<any>(db, "doctors");
  const patients = collection<any>(db, "patients");
  const pharmacy = collection<any>(db, "pharmacies");

  // Upsert doctor data
  for (const d of localData.doctors) {
    await doctors.updateOne(
      { doctor_id: d.doctor_id },
      { $set: d },
      { upsert: true }
    );
  }

  for (const p of localData.patients) {
    await patients.updateOne(
      { patient_id: p.patient_id },
      { $set: p },
      { upsert: true }
    );
  }

  await pharmacy.updateOne(
    { pharmacy_id: localData.pharmacy.pharmacy_id },
    { $set: localData.pharmacy },
    { upsert: true }
  );

  return NextResponse.json({ ok: true });
}



import { NextRequest, NextResponse } from "next/server";
import { getDb, collection } from "@/lib/db";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const url = new URL(req.url);
  const doctorId = url.searchParams.get("doctor_id");

  // Aggregate consultations from doctor profile if present, else from patients
  const doctorsCol = collection<any>(db, "doctors");
  const doctor = doctorId
    ? await doctorsCol.findOne({ doctor_id: doctorId })
    : await doctorsCol.findOne({});

  if (doctor?.patients_seen) {
    return NextResponse.json({ consultations: doctor.patients_seen });
  }

  const patientsCol = collection<any>(db, "patients");
  const patients = await patientsCol
    .find(doctorId ? { doctor_id: doctorId } : {})
    .project({ consultations: 1, name: 1, patient_id: 1 })
    .toArray();

  const consultations = patients.flatMap((p: any) => p.consultations || []);
  return NextResponse.json({ consultations });
}



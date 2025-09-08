import { NextRequest, NextResponse } from "next/server";
import { getDb, collection } from "@/lib/db";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const url = new URL(req.url);
  const doctorId = url.searchParams.get("doctor_id");
  const patientsCol = collection<any>(db, "patients");
  const filter = doctorId ? { doctor_id: doctorId } : {};

  // Prescriptions are embedded under doctor or patient structures in seed sample.
  // Here, we aggregate prescriptions from patients.consultations mapping prescription_id back.
  const patients = await patientsCol.find(filter).toArray();
  const prescriptions: any[] = [];
  for (const p of patients) {
    for (const c of p.consultations || []) {
      if (c.prescription_id && p.prescriptions) {
        const pres = (p.prescriptions || []).find((x: any) => x.prescription_id === c.prescription_id);
        if (pres) prescriptions.push(pres);
      }
    }
  }

  // Fallback: try doctors collection if patients do not contain prescriptions
  if (prescriptions.length === 0) {
    const doctorsCol = collection<any>(db, "doctors");
    const d = doctorId ? await doctorsCol.findOne({ doctor_id: doctorId }) : await doctorsCol.findOne({});
    if (d?.prescriptions) prescriptions.push(...d.prescriptions);
  }

  return NextResponse.json({ prescriptions });
}



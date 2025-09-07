import { NextRequest, NextResponse } from "next/server";
import { getDb, collection } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();
    const doctors = collection<any>(db, "doctors");
    const count = await doctors.countDocuments();
    const docs = await doctors.find({}).toArray();
    
    return NextResponse.json({ 
      success: true, 
      count, 
      doctors: docs.map(d => ({ 
        doctor_id: d.doctor_id, 
        name: d.name, 
        email: d.email,
        hasPassword: !!d.password_hash 
      }))
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password } = body as { email?: string; password?: string };
    
    const db = await getDb();
    const doctors = collection<any>(db, "doctors");
    const doc = await doctors.findOne({ email });
    
    return NextResponse.json({
      email,
      foundDoctor: !!doc,
      doctorEmail: doc?.email,
      hasPassword: !!doc?.password_hash,
      passwordLength: doc?.password_hash?.length || 0
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

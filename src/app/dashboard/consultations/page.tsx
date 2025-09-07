"use client";


import { db } from "@/data/data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


export default function ConsultationsPage() {
  const doctor = db.doctors[0];
  const consultations = doctor.patients_seen;
  const patients = db.patients;
  const getPatientName = (id: string) => {
    const patient = patients.find((p) => p.patient_id === id);
    return patient ? patient.name : "Unknown";
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Consultations</h1>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Prescription</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consultations.map((c) => (
                <TableRow key={c.visit_date + c.patient_id}>
                  <TableCell>{c.visit_date}</TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/patient/${c.patient_id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {getPatientName(c.patient_id)}
                    </Link>
                  </TableCell>
                  <TableCell>{c.diagnosis}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{c.prescription_id}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

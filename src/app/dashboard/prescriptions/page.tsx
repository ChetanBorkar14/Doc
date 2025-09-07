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


export default function PrescriptionsPage() {
  const doctor = db.doctors[0];
  const prescriptions = doctor.prescriptions;
  const patients = db.patients;
  const getPatientName = (id: string) => {
    const patient = patients.find((p) => p.patient_id === id);
    return patient ? patient.name : "Unknown";
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Prescriptions</h1>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Issued On</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Medicines</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((pres) => (
                <TableRow key={pres.prescription_id}>
                  <TableCell>
                    <Badge variant="secondary">{pres.prescription_id}</Badge>
                  </TableCell>
                  <TableCell>{pres.issued_on}</TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/patient/${pres.patient_id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {getPatientName(pres.patient_id)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside">
                      {pres.medicines.map((med) => (
                        <li key={med.medicine_id}>
                          {med.name}  {med.dosage} (
                          <span className="italic">{med.instructions}</span>)
                        </li>
                      ))}
                    </ul>
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

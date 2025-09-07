"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Medicine = {
  medicine_id: string;
  name: string;
  dosage: string;
  instructions: string;
};

type Prescription = {
  prescription_id: string;
  patient_id: string;
  issued_on: string;
  medicines: Medicine[];
};

export default function PrescriptionTable({
  prescriptions,
}: {
  prescriptions: Prescription[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prescription ID</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Issued On</TableHead>
            <TableHead>Medicines</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {prescriptions.map((pres) => (
            <TableRow key={pres.prescription_id}>
              <TableCell className="font-medium">
                {pres.prescription_id}
              </TableCell>
              <TableCell>
                <Link
                  href={`/patient/${pres.patient_id}`}
                  className="text-blue-600 hover:underline"
                >
                  {pres.patient_id}
                </Link>
              </TableCell>
              <TableCell>
                {new Date(pres.issued_on).toLocaleDateString("en-IN")}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {pres.medicines.map((m) => (
                    <div key={m.medicine_id} className="text-sm">
                      <Badge variant="secondary">{m.name}</Badge>{" "}
                      <span>{m.dosage}</span>
                      <p className="text-xs text-gray-500">{m.instructions}</p>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Link
                  href={`/prescriptions/${pres.prescription_id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

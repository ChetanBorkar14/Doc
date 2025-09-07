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

type Patient = {
  patient_id: string;
  name: string;
  relation_to_user: string;
  dob: string;
  gender: string;
  blood_group: string;
  consultations?: {
    consult_id: string;
    doctor_id: string;
    diagnosis: string;
    prescription_id: string;
    date: string;
  }[];
};

export default function PatientTable({ patients }: { patients: Patient[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Relation</TableHead>
            <TableHead>DOB</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Blood Group</TableHead>
            <TableHead>Last Consultation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.map((p) => {
            const lastConsult = p.consultations?.[p.consultations.length - 1];

            return (
              <TableRow key={p.patient_id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.relation_to_user}</TableCell>
                <TableCell>
                  {new Date(p.dob).toLocaleDateString("en-IN")}
                </TableCell>
                <TableCell>{p.gender}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{p.blood_group}</Badge>
                </TableCell>
                <TableCell>
                  {lastConsult ? (
                    <>
                      <p className="text-sm">{lastConsult.date}</p>
                      <p className="text-xs text-gray-500">
                        {lastConsult.diagnosis}
                      </p>
                    </>
                  ) : (
                    <span className="text-gray-500 text-sm">No records</span>
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/patient/${p.patient_id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

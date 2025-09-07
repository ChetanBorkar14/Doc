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

export default function PatientsPage() {
  const patients = db.patients;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Patients</h1>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Relation</TableHead>
                <TableHead>DOB</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Chronic Conditions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.patient_id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.relation_to_user}</TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.blood_group}</Badge>
                  </TableCell>
                  <TableCell>
                    {patient.medical_history.chronic_conditions.length > 0
                      ? patient.medical_history.chronic_conditions.join(", ")
                      : "None"}
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

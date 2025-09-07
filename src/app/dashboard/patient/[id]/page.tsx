"use client";


import { useParams } from "next/navigation";
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

export default function PatientDetailsPage() {
  const params = useParams();
  const patientId = params?.id as string;

  const patient = db.patients.find((p) => p.patient_id === patientId);
  const doctors = db.doctors;
  const getDoctorName = (id: string) => {
    const doc = doctors.find((d) => d.doctor_id === id);
    return doc ? doc.name : id;
  };

  if (!patient) {
    return <div className="p-6">❌ Patient not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Patient Details</h1>

      {/* Patient Info */}
      <Card>
        <CardContent className="space-y-2">
          <p>
            <strong>Name:</strong> {patient.name}
          </p>
          <p>
            <strong>Relation:</strong> {patient.relation_to_user}
          </p>
          <p>
            <strong>DOB:</strong> {patient.dob}
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p>
            <strong>Blood Group:</strong>{" "}
            <Badge variant="outline">{patient.blood_group}</Badge>
          </p>
          <p>
            <strong>Chronic Conditions:</strong>{" "}
            {patient.medical_history.chronic_conditions.length > 0
              ? patient.medical_history.chronic_conditions.join(", ")
              : "None"}
          </p>
          <p>
            <strong>Allergies:</strong>{" "}
            {patient.medical_history.allergies.length > 0
              ? patient.medical_history.allergies.join(", ")
              : "None"}
          </p>
        </CardContent>
      </Card>

      {/* Uploaded Reports */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Uploaded Reports</h2>
          {patient.uploaded_reports.length === 0 ? (
            <p>No reports uploaded.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>File</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patient.uploaded_reports.map((report) => (
                  <TableRow key={report.report_id}>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>
                      {new Date(report.uploaded_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={report.file_url}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        View Report
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Consultations */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Consultations</h2>
          {patient.consultations.length === 0 ? (
            <p>No consultations found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Prescription</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patient.consultations.map((consult) => (
                  <TableRow key={consult.consult_id}>
                    <TableCell>{consult.date}</TableCell>
                    <TableCell>{getDoctorName(consult.doctor_id)}</TableCell>
                    <TableCell>{consult.diagnosis}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {consult.prescription_id}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

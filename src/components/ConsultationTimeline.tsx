"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Consultation = {
  consult_id: string;
  doctor_id: string;
  diagnosis: string;
  prescription_id: string;
  date: string;
};

export default function ConsultationTimeline({
  consultations,
}: {
  consultations: Consultation[];
}) {
  // sort consultations by date (newest first)
  const sorted = [...consultations].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sorted.length === 0) {
    return <p className="text-gray-500">No consultations yet.</p>;
  }

  return (
    <div className="space-y-6">
      {sorted.map((c, idx) => (
        <div key={c.consult_id} className="flex items-start gap-4">
          {/* Timeline dot */}
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-blue-600 mt-2" />
            {idx < sorted.length - 1 && (
              <div className="flex-1 w-px bg-gray-300 mt-1 mb-1" />
            )}
          </div>

          {/* Card for each consultation */}
          <Card className="flex-1">
            <CardContent className="space-y-1">
              <p className="text-sm text-gray-500">{c.date}</p>
              <p className="font-semibold">Diagnosis: {c.diagnosis}</p>
              <p className="text-sm text-gray-600">Doctor ID: {c.doctor_id}</p>
              <p className="text-sm">
                Prescription:{" "}
                <Badge variant="secondary">{c.prescription_id}</Badge>
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

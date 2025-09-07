"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

type Doctor = {
  doctor_id: string;
  name: string;
  specialization: string;
  qualifications: string[];
  registration_no: string;
  hospital_affiliation: string;
  availability: {
    consultation_modes: string[];
    working_days: string[];
    working_hours: {
      start_time: string;
      end_time: string;
    };
  };
  ratings: {
    average_rating: number;
    total_reviews: number;
  };
};

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{doctor.name}</CardTitle>
        <p className="text-gray-600">{doctor.specialization}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Hospital */}
        <p className="text-sm">
          <span className="font-semibold">Hospital:</span>{" "}
          {doctor.hospital_affiliation}
        </p>

        {/* Qualifications */}
        <p className="text-sm">
          <span className="font-semibold">Qualifications:</span>{" "}
          {doctor.qualifications.join(", ")}
        </p>

        {/* Registration No */}
        <p className="text-sm">
          <span className="font-semibold">Reg. No:</span>{" "}
          {doctor.registration_no}
        </p>

        {/* Availability */}
        <div>
          <p className="font-semibold text-sm">Availability:</p>
          <p className="text-sm">
            {doctor.availability.working_days.join(", ")} <br />
            {doctor.availability.working_hours.start_time} -{" "}
            {doctor.availability.working_hours.end_time}
          </p>
          <div className="flex gap-2 mt-2">
            {doctor.availability.consultation_modes.map((mode) => (
              <Badge key={mode} variant="secondary">
                {mode}
              </Badge>
            ))}
          </div>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-2 text-yellow-500">
          <Star className="w-5 h-5 fill-yellow-500" />
          <span className="font-semibold">{doctor.ratings.average_rating}</span>
          <span className="text-gray-600 text-sm">
            ({doctor.ratings.total_reviews} reviews)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

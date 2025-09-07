"use client";


import { db } from "@/data/data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";



export default function DashboardPage() {
  // For now, pick the first doctor (replace with auth context in future)
  const doctor = db.doctors[0];

  return (
    <div className="relative min-h-[100vh] bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 sm:px-8 flex flex-col items-center">
      {/* Doctor Profile Card */}
      <Card className="w-full max-w-3xl shadow-xl border-0 bg-gradient-to-tr from-white via-blue-100 to-indigo-50">
        <CardContent className="p-10 flex flex-col md:flex-row items-center gap-8">
          <Avatar className="size-28 shadow-lg ring-4 ring-blue-200">
            <AvatarImage src="/doctor-avatar.png" alt={doctor.name} />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-2 text-blue-900 tracking-tight flex items-center gap-2">
              {doctor.name}
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">{doctor.specialization}</span>
            </h1>
            <p className="text-base text-blue-700 mb-1">🏥 {doctor.hospital_affiliation}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="font-semibold text-blue-900">{doctor.ratings.average_rating}</span>
              <span className="text-xs text-blue-600">({doctor.ratings.total_reviews} reviews)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 w-full max-w-3xl">
        <Card className="transition-transform hover:scale-105 hover:shadow-2xl border-0 bg-white/80">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <div className="rounded-full bg-blue-100 text-blue-700 w-14 h-14 flex items-center justify-center mb-3 text-2xl font-bold shadow">
              {doctor.patients_seen.length}
            </div>
            <h3 className="text-blue-900 font-semibold text-lg">Patients Seen</h3>
          </CardContent>
        </Card>
        <Card className="transition-transform hover:scale-105 hover:shadow-2xl border-0 bg-white/80">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <div className="rounded-full bg-indigo-100 text-indigo-700 w-14 h-14 flex items-center justify-center mb-3 text-2xl font-bold shadow">
              {doctor.prescriptions.length}
            </div>
            <h3 className="text-blue-900 font-semibold text-lg">Prescriptions Issued</h3>
          </CardContent>
        </Card>
        <Card className="transition-transform hover:scale-105 hover:shadow-2xl border-0 bg-white/80">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <div className="rounded-full bg-yellow-100 text-yellow-700 w-14 h-14 flex items-center justify-center mb-3 text-2xl font-bold shadow">
              {doctor.ratings.average_rating}
            </div>
            <h3 className="text-blue-900 font-semibold text-lg">Avg. Rating</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


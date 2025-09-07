"use client";

import { db } from "@/data/data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Star, Clock, MapPin, Award } from "lucide-react";

export default function DashboardPage() {
  const doctor = db.doctors[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f3bd] via-white to-[#f0f3bd] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#05668d] mb-2">
            Welcome to MediCare Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Providing compassionate healthcare with modern technology
          </p>
        </div>

        {/* Doctor Profile Card */}
        <Card className="medical-card w-full max-w-4xl mx-auto">
          <CardContent className="p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="relative">
                <Avatar className="w-32 h-32 lg:w-40 lg:h-40 shadow-xl ring-4 ring-white">
                  <AvatarImage src="/doctor-avatar.png" alt={doctor.name} />
                  <AvatarFallback className="bg-gradient-to-br from-[#05668d] to-[#00a896] text-white text-2xl font-bold">
                    DR
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white p-2 rounded-full shadow-lg">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-3">
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#05668d]">
                    {doctor.name}
                  </h2>
                  <Badge className="bg-gradient-to-r from-[#00a896] to-[#02c39a] text-white px-3 py-1 text-sm font-semibold">
                    {doctor.specialization}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-base">{doctor.hospital_affiliation}</span>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-base">
                      {doctor.availability.working_hours.start_time} - {doctor.availability.working_hours.end_time}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(doctor.ratings.average_rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-[#05668d]">{doctor.ratings.average_rating}</span>
                  <span className="text-sm text-gray-600">({doctor.ratings.total_reviews} reviews)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="medical-card group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#05668d] to-[#028090] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#05668d] mb-2">
                {doctor.patients_seen.length}
              </h3>
              <p className="text-gray-600 font-medium">Patients Treated</p>
              <p className="text-sm text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="medical-card group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00a896] to-[#02c39a] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#05668d] mb-2">
                {doctor.prescriptions.length}
              </h3>
              <p className="text-gray-600 font-medium">Prescriptions</p>
              <p className="text-sm text-gray-500 mt-1">Issued today</p>
            </CardContent>
          </Card>

          <Card className="medical-card group md:col-span-2 lg:col-span-1">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#ffc107] to-[#e0a800] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#05668d] mb-2">
                {doctor.ratings.average_rating}
              </h3>
              <p className="text-gray-600 font-medium">Average Rating</p>
              <p className="text-sm text-gray-500 mt-1">Patient satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="medical-card">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-[#05668d] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 rounded-lg bg-gradient-to-r from-[#05668d] to-[#028090] text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Users className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">View Patients</span>
              </button>
              <button className="p-4 rounded-lg bg-gradient-to-r from-[#00a896] to-[#02c39a] text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <FileText className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">New Prescription</span>
              </button>
              <button className="p-4 rounded-lg bg-gradient-to-r from-[#028090] to-[#00a896] text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Schedule</span>
              </button>
              <button className="p-4 rounded-lg bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Award className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Reports</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


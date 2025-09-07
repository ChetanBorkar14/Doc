"use client";

import { useEffect, useState } from "react";
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
import { Users, UserPlus, Search, Filter, Calendar, Heart, AlertTriangle } from "lucide-react";

type Patient = {
  patient_id: string;
  user_id: string;
  doctor_id: string;
  name: string;
  relation_to_user: string;
  dob: string;
  gender: string;
  blood_group: string;
  medical_history: {
    chronic_conditions: string[];
    allergies: string[];
  };
  uploaded_reports: any[];
  consultations: any[];
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    let es: EventSource | null = null;
    const load = async () => {
      const res = await fetch("/api/patients", { cache: "no-store" });
      const data = await res.json();
      setPatients(data.patients || []);

      es = new EventSource("/api/patients/stream");
      es.onmessage = (ev) => {
        try {
          const payload = JSON.parse(ev.data);
          if (payload?.type === "insert" && payload.doc) {
            setPatients((prev) => [payload.doc as Patient, ...prev]);
          }
        } catch {
          // ignore
        }
      };
    };
    load();
    return () => {
      if (es) es.close();
    };
  }, []);

  const getAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getPriorityColor = (conditions: string[]) => {
    if (conditions.length > 2) return "urgent-indicator";
    if (conditions.length > 0) return "warning-indicator";
    return "health-indicator";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f3bd] via-white to-[#f0f3bd] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#05668d] mb-2">
              Patient Management
            </h1>
            <p className="text-gray-600">
              Monitor and manage your patients with real-time updates
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00a896] to-[#02c39a] text-white rounded-lg hover:shadow-lg transition-all duration-300">
              <UserPlus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Patient</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#05668d] to-[#028090] flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#05668d]">{patients.length}</p>
                  <p className="text-sm text-gray-600">Total Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00a896] to-[#02c39a] flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#05668d]">
                    {patients.filter(p => p.medical_history.chronic_conditions.length === 0).length}
                  </p>
                  <p className="text-sm text-gray-600">Healthy Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffc107] to-[#e0a800] flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#05668d]">
                    {patients.filter(p => p.medical_history.chronic_conditions.length > 0).length}
                  </p>
                  <p className="text-sm text-gray-600">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table */}
        <Card className="medical-card">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#05668d]">Patient Records</h3>
              <p className="text-sm text-gray-600 mt-1">Real-time patient information and medical history</p>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-[#05668d]">Patient</TableHead>
                    <TableHead className="font-semibold text-[#05668d] hidden sm:table-cell">Age</TableHead>
                    <TableHead className="font-semibold text-[#05668d] hidden md:table-cell">Blood Group</TableHead>
                    <TableHead className="font-semibold text-[#05668d] hidden lg:table-cell">Conditions</TableHead>
                    <TableHead className="font-semibold text-[#05668d]">Priority</TableHead>
                    <TableHead className="font-semibold text-[#05668d]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.patient_id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#05668d] to-[#00a896] flex items-center justify-center text-white font-semibold text-sm">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{patient.name}</p>
                            <p className="text-sm text-gray-600">{patient.relation_to_user}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{getAge(patient.dob)} years</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className="bg-gradient-to-r from-[#00a896] to-[#02c39a] text-white">
                          {patient.blood_group}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="max-w-xs">
                          {patient.medical_history.chronic_conditions.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {patient.medical_history.chronic_conditions.slice(0, 2).map((condition, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {condition}
                                </Badge>
                              ))}
                              {patient.medical_history.chronic_conditions.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{patient.medical_history.chronic_conditions.length - 2}
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">None</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(patient.medical_history.chronic_conditions)}`}></div>
                      </TableCell>
                      <TableCell>
                        <button className="text-[#05668d] hover:text-[#028090] font-medium text-sm transition-colors">
                          View Details
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

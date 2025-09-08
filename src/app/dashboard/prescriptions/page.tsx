"use client";

import useSWR from "swr";
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
import { FileText, Plus, Calendar, User, Pill, Clock } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PrescriptionsPage() {
  const { data: presData } = useSWR<{ prescriptions: any[] }>("/api/prescriptions", fetcher);
  const { data: patientsData } = useSWR<{ patients: any[] }>("/api/patients", fetcher);
  const prescriptions = presData?.prescriptions || [];
  const patients = patientsData?.patients || [];
  
  const getPatientName = (id: string) => {
    const patient = patients.find((p) => p.patient_id === id);
    return patient ? patient.name : "Unknown";
  };

  const getDaysSinceIssued = (issuedOn: string) => {
    const today = new Date();
    const issued = new Date(issuedOn);
    const diffTime = Math.abs(today.getTime() - issued.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f3bd] via-white to-[#f0f3bd] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#05668d] mb-2">
              Prescription Management
            </h1>
            <p className="text-gray-600">
              Track and manage patient prescriptions with detailed medication information
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00a896] to-[#02c39a] text-white rounded-lg hover:shadow-lg transition-all duration-300">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">New Prescription</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#05668d] to-[#028090] flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#05668d]">{prescriptions.length}</p>
                  <p className="text-sm text-gray-600">Total Prescriptions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00a896] to-[#02c39a] flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#05668d]">
                    {prescriptions.filter(p => getDaysSinceIssued(p.issued_on) <= 7).length}
                  </p>
                  <p className="text-sm text-gray-600">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffc107] to-[#e0a800] flex items-center justify-center">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#05668d]">
                    {prescriptions.reduce((total, pres) => total + pres.medicines.length, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Medicines Prescribed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prescriptions Table */}
        <Card className="medical-card">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#05668d]">Recent Prescriptions</h3>
              <p className="text-sm text-gray-600 mt-1">Detailed view of all issued prescriptions</p>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-[#05668d]">Prescription ID</TableHead>
                    <TableHead className="font-semibold text-[#05668d]">Patient</TableHead>
                    <TableHead className="font-semibold text-[#05668d] hidden sm:table-cell">Issued Date</TableHead>
                    <TableHead className="font-semibold text-[#05668d] hidden md:table-cell">Medicines</TableHead>
                    <TableHead className="font-semibold text-[#05668d]">Status</TableHead>
                    <TableHead className="font-semibold text-[#05668d]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((pres) => (
                    <TableRow key={pres.prescription_id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#05668d] to-[#00a896] flex items-center justify-center text-white font-semibold text-xs">
                            RX
                          </div>
                          <Badge className="bg-gradient-to-r from-[#00a896] to-[#02c39a] text-white">
                            {pres.prescription_id}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <Link
                            href={`/dashboard/patient/${pres.patient_id}`}
                            className="text-[#05668d] hover:text-[#028090] font-medium transition-colors"
                          >
                            {getPatientName(pres.patient_id)}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{pres.issued_on}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {pres.medicines.slice(0, 2).map((med, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {med.name}
                              </Badge>
                            ))}
                            {pres.medicines.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{pres.medicines.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`${
                            getDaysSinceIssued(pres.issued_on) <= 7 
                              ? 'bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white' 
                              : 'bg-gradient-to-r from-[#ffc107] to-[#e0a800] text-white'
                          }`}
                        >
                          {getDaysSinceIssued(pres.issued_on) <= 7 ? 'Active' : 'Expired'}
                        </Badge>
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
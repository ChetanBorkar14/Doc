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
import { Pill, Package, AlertTriangle, CheckCircle, Search, Filter } from "lucide-react";

export default function PharmacyPage() {
  const medicines = db.pharmacy.available_medicines;

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { status: "out", color: "urgent-indicator", text: "Out of Stock" };
    if (quantity < 10) return { status: "low", color: "warning-indicator", text: "Low Stock" };
    return { status: "good", color: "health-indicator", text: "In Stock" };
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: "expired", color: "urgent-indicator", text: "Expired" };
    if (diffDays < 30) return { status: "expiring", color: "warning-indicator", text: "Expiring Soon" };
    return { status: "good", color: "health-indicator", text: "Valid" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f3bd] via-white to-[#f0f3bd] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#05668d] mb-2">
              Pharmacy Management
            </h1>
            <p className="text-gray-600">
              Monitor medicine inventory, stock levels, and expiry dates
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00a896] to-[#02c39a] text-white rounded-lg hover:shadow-lg transition-all duration-300">
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">Add Medicine</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#05668d] to-[#028090] flex items-center justify-center">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#05668d]">{medicines.length}</p>
                  <p className="text-sm text-gray-600">Total Medicines</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00a896] to-[#02c39a] flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#05668d]">
                    {medicines.filter(m => m.quantity_in_stock > 10).length}
                  </p>
                  <p className="text-sm text-gray-600">In Stock</p>
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
                    {medicines.filter(m => m.quantity_in_stock > 0 && m.quantity_in_stock < 10).length}
                  </p>
                  <p className="text-sm text-gray-600">Low Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#dc3545] to-[#c82333] flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#05668d]">
                    {medicines.filter(m => m.quantity_in_stock === 0).length}
                  </p>
                  <p className="text-sm text-gray-600">Out of Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medicines Table */}
        <Card className="medical-card">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#05668d]">Medicine Inventory</h3>
              <p className="text-sm text-gray-600 mt-1">Complete inventory with stock levels and expiry information</p>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-[#05668d]">Medicine</TableHead>
                    <TableHead className="font-semibold text-[#05668d] hidden sm:table-cell">Generic Name</TableHead>
                    <TableHead className="font-semibold text-[#05668d] hidden md:table-cell">Strength</TableHead>
                    <TableHead className="font-semibold text-[#05668d]">Stock</TableHead>
                    <TableHead className="font-semibold text-[#05668d] hidden lg:table-cell">Expiry</TableHead>
                    <TableHead className="font-semibold text-[#05668d] hidden lg:table-cell">Price</TableHead>
                    <TableHead className="font-semibold text-[#05668d]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicines.map((med) => {
                    const stockStatus = getStockStatus(med.quantity_in_stock);
                    const expiryStatus = getExpiryStatus(med.expiry_date);
                    
                    return (
                      <TableRow key={med.medicine_id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#05668d] to-[#00a896] flex items-center justify-center text-white font-semibold text-sm">
                              {med.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{med.name}</p>
                              <p className="text-sm text-gray-600">{med.brand_name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="text-sm text-gray-700">{med.generic_name}</span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline" className="text-xs">
                            {med.strength}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${stockStatus.color}`}></div>
                            <span className="text-sm font-medium">
                              {med.quantity_in_stock} units
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${expiryStatus.color}`}></div>
                            <span className="text-sm">
                              {new Date(med.expiry_date).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm font-medium text-gray-700">
                            {med.price_per_unit} {med.currency}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge 
                              className={`text-xs ${
                                stockStatus.status === "out" 
                                  ? 'bg-gradient-to-r from-[#dc3545] to-[#c82333] text-white'
                                  : stockStatus.status === "low"
                                  ? 'bg-gradient-to-r from-[#ffc107] to-[#e0a800] text-white'
                                  : 'bg-gradient-to-r from-[#02c39a] to-[#00a896] text-white'
                              }`}
                            >
                              {stockStatus.text}
                            </Badge>
                            {med.requires_prescription && (
                              <Badge variant="outline" className="text-xs">
                                Rx Required
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

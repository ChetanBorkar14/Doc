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

export default function PharmacyPage() {
  const medicines = db.pharmacy.available_medicines;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pharmacy</h1>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Generic</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Strength</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Prescription Req.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.map((med) => (
                <TableRow key={med.medicine_id}>
                  <TableCell className="font-medium">{med.name}</TableCell>
                  <TableCell>{med.generic_name}</TableCell>
                  <TableCell>{med.brand_name}</TableCell>
                  <TableCell>{med.strength}</TableCell>
                  <TableCell>
                    {med.quantity_in_stock > 0 ? (
                      <Badge>
                        {med.quantity_in_stock} units
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(med.expiry_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {med.price_per_unit} {med.currency}
                  </TableCell>
                  <TableCell>
                    {med.requires_prescription ? (
                      <Badge variant="secondary">Yes</Badge>
                    ) : (
                      "No"
                    )}
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

"use client";

import { db } from "@/data/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AiInsightsPage() {
  const offlineAI = db.offline_ai;
  const serverAI = db.server_ai;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">AI Insights</h1>

      {/* Offline AI Predictions */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Offline AI</h2>
          <p>
            <strong>Session:</strong> {offlineAI.session_id}
          </p>
          <p>
            <strong>Patient:</strong> {offlineAI.patient_id}
          </p>
          <p>
            <strong>Language:</strong> {offlineAI.language}
          </p>
          <p>
            <strong>Urgency Score:</strong>{" "}
            <Badge>{offlineAI.urgency_score}</Badge>
          </p>

          <h3 className="text-lg font-medium mt-4">Predictions</h3>
          <ul className="list-disc list-inside">
            {offlineAI.offline_predictions.map((pred, i) => (
              <li key={i}>
                {pred.condition} — Confidence:{" "}
                {(pred.confidence * 100).toFixed(1)}% ( Action:{" "}
                {pred.recommended_action})
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-medium mt-4">Vital Signs</h3>
          <ul className="list-disc list-inside">
            <li>Temperature: {offlineAI.vital_signs.temperature} °C</li>
            <li>BP: {offlineAI.vital_signs.bp}</li>
            <li>Heart Rate: {offlineAI.vital_signs.heart_rate} bpm</li>
            <li>
              Oxygen Saturation: {offlineAI.vital_signs.oxygen_saturation}%
            </li>
          </ul>

          <h3 className="text-lg font-medium mt-4">Local Recommendations</h3>
          <ul className="list-disc list-inside">
            {offlineAI.local_recommendations.first_aid.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
            <li>
              Suggested Medicine:{" "}
              {offlineAI.local_recommendations.medicine_suggestions.join(", ")}
            </li>
            <li>
              Follow-up Time: {offlineAI.local_recommendations.follow_up_time}
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Server AI Predictions */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Server AI</h2>
          <p>
            <strong>Session:</strong> {serverAI.session_id}
          </p>
          <p>
            <strong>Source:</strong> {serverAI.source}
          </p>

          <h3 className="text-lg font-medium mt-4">Advanced Diagnosis</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Condition</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Evidence</TableHead>
                <TableHead>Recommendation Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serverAI.advanced_diagnosis.map((diag, i) => (
                <TableRow key={i}>
                  <TableCell>{diag.condition}</TableCell>
                  <TableCell>{(diag.confidence * 100).toFixed(1)}%</TableCell>
                  <TableCell>{diag.supporting_evidence.join(", ")}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {diag.ai_recommendation_level}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h3 className="text-lg font-medium mt-4">Pharmacy Recommendations</h3>
          {serverAI.pharmacy_recommendations.map((rec, i) => (
            <div key={i} className="mb-3">
              <p>
                <strong>Medicine:</strong> {rec.medicine_name} ({rec.dosage})
              </p>
              <p>
                <strong>Stock:</strong>{" "}
                {rec.stock_available ? "Available ✅" : "Out of Stock ❌"}
              </p>
              <p>
                <strong>Nearest Pharmacy:</strong> {rec.nearest_pharmacy.name} —{" "}
                {rec.nearest_pharmacy.distance_km} km away
              </p>
            </div>
          ))}

          <h3 className="text-lg font-medium mt-4">Audit Trail</h3>
          <ul className="list-disc list-inside">
            <li>
              Consent:{" "}
              {serverAI.audit_trail.consent_given ? "✅ Given" : "❌ Not Given"}
            </li>
            <li>
              Data Shared With:{" "}
              {serverAI.audit_trail.data_shared_with.join(", ")}
            </li>
            <li>Blockchain Hash: {serverAI.audit_trail.blockchain_hash}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const vitals = [
  { day: "Day 1", temp: 37.5 },
  { day: "Day 2", temp: 38.5 },
  { day: "Day 3", temp: 38.0 },
];

export default function VitalsChart() {
  return (
    <LineChart width={500} height={300} data={vitals}>
      <CartesianGrid stroke="#eee" />
      <XAxis dataKey="day" />
      <YAxis domain={[36, 40]} />
      <Tooltip />
      <Line type="monotone" dataKey="temp" stroke="#2563eb" strokeWidth={2} />
    </LineChart>
  );
}

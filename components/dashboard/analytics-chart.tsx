"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", properties: 12, enquiries: 8, views: 45 },
  { name: "Feb", properties: 19, enquiries: 12, views: 67 },
  { name: "Mar", properties: 15, enquiries: 9, views: 52 },
  { name: "Apr", properties: 24, enquiries: 15, views: 78 },
  { name: "May", properties: 18, enquiries: 11, views: 63 },
  { name: "Jun", properties: 22, enquiries: 14, views: 71 },
];

export function AnalyticsChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="properties" fill="#8884d8" name="Properties" />
          <Bar dataKey="enquiries" fill="#82ca9d" name="Enquiries" />
          <Bar dataKey="views" fill="#ffc658" name="Views" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 
"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    projects: 12,
    enquiries: 220,
  },
  {
    name: "Feb",
    projects: 8,
    enquiries: 180,
  },
  {
    name: "Mar",
    projects: 15,
    enquiries: 320,
  },
  {
    name: "Apr",
    projects: 10,
    enquiries: 280,
  },
  {
    name: "May",
    projects: 18,
    enquiries: 450,
  },
  {
    name: "Jun",
    projects: 14,
    enquiries: 380,
  },
  {
    name: "Jul",
    projects: 20,
    enquiries: 520,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="projects" name="Projects" fill="#6366f1" />
        <Bar dataKey="enquiries" name="Enquiries" fill="#f97316" />
      </BarChart>
    </ResponsiveContainer>
  )
}


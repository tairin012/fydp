'use client'

import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

// Recharts PieChart
interface CourseProgressPieProps {
  value: number
}

const CourseProgressPie = ({ value }: CourseProgressPieProps) => {
  const data = [
    { name: 'Completed', value },
    { name: 'Remaining', value: 100 - value },
  ]

  // Colors for the segments
  const COLORS = ['#f46d00', '#d3d3d3'] // Success color (green) and remaining color (grey)

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <p className="mt-2 font-medium text-sky-700">{Math.round(value)}% Complete</p>
    </div>
  )
}

export default CourseProgressPie

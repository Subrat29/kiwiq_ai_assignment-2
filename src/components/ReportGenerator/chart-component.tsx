'use client'

import React from 'react'
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function ChartComponent({ type, data, labels }) {
  const chartData = data.map((value, index) => ({
    name: labels[index] || `Label ${index + 1}`,
    value,
  }))

  const renderChart = () => {
    switch (type) {
      case 'BarChart':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="var(--primary)" />
          </BarChart>
        )
      case 'LineChart':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="var(--primary)" />
          </LineChart>
        )
      case 'PieChart':
        return (
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="var(--primary)"
              label
            />
            <Tooltip />
          </PieChart>
        )
      default:
        return null
    }
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      {renderChart()}
    </ResponsiveContainer>
  )
}
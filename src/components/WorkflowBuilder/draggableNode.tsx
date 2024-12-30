"use client"

import React from 'react'
import { FileText, Code, Package, Globe, Repeat, Clock, Search, BarChart, Inbox, Box, ArrowDownToLine, Workflow } from 'lucide-react'

const nodeConfig = {
  input: { color: 'bg-blue-100', hoverColor: 'hover:bg-blue-200', icon: <Inbox className="text-blue-600" /> },
  llm: { color: 'bg-purple-100', hoverColor: 'hover:bg-purple-200', icon: <Code className="text-purple-600" /> },
  output: { color: 'bg-green-100', hoverColor: 'hover:bg-green-200', icon: <ArrowDownToLine className="text-green-600" /> },
  text: { color: 'bg-gray-100', hoverColor: 'hover:bg-gray-200', icon: <FileText className="text-gray-600" /> },
  api: { color: 'bg-red-100', hoverColor: 'hover:bg-red-200', icon: <Globe className="text-red-600" /> },
  transform: { color: 'bg-yellow-100', hoverColor: 'hover:bg-yellow-200', icon: <Repeat className="text-yellow-600" /> },
  timer: { color: 'bg-indigo-100', hoverColor: 'hover:bg-indigo-200', icon: <Clock className="text-indigo-600" /> },
  filter: { color: 'bg-pink-100', hoverColor: 'hover:bg-pink-200', icon: <Search className="text-pink-600" /> },
  aggregator: { color: 'bg-cyan-100', hoverColor: 'hover:bg-cyan-200', icon: <BarChart className="text-cyan-600" /> },
  subflow: { color: 'bg-orange-100', hoverColor: 'hover:bg-orange-200', icon: <Workflow className="text-orange-600" /> },
  default: { color: 'bg-gray-100', hoverColor: 'hover:bg-gray-200', icon: <Box className="text-gray-600" /> },
}

export const DraggableNode = ({ type, label, data, onClick }) => {
  const { color, hoverColor, icon } = nodeConfig[type] || nodeConfig.default

  const handleDragStart = (event) => {
    const appData = { nodeType: type, ...(data && { workflowData: data }) }
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className={`${color} ${hoverColor} transition duration-200 ease-in-out cursor-grab w-full rounded-md flex items-center gap-2 text-gray-800 font-medium select-none p-2 shadow-sm`}
      onDragStart={handleDragStart}
      onClick={() => onClick({ type, label, data })}
      draggable
    >
      <span className="text-base">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}


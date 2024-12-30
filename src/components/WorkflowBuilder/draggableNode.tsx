"use client"

import React from 'react'
import { useDispatch } from 'react-redux'
import { addNode } from '@/redux/flowSlice'
import { useNodeId } from '@/hooks/useNodeId'
import { FileText, Code, Package, Globe, Repeat, Clock, Search, BarChart, Inbox, Box, ArrowDownToLine, ArrowUpToLine } from 'lucide-react'

const nodeConfig = {
  input: { color: 'bg-blue-100', hoverColor: 'hover:bg-blue-200', icon: <ArrowDownToLine className="text-blue-600" /> },
  output: { color: 'bg-green-100', hoverColor: 'hover:bg-green-200', icon: <ArrowUpToLine className="text-green-600" /> },
  default: { color: 'bg-gray-100', hoverColor: 'hover:bg-gray-200', icon: <Box className="text-gray-600" /> },
}

export const DraggableNode = ({ type, label }) => {
  const dispatch = useDispatch()
  const getNodeId = useNodeId()
  const { color, hoverColor, icon } = nodeConfig[type] || nodeConfig.default

  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ type }))
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleClick = () => {
    const newNode = {
      id: getNodeId(type),
      type,
      position: { x: 100, y: 100 },
      data: { label: `${label} node` },
    }
    dispatch(addNode(newNode))
  }

  return (
    <div
      className={`${color} ${hoverColor} transition duration-200 ease-in-out cursor-grab w-full rounded-md flex items-center gap-2 text-gray-800 font-medium select-none p-2 shadow-sm`}
      onDragStart={handleDragStart}
      onClick={handleClick}
      draggable
    >
      <span className="text-base">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}
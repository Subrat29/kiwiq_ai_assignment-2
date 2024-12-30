"use client"

import { useCallback, useRef, useState, useEffect } from 'react'
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { nodeTypes } from './nodes'

const proOptions = { hideAttribution: true }

export const PipelineUI = ({ activeWorkflow, updateWorkflow }) => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(activeWorkflow.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(activeWorkflow.edges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [gridSize, setGridSize] = useState(20)

  useEffect(() => {
    setNodes(activeWorkflow.nodes)
    setEdges(activeWorkflow.edges)
  }, [activeWorkflow, setNodes, setEdges])

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const newEdges = addEdge(params, edges)
      setEdges(newEdges)
      updateWorkflow({ ...activeWorkflow, edges: newEdges })
    },
    [edges, setEdges, activeWorkflow, updateWorkflow]
  )

  const onNodesChangeWithUpdate = useCallback(
    (changes) => {
      onNodesChange(changes)
      const updatedNodes = nodes.map((node) => {
        const change = changes.find((c) => c.id === node.id)
        return change ? { ...node, ...change } : node
      })
      updateWorkflow({ ...activeWorkflow, nodes: updatedNodes })
    },
    [nodes, onNodesChange, activeWorkflow, updateWorkflow]
  )

  const onEdgesChangeWithUpdate = useCallback(
    (changes) => {
      onEdgesChange(changes)
      const updatedEdges = edges.map((edge) => {
        const change = changes.find((c) => c.id === edge.id)
        return change ? { ...edge, ...change } : edge
      })
      updateWorkflow({ ...activeWorkflow, edges: updatedEdges })
    },
    [edges, onEdgesChange, activeWorkflow, updateWorkflow]
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const appData = event.dataTransfer.getData('application/reactflow')

      if (!appData || !reactFlowInstance) return

      const { nodeType, workflowData } = JSON.parse(appData)
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode = {
        id: `${nodeType}-${nodes.length + 1}`,
        type: nodeType,
        position,
        data: { label: `${nodeType} node`, ...(workflowData && { workflowData }) },
      }

      setNodes((nds) => {
        const updatedNodes = nds.concat(newNode)
        updateWorkflow({ ...activeWorkflow, nodes: updatedNodes })
        return updatedNodes
      })
    },
    [reactFlowInstance, nodes, setNodes, activeWorkflow, updateWorkflow]
  )

  const toggleFullScreen = useCallback(() => setIsFullScreen((prev) => !prev), [])

  return (
    <div
      ref={reactFlowWrapper}
      className={`relative ${isFullScreen ? 'w-full h-screen' : 'w-full h-[calc(100vh-7rem)]'} transition-all`}
    >
      <div className="absolute top-4 right-4 z-10 flex items-center gap-3 bg-white p-2 rounded-md shadow">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullScreen}
          className="text-gray-500 hover:text-gray-700 transition"
          aria-label="Toggle Fullscreen"
        >
          {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </Button>

        <div className="flex items-center space-x-2">
          <Label htmlFor="grid-size" className="text-sm text-gray-600">Grid:</Label>
          <Slider
            id="grid-size"
            min={10}
            max={40}
            step={5}
            value={[gridSize]}
            onValueChange={([value]) => setGridSize(value)}
            className="w-24"
          />
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeWithUpdate}
        onEdgesChange={onEdgesChangeWithUpdate}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        proOptions={proOptions}
      >
        <Background gap={gridSize} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  )
}


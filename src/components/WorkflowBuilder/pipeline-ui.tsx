"use client"

import { useCallback, useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactFlow, {
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  Panel,
  MarkerType,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { nodeTypes } from './nodes'
import { TemplateOverview } from './template-overview'
import {
  selectNodes,
  selectEdges,
  updateNodes,
  updateEdges,
  addEdge,
  addNode,
} from '@/redux/flowSlice'
import { useNodeId } from '@/hooks/useNodeId'
import { defaultWorkflow } from '@/config/default-workflow'

const proOptions = { hideAttribution: true }

export const PipelineUI = () => {
  const dispatch = useDispatch()
  const nodes = useSelector(selectNodes)
  const edges = useSelector(selectEdges)
  const getNodeId = useNodeId()
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [gridSize, setGridSize] = useState(20)

  const onNodesChange = useCallback(
    (changes) => {
      dispatch(updateNodes(changes))
    },
    [dispatch]
  )

  const onEdgesChange = useCallback(
    (changes) => {
      dispatch(updateEdges(changes))
    },
    [dispatch]
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      dispatch(addEdge(connection))
    },
    [dispatch]
  )

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      if (!reactFlowInstance || !reactFlowWrapper.current) return

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')

      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode: Node = {
        id: getNodeId(type),
        type,
        position,
        data: { label: `${type} node` },
      }

      dispatch(addNode(newNode))
    },
    [reactFlowInstance, dispatch, getNodeId]
  )

  const toggleFullScreen = useCallback(() => setIsFullScreen((prev) => !prev), [])

  useEffect(() => {
    dispatch({ type: 'flow/setInitialState', payload: defaultWorkflow })
  }, [dispatch])

  return (
    <ReactFlowProvider>
      <div
        ref={reactFlowWrapper}
        className={`relative ${isFullScreen ? 'w-full h-screen' : 'w-full h-[calc(100vh-7rem)]'} transition-all`}
      >
        <Panel position="top-right" className="z-10">
          <div className="flex items-center gap-3 bg-white p-2 rounded-md shadow-sm">
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
        </Panel>

        {/* <TemplateOverview /> */}

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: { strokeDasharray: '5,5' },
            markerEnd: { type: MarkerType.Arrow },
          }}
          fitView
          attributionPosition="bottom-left"
          proOptions={proOptions}
        >
          <Background gap={gridSize} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  )
}


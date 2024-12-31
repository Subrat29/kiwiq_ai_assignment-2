"use client"
import { useState } from 'react'
import { WorkflowLayout } from "./WorkflowBuilder/workflow-layout"
import { PipelineUI } from "./WorkflowBuilder/pipeline-ui"

export default function WorkflowBuilder() {
  const [workflows, setWorkflows] = useState([
    { id: "1", name: "Main Workflow", lastModified: new Date(), nodes: [], edges: [] },
  ])
  const [activeWorkflow, setActiveWorkflow] = useState(workflows[0])

  const updateWorkflow = (updatedWorkflow) => {
    setWorkflows((prevWorkflows) =>
      prevWorkflows.map((w) => (w.id === updatedWorkflow.id ? updatedWorkflow : w))
    )
    setActiveWorkflow(updatedWorkflow)
  }

  const handleNodeClick = (node) => {
    const newNode = {
      id: `${node.type}-${activeWorkflow.nodes.length + 1}`,
      type: node.type,
      position: { x: 100, y: 100 }, // Default position, you may want to adjust this
      data: { label: `${node.label} node`, ...(node.data && { workflowData: node.data }) },
    }

    const updatedWorkflow = {
      ...activeWorkflow,
      nodes: [...activeWorkflow.nodes, newNode],
    }

    updateWorkflow(updatedWorkflow)
  }

  return (
    <WorkflowLayout
      workflows={workflows}
      setWorkflows={setWorkflows}
      activeWorkflow={activeWorkflow}
      setActiveWorkflow={setActiveWorkflow}
      onNodeClick={handleNodeClick}
    >
      <PipelineUI
        activeWorkflow={activeWorkflow}
        updateWorkflow={updateWorkflow}
      />
    </WorkflowLayout>
  )
}



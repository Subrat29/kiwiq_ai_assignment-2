import React, { useState } from 'react';
import ReactFlow, { addEdge, Background, Controls } from 'react-flow-renderer';

const WorkflowBuilder = () => {
  const [nodes, setNodes] = useState([
    { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 5 } },
  ]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = (changes) =>
    setNodes((nds) =>
      nds.map((node) => {
        const change = changes.find((c) => c.id === node.id);
        return change ? { ...node, ...change } : node;
      })
    );

  const onEdgesChange = (changes) =>
    setEdges((eds) =>
      eds.map((edge) => {
        const change = changes.find((c) => c.id === edge.id);
        return change ? { ...edge, ...change } : edge;
      })
    );

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div className="h-screen bg-gray-100">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowBuilder;

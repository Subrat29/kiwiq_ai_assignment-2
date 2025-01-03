import { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  Controls,
  Background,
  MarkerType,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "./nodes";
import {
  selectNodes,
  selectEdges,
  updateNodes,
  updateEdges,
  addEdge,
  addNode,
} from "@/redux/flowSlice";
import { useNodeId } from "@/hooks/useNodeId";
import { defaultWorkflow } from "@/config/default-workflow";

const proOptions = { hideAttribution: true };

export const PipelineUI = () => {
  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);
  const edges = useSelector(selectEdges);
  const getNodeId = useNodeId();

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [gridSize, setGridSize] = useState(20);

  const onNodesChange = useCallback(
    (changes) => {
      dispatch(updateNodes(changes));
    },
    [dispatch]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      dispatch(updateEdges(changes));
    },
    [dispatch]
  );

  const onConnect = useCallback(
    (connection) => {
      dispatch(addEdge(connection));
    },
    [dispatch]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getNodeId(type),
        type,
        position,
        data: { label: `${type} node` },
      };

      dispatch(addNode(newNode));
    },
    [reactFlowInstance, dispatch, getNodeId]
  );

  useEffect(() => {
    dispatch({ type: "flow/setInitialState", payload: defaultWorkflow });
  }, [dispatch]);

  return (
    <ReactFlowProvider>
      <div
        ref={reactFlowWrapper}
        className={`relative ${
          isFullScreen ? "w-full h-screen" : "w-full h-[calc(100vh-7rem)]"
        } transition-all`}
      >
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
            type: "smoothstep",
            animated: true,
            style: { strokeDasharray: "5,5" },
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
  );
};
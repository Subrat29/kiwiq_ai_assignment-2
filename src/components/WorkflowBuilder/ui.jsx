import { useCallback, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNode,
  updateNodes,
  updateEdges,
  addEdge,
  selectNodes,
  selectEdges,
} from '../../redux/flowSlice';
import { nodeTypes } from './nodes/index';
import { useNodeId } from '../../hooks/useNodeId';
import 'reactflow/dist/style.css';
import { Maximize2, Minimize2 } from 'lucide-react';

const proOptions = { hideAttribution: true };

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [gridSize, setGridSize] = useState(20);

  const dispatch = useDispatch();
  const getNodeID = useNodeId();
  const nodes = useSelector(selectNodes);
  const edges = useSelector(selectEdges);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const appData = event.dataTransfer.getData('application/reactflow');

      if (!appData || !reactFlowInstance || !reactFlowBounds) return;

      const { nodeType: type } = JSON.parse(appData);
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position,
        data: { id: nodeID, nodeType: type },
      };

      dispatch(addNode(newNode));
    },
    [reactFlowInstance, dispatch, getNodeID]
  );

  const onNodesChange = useCallback((changes) => dispatch(updateNodes(changes)), [dispatch]);
  const onEdgesChange = useCallback((changes) => dispatch(updateEdges(changes)), [dispatch]);
  const onConnect = useCallback((connection) => dispatch(addEdge(connection)), [dispatch]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const toggleFullScreen = useCallback(() => setIsFullScreen((prev) => !prev), []);

  return (
    <div
      ref={reactFlowWrapper}
      className={`relative ${isFullScreen ? 'w-full h-screen' : 'w-full h-[70vh]'} transition-all`}
    >
      <div className="absolute top-4 right-4 z-10 flex items-center gap-3 bg-white p-2 rounded-md shadow">
        <button
          onClick={toggleFullScreen}
          className="p-2 text-gray-500 hover:text-gray-700 transition"
          aria-label="Toggle Fullscreen"
        >
          {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>

        <label className="flex items-center text-gray-600 text-sm">
          Grid:
          <input
            type="range"
            min="10"
            max="40"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            className="ml-2 w-20"
            aria-label="Adjust Grid Size"
          />
        </label>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color="#e3e3e3" gap={gridSize} />
        <Controls
          showZoom
          showInteractive
          showFitView
          className="bg-white bg-opacity-80 p-1 rounded shadow-lg"
        />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

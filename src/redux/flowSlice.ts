import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge as reactFlowAddEdge,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  MarkerType,
} from 'reactflow';

interface NodeIDs {
  input: number;
  output: number;
}

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  nodeIDs: NodeIDs;
}

const initialNodeIDs: NodeIDs = {
  input: 0,
  output: 0,
};

const initialState: FlowState = {
  nodes: [],
  edges: [],
  nodeIDs: { ...initialNodeIDs },
};

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    updateNodes: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    addEdge: (state, action: PayloadAction<Connection>) => {
      const newEdge = {
        ...action.payload,
        id: `${action.payload.source}-${action.payload.target}`,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          height: 20,
          width: 20,
        },
      };
      state.edges = reactFlowAddEdge(newEdge, state.edges);
    },
    updateEdges: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    updateNodeField: (state, action: PayloadAction<{
      nodeId: string;
      fieldName: string;
      fieldValue: any;
    }>) => {
      const { nodeId, fieldName, fieldValue } = action.payload;
      const node = state.nodes.find(node => node.id === nodeId);
      if (node) {
        node.data = {
          ...node.data,
          [fieldName]: fieldValue
        };
      }
    },
    incrementNodeId: (state, action: PayloadAction<keyof NodeIDs>) => {
      const type = action.payload;
      state.nodeIDs[type] = (state.nodeIDs[type] || 0) + 1;
    },
    resetFlow: (state) => {
      state.nodes = [];
      state.edges = [];
      state.nodeIDs = { ...initialNodeIDs };
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
      state.edges = state.edges.filter(
        edge => edge.source !== action.payload && edge.target !== action.payload
      );
    },
  },
});

export const {
  addNode,
  updateNodes,
  addEdge,
  updateEdges,
  updateNodeField,
  incrementNodeId,
  resetFlow,
  deleteNode,
} = flowSlice.actions;

export const selectNodes = (state: { flow: FlowState }) => state.flow.nodes;
export const selectEdges = (state: { flow: FlowState }) => state.flow.edges;
export const selectNodeIDs = (state: { flow: FlowState }) => state.flow.nodeIDs;

export default flowSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge as reactFlowAddEdge,
  MarkerType,
} from 'reactflow';

const initialNodeIDs = {
  customInput: 0,
  llm: 0,
  customOutput: 0,
  text: 0,
  api: 0,
  transform: 0,
  timer: 0,
  filter: 0,
  aggregator: 0
};

const initialState = {
  nodes: [],
  edges: [],
  nodeIDs: { ...initialNodeIDs },
};

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    updateNodes: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    addEdge: (state, action) => {
      const newEdge = {
        ...action.payload,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          height: '20px',
          width: '20px'
        }
      };
      console.log(`Adding edge: ${JSON.stringify(newEdge)}`); // Log edge details
      state.edges = reactFlowAddEdge(newEdge, state.edges);
    },
    updateEdges: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    updateNodeField: (state, action) => {
      const { nodeId, fieldName, fieldValue } = action.payload;
      const node = state.nodes.find(node => node.id === nodeId);
      if (node) {
        console.log(`Updating node field: ${nodeId}, ${fieldName}: ${fieldValue}`); // Log updates
        node.data = {
          ...node.data,
          [fieldName]: fieldValue
        };
      }
    },
    incrementNodeId: (state, action) => {
      const type = action.payload;
      state.nodeIDs[type] = (state.nodeIDs[type] || 0) + 1;
    },
    resetFlow(state) {
      state.nodes = [];
      state.edges = [];
      state.nodeIDs = { ...initialNodeIDs };
    }
  }
});

export const {
  addNode,
  updateNodes,
  addEdge,
  updateEdges,
  updateNodeField,
  incrementNodeId,
  resetFlow
} = flowSlice.actions;

export const selectNodes = (state) => state.flow.nodes;
export const selectEdges = (state) => state.flow.edges;
export const selectNodeIDs = (state) => state.flow.nodeIDs;

export default flowSlice.reducer;

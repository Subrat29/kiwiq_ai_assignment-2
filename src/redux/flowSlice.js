import { createSlice } from '@reduxjs/toolkit'
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge as reactFlowAddEdge,
  MarkerType,
} from 'reactflow'
import { defaultWorkflow } from '../config/default-workflow'

const initialNodeIDs = {
  input: 0,
  output: 0,
}

const initialState = {
  nodes: defaultWorkflow.nodes,
  edges: defaultWorkflow.edges,
  nodeIDs: { ...initialNodeIDs },
  workflowName: defaultWorkflow.name
}

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload)
    },
    updateNodes: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes)
    },
    addEdge: (state, action) => {
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
      }
      state.edges = reactFlowAddEdge(newEdge, state.edges)
    },
    updateEdges: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges)
    },
    updateNodeField: (state, action) => {
      const { nodeId, fieldName, fieldValue } = action.payload
      const node = state.nodes.find(node => node.id === nodeId)
      if (node) {
        node.data = {
          ...node.data,
          [fieldName]: fieldValue
        }
      }
    },
    incrementNodeId: (state, action) => {
      const type = action.payload
      state.nodeIDs[type] = (state.nodeIDs[type] || 0) + 1
    },
    resetFlow: (state) => {
      state.nodes = defaultWorkflow.nodes
      state.edges = defaultWorkflow.edges
      state.nodeIDs = { ...initialNodeIDs }
      state.workflowName = defaultWorkflow.name
    },
    deleteNode: (state, action) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload)
      state.edges = state.edges.filter(
        edge => edge.source !== action.payload && edge.target !== action.payload
      )
    },
    updateWorkflowName: (state, action) => {
      state.workflowName = action.payload
    }
  },
})

export const {
  addNode,
  updateNodes,
  addEdge,
  updateEdges,
  updateNodeField,
  incrementNodeId,
  resetFlow,
  deleteNode,
  updateWorkflowName,
} = flowSlice.actions

export const selectNodes = (state) => state.flow.nodes
export const selectEdges = (state) => state.flow.edges
export const selectNodeIDs = (state) => state.flow.nodeIDs
export const selectWorkflowName = (state) => state.workflowName

export default flowSlice.reducer
import { MarkerType } from "reactflow";

export const defaultWorkflow = {
  name: "Employee Satisfaction Survey Analysis",
  nodes: [
    {
      id: "typeform-1",
      type: "typeform",
      position: { x: 100, y: 100 },
      data: { formId: "ABC123" },
    },
    {
      id: "combine-1",
      type: "combineLists",
      position: { x: 500, y: 100 },
      data: {},
    },
    {
      id: "join-1",
      type: "joinListItems",
      position: { x: 900, y: 100 },
      data: { separator: "\n" },
    },
    {
      id: "ai-1",
      type: "askAI",
      position: { x: 500, y: 350 },
      data: {
        prompt: `You are an expert HR and people's manager that specializes in gathering employee insights and feedback.
                I have provided you data from an employee satisfaction survey in the context.
                I want you to generate a concise 1-page report summarizing key insights, trends, and learnings from the responses.`,
      },
    },
    {
      id: "file-1",
      type: "generateFile",
      position: { x: 900, y: 350 },
      data: { fileName: "Employee Satisfaction Report", fileType: "pdf" },
    },
    {
      id: "notes-1",
      type: "notes",
      position: { x: 100, y: 350 },
      data: {
        notes: `Template Overview:
• This workflow automates the analysis of employee satisfaction survey responses.

Inputs Required:
1. Typeform Authentication

Here's How It Works:
• The flow fetches specified responses from the selected typeform.
• AI generates an analysis report, highlighting key insights, trends, and areas for improvement based on the survey responses.
• Feel free to customize the AI prompts to fine-tune and personalize the output!`,
      },
    },
  ],
  edges: [
    {
      id: "e1-2a",
      source: "typeform-1",
      target: "combine-1",
      sourceHandle: "q1",
      targetHandle: "input1",
      type: "smoothstep",
      animated: true,
      markerEnd: { type: MarkerType.Arrow },
    },
    {
      id: "e1-2b",
      source: "typeform-1",
      target: "combine-1",
      sourceHandle: "q2",
      targetHandle: "input2",
      type: "smoothstep",
      animated: true,
      markerEnd: { type: MarkerType.Arrow },
    },
    {
      id: "e1-2c",
      source: "typeform-1",
      target: "combine-1",
      sourceHandle: "q3",
      targetHandle: "input3",
      type: "smoothstep",
      animated: true,
      markerEnd: { type: MarkerType.Arrow },
    },
    {
      id: "e2-3",
      source: "combine-1",
      target: "join-1",
      sourceHandle: "combined",
      targetHandle: "list",
      type: "smoothstep",
      animated: true,
      markerEnd: { type: MarkerType.Arrow },
    },
    {
      id: "e3-4",
      source: "join-1",
      target: "ai-1",
      sourceHandle: "joinedList",
      targetHandle: "context",
      type: "smoothstep",
      animated: true,
      markerEnd: { type: MarkerType.Arrow },
    },
    {
      id: "e4-5",
      source: "ai-1",
      target: "file-1",
      sourceHandle: "response",
      targetHandle: "fileContents",
      type: "smoothstep",
      animated: true,
      markerEnd: { type: MarkerType.Arrow },
    },
  ],
};
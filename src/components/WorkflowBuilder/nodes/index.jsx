import { InputNode } from './inputNode';
import { LLMNode } from './llmNode';
import { OutputNode } from './outputNode';
import { TextNode } from './textNode';
import { APINode } from './APINode';
import { TransformNode } from './TransformNode';
import { TimerNode } from './TimerNode';
import { FilterNode } from './FilterNode';
import { AggregatorNode } from './AggregatorNode';

export const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  transform: TransformNode,
  timer: TimerNode,
  filter: FilterNode,
  aggregator: AggregatorNode,
};
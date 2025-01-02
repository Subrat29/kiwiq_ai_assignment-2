import { TypeformNode } from './typeform-node'
import { CombineListsNode } from './combine-lists-node'
import { JoinListItemsNode } from './join-list-items-node'
import { AskAINode } from './ask-ai-node'
import { GenerateFileNode } from './generate-file-node'
import { NotesNode } from './notes-node'
import { InputNode } from './input-node'
import { OutputNode } from './output-node'
import { ChannelNode } from './channel-node'
import { SegmentNode } from './segment-node'
import { MetricNode } from './metric-node'
import { AnalysisNode } from './analysis-node'

export const nodeTypes = {
  typeform: TypeformNode,
  combineLists: CombineListsNode,
  joinListItems: JoinListItemsNode,
  askAI: AskAINode,
  generateFile: GenerateFileNode,
  notes: NotesNode,
  input: InputNode,
  output: OutputNode,
  channel: ChannelNode,
  segment: SegmentNode,
  metric: MetricNode,
  analysis: AnalysisNode,
}


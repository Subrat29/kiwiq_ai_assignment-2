import { ListTree } from 'lucide-react'
import { BaseNode } from './base-node'
import { Position } from 'reactflow'

export const CombineListsNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Combine Lists"
      description="Combines multiple lists into a single list."
      variant="list"
      data={{
        ...data,
        icon: <ListTree className="h-4 w-4" />,
        subtitle: "List Operations",
      }}
      inputs={[
        { id: 'input1', label: 'Input 1', style: { top: '-12px', left: '25%', transform: 'translateX(-50%)' } },
        { id: 'input2', label: 'Input 2', style: { top: '-12px', left: '50%', transform: 'translateX(-50%)' } },
        { id: 'input3', label: 'Input 3', style: { top: '-12px', left: '75%', transform: 'translateX(-50%)' } }
      ]}
      outputs={[
        { id: 'combined', label: 'Combined List', style: { bottom: '-12px', left: '50%', transform: 'translateX(-50%)' } }
      ]}
    >
      <div className="text-sm text-gray-500">
        This node will combine the input lists in the order they are connected.
      </div>
    </BaseNode>
  )
}


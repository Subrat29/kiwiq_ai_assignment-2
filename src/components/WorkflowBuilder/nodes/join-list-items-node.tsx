import { ListTree } from 'lucide-react'
import { BaseNode } from './base-node'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Position } from 'reactflow'

export const JoinListItemsNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Join List Items"
      description="Joins list items into a single text string."
      variant="list"
      data={{
        ...data,
        icon: <ListTree className="h-4 w-4" />,
        subtitle: "List Operations",
      }}
      inputs={[
        { id: 'list', label: 'List', style: { top: '-12px', left: '50%', transform: 'translateX(-50%)' } }
      ]}
      outputs={[
        { id: 'joinedList', label: 'Joined List', style: { bottom: '-12px', left: '50%', transform: 'translateX(-50%)' } }
      ]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="separator">Separator</Label>
          <Input
            id="separator"
            value={data.separator || ''}
            onChange={(e) => data.updateField('separator', e.target.value)}
            placeholder="Enter separator (e.g., comma, newline)"
          />
        </div>
      </div>
    </BaseNode>
  )
}


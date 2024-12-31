import { StickyNote } from 'lucide-react'
import { BaseNode } from './base-node'
import { Textarea } from "@/components/ui/textarea"

export const NotesNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Notes"
      description="Add notes or comments to your workflow"
      variant="notes"
      data={{
        ...data,
        icon: <StickyNote className="h-4 w-4" />,
        subtitle: "Documentation",
      }}
    >
      <div className="space-y-4">
        <Textarea
          value={data.notes || ''}
          onChange={(e) => data.updateField('notes', e.target.value)}
          placeholder="Enter your notes here..."
          rows={6}
        />
      </div>
    </BaseNode>
  )
}


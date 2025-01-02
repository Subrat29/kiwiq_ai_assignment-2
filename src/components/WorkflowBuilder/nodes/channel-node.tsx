import { BaseNode } from './base-node'
import { Linkedin } from 'lucide-react'

export const ChannelNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LinkedIn"
      description="Data source: LinkedIn"
      variant="channel"
      data={{
        ...data,
        icon: <Linkedin className="h-4 w-4" />,
        subtitle: "Channel",
      }}
      outputs={[
        { id: 'output', label: 'Data' }
      ]}
    >
      <div className="text-sm text-gray-500">
        LinkedIn data source
      </div>
    </BaseNode>
  )
}


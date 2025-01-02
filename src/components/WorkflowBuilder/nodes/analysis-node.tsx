import { BaseNode } from './base-node'
import { LineChart } from 'lucide-react'
import { Card } from "@/components/ui/card"

export const AnalysisNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Performance Analysis"
      description="Analyze selected metrics"
      variant="analysis"
      data={{
        ...data,
        icon: <LineChart className="h-4 w-4" />,
        subtitle: "Analysis",
      }}
      inputs={[
        { id: 'input', label: 'Metric Data' }
      ]}
    >
      <Card className="p-4">
        <div className="text-sm font-medium mb-2">Sample Chart</div>
        <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400">
          Chart Placeholder
        </div>
      </Card>
    </BaseNode>
  )
}


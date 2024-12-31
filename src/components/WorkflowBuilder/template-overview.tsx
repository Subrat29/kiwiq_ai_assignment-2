import { Card } from "@/components/ui/card"
import { SparklesIcon } from 'lucide-react'

export function TemplateOverview() {
  return (
    <Card className="absolute top-4 right-4 w-80 p-6 bg-white/95 backdrop-blur-sm shadow-lg border-gray-200">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-semibold">Template Overview:</h2>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <span className="text-red-500">📌</span> Inputs Required:
          </h3>
          <ul className="list-decimal pl-5 space-y-1">
            <li>Typeform Authentication</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Here's How It Works:</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>The flow fetches specified responses from the selected typeform.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>AI generates an analysis report, highlighting key insights, trends, and areas for improvement based on the survey responses.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">✨</span>
              <span>Feel free to customize the AI prompts to fine-tune and personalize the output!</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  )
}


import React from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Heading, BarChart, PieChart, LineChart, Text } from 'lucide-react'

const components = [
  { type: 'Heading', icon: Heading, label: 'Heading' },
  { type: 'Subheading', icon: Heading, label: 'Subheading' },
  { type: 'Text', icon: Text, label: 'Paragraph' },
  { type: 'BarChart', icon: BarChart, label: 'Bar Chart' },
  { type: 'PieChart', icon: PieChart, label: 'Pie Chart' },
  { type: 'LineChart', icon: LineChart, label: 'Line Chart' },
]

export function Sidebar({ setElements }) {
  const addElement = (type) => {
    const newElement = {
      type,
      ...(type.includes('Chart')
        ? { data: [10, 20, 30, 40], labels: ['A', 'B', 'C', 'D'] }
        : { text: `New ${type}` }),
    }
    setElements((els) => [...els, newElement])
  }

  return (
    <div className="w-64 border-r bg-background">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Add Components</h3>
          {components.map((component) => (
            <Button
              key={component.type}
              onClick={() => addElement(component.type)}
              className="w-full justify-start"
              variant="outline"
            >
              <component.icon className="mr-2 h-4 w-4" />
              {component.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}


// DraggableElement.jsx
import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ChartComponent } from './chart-component'
import { X, GripVertical } from 'lucide-react'

// DraggableElement.jsx
export function DraggableElement({ element, index, onUpdate, onDelete, moveElement, isPreview }) {
  const [, ref] = useDrag({
    type: 'element',
    item: { index },
  })

  const [, drop] = useDrop({
    accept: 'element',
    hover: (item) => {
      if (item.index !== index) {
        moveElement(item.index, index)
        item.index = index
      }
    },
  })

  const handleTextChange = (e) => {
    onUpdate({ text: e.target.value })
  }

  const addChartRow = () => {
    onUpdate({
      data: [...element.data, 0],
      labels: [...(element.labels || []), `Label ${element.labels?.length + 1 || 1}`],
    })
  }

  const updateChartValue = (index, value) => {
    const newData = [...element.data]
    newData[index] = value
    onUpdate({ data: newData })
  }

  const updateLabel = (index, value) => {
    const newLabels = [...(element.labels || [])]
    newLabels[index] = value
    onUpdate({ labels: newLabels })
  }

  const renderControls = () => {
    if (isPreview) return null

    return (
      <div className="absolute -right-2 -top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onDelete} 
          className="h-8 w-8 bg-background border shadow-sm hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 cursor-move bg-background border shadow-sm"
        >
          <GripVertical className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  const renderContent = () => {
    if (element.type.includes('Chart')) {
      return (
        <div className="relative">
          <ChartComponent type={element.type} data={element.data} labels={element.labels} />
          {element.type.includes('Chart') && !isPreview && (
            <div className="mt-4 space-y-2">
              <Button onClick={addChartRow} variant="outline" size="sm">
                Add Entry
              </Button>
              {element.data.map((val, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Label className="w-20">{`Label ${i + 1}`}</Label>
                  <Input
                    type="text"
                    value={element.labels?.[i] || ''}
                    onChange={(e) => updateLabel(i, e.target.value)}
                    placeholder={`Label ${i + 1}`}
                    className="w-32"
                  />
                  <Input
                    type="number"
                    value={val}
                    onChange={(e) => updateChartValue(i, Number(e.target.value))}
                    className="w-24"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    if (isPreview) {
      return (
        <div
          className={`${
            element.type === 'Heading'
              ? 'text-4xl font-bold mb-6'
              : element.type === 'Subheading'
              ? 'text-2xl font-semibold mb-4 text-muted-foreground'
              : 'text-base leading-relaxed'
          }`}
        >
          {element.text || `Enter ${element.type} here...`}
        </div>
      )
    }

    return (
      <Textarea
        value={element.text || ''}
        onChange={handleTextChange}
        className={`w-full resize-y min-h-[100px] ${
          element.type === 'Heading'
            ? 'text-4xl font-bold'
            : element.type === 'Subheading'
            ? 'text-2xl font-semibold text-muted-foreground'
            : 'text-base'
        }`}
        placeholder={`Enter ${element.type} here...`}
      />
    )
  }

  if (isPreview) {
    return <div className="mb-4">{renderContent()}</div>
  }

  return (
    <Card 
      ref={(node) => ref(drop(node))} 
      className="relative mb-4 transition-colors group"
    >
      {renderControls()}
      <CardContent className="p-4">
        {renderContent()}
      </CardContent>
    </Card>
  )
}

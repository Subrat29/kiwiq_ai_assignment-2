import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ChartComponent } from './chart-component'

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

  return (
    <Card ref={(node) => ref(drop(node))} className="relative">
      <CardContent className="p-4">
        {!isPreview && (
          <div className="absolute top-2 right-2 flex space-x-2">
            <Button variant="ghost" size="icon" onClick={onDelete}>
              ✖
            </Button>
            <span className="cursor-move text-gray-500">↕</span>
          </div>
        )}
        {element.type.includes('Chart') ? (
          <ChartComponent type={element.type} data={element.data} labels={element.labels} />
        ) : (
          <Input
            type="text"
            value={element.text || ''}
            onChange={handleTextChange}
            className={
              element.type === 'Heading'
                ? 'text-2xl font-bold'
                : element.type === 'Subheading'
                ? 'text-xl font-semibold'
                : ''
            }
            disabled={isPreview}
          />
        )}
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
      </CardContent>
    </Card>
  )
}


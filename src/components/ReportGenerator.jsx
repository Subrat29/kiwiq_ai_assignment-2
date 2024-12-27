'use client'

import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button } from '@/components/ui/button'
import { Sidebar } from './ReportGenerator/Sidebar'
import { DraggableElement } from './ReportGenerator/draggable-element'

export default function ReportGenerator() {
  const [elements, setElements] = useState([])
  const [isPreview, setIsPreview] = useState(false)

  const updateElement = (index, newData) => {
    setElements((els) => els.map((el, i) => (i === index ? { ...el, ...newData } : el)))
  }

  const deleteElement = (index) => {
    setElements((els) => els.filter((_, i) => i !== index))
  }

  const moveElement = (dragIndex, hoverIndex) => {
    const updatedElements = [...elements]
    const [removed] = updatedElements.splice(dragIndex, 1)
    updatedElements.splice(hoverIndex, 0, removed)
    setElements(updatedElements)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar setElements={setElements} />
        <div className="flex-grow overflow-auto bg-background p-6">
          <div className="mb-6">
            <Button
              onClick={() => setIsPreview(!isPreview)}
              variant={isPreview ? "secondary" : "default"}
            >
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
          <div className="space-y-4">
            {elements.map((el, index) => (
              <DraggableElement
                key={index}
                index={index}
                element={el}
                onUpdate={(newData) => updateElement(index, newData)}
                onDelete={() => deleteElement(index)}
                moveElement={moveElement}
                isPreview={isPreview}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}


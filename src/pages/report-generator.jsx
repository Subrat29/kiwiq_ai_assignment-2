import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/ui/button';
import { Sidebar } from '../components/ReportGenerator/sidebar';
import { DraggableElement } from '../components/ReportGenerator/draggable-element';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { defaultReport } from '@/config/default-report';

export default function ReportGenerator() {
  const navigate = useNavigate();
  const [elements, setElements] = useState(defaultReport);
  const [isPreview, setIsPreview] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const updateElement = (index, newData) => {
    setElements((els) => els.map((el, i) => (i === index ? { ...el, ...newData } : el)));
  };

  const deleteElement = (index) => {
    setElements((els) => els.filter((_, i) => i !== index));
  };

  const moveElement = (dragIndex, hoverIndex) => {
    const updatedElements = [...elements];
    const [removed] = updatedElements.splice(dragIndex, 1);
    updatedElements.splice(hoverIndex, 0, removed);
    setElements(updatedElements);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <Sidebar
          setElements={setElements}
          isPreview={isPreview}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        <div className="flex-grow overflow-auto bg-background p-4 md:p-6">
          <div className="mb-6 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/workflow-builder')}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              data-mobile-trigger="true"
            >
              {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>

            <Button
              onClick={() => setIsPreview(!isPreview)}
              variant={isPreview ? "secondary" : "default"}
              className="w-24"
            >
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>

          <div className={`max-w-4xl mx-auto ${isPreview ? 'preview-mode' : ''}`}>
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
  );
}
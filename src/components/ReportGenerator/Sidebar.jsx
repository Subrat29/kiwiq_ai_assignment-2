import React, { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Heading, BarChart, PieChart, LineChart, Text } from 'lucide-react'
import { X } from 'lucide-react'  // Added Menu import

const components = [
  { type: 'Heading', icon: Heading, label: 'Heading' },
  { type: 'Subheading', icon: Heading, label: 'Subheading' },
  { type: 'Text', icon: Text, label: 'Paragraph' },
  { type: 'BarChart', icon: BarChart, label: 'Bar Chart' },
  { type: 'PieChart', icon: PieChart, label: 'Pie Chart' },
  { type: 'LineChart', icon: LineChart, label: 'Line Chart' },
]

export function Sidebar({ setElements, isPreview, isMobileOpen, onCloseMobile }) {
  const sidebarRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('button[data-mobile-trigger="true"]')) {
        onCloseMobile()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileOpen, onCloseMobile])

  const addElement = (type) => {
    const newElement = {
      type,
      ...(type.includes('Chart')
        ? { data: [10, 20, 30, 40], labels: ['A', 'B', 'C', 'D'] }
        : { text: `New ${type}` }),
    }
    setElements((els) => [...els, newElement])
    if (isMobileOpen) onCloseMobile()
  }

  if (isPreview) return null

  return (
    <>
      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm md:hidden z-40"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed md:relative 
          w-64 md:w-72 
          h-screen 
          border-r 
          bg-background 
          shadow-lg md:shadow-none
          transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          z-50
        `}
      >
        <div className="flex justify-between items-center p-4 border-b md:border-0">
          <h3 className="text-lg font-semibold">Add Components</h3>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onCloseMobile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-65px)]">
          <div className="p-4 space-y-4">
            {components.map((component) => (
              <Button
                key={component.type}
                onClick={() => {
                  setElements((els) => [
                    ...els,
                    {
                      type: component.type,
                      ...(component.type.includes('Chart')
                        ? { data: [10, 20, 30, 40], labels: ['A', 'B', 'C', 'D'] }
                        : { text: `New ${component.type}` }),
                    },
                  ])
                  onCloseMobile()
                }}
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
    </>
  )
}
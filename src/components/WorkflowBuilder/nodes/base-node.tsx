"use client"

import * as React from "react"
import { Handle, Position } from "reactflow"
import { useDispatch } from 'react-redux'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { X, Maximize2, HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { deleteNode } from "@/redux/flowSlice"
import { cn } from "@/lib/utils"
import { nodeStyles, HANDLE_STYLES } from "@/styles/node-styles"

interface BaseNodeProps {
  id: string;
  data: {
    icon?: React.ReactNode;
    subtitle?: string;
    [key: string]: any;
  };
  title: string;
  description?: string;
  inputs?: { id: string; label?: string }[];
  outputs?: { id: string; label?: string }[];
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof nodeStyles;
  handlePosition?: Position;
}

export const createHandle = ({ type, position, id, style = {}, label = "", ...props }) => (
  <div className="relative">
    <Handle
      type={type}
      position={position}
      id={id}
      style={{ ...HANDLE_STYLES, ...style }}
      {...props}
    />
    {label && (
      <span 
        className="absolute text-xs text-gray-500"
        style={{
          [position === Position.Top ? 'bottom' : 'top']: '14px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        {label}
      </span>
    )}
  </div>
)

export const BaseNode: React.FC<BaseNodeProps> = ({
  id,
  data,
  title,
  description,
  inputs = [],
  outputs = [],
  children,
  className,
  variant = 'typeform',
  handlePosition = Position.Bottom,
}) => {
  const dispatch = useDispatch()
  const styles = nodeStyles[variant]
  const [isLoopMode, setIsLoopMode] = React.useState(false)

  const handleDelete = React.useCallback(() => {
    dispatch(deleteNode(id))
  }, [dispatch, id])

  const renderHandles = (handles, type, position) =>
    handles.map((handle, index) => {
      const xPosition = `${((index + 1) * 100) / (handles.length + 1)}%`
      let yPosition = position === Position.Top ? "-6px" : "calc(100% + 6px)"
      
      return createHandle({
        key: `${type}-${handle.id}`,
        type,
        position,
        id: `${id}-${handle.id}`,
        style: { 
          left: xPosition, 
          top: yPosition,
          borderColor: styles.handle.border,
          background: styles.handle.background
        },
        label: handle.label,
        ...(handle.props || {}),
      })
    })

    console.log("id", id)
    console.log("data", data)
    console.log("title", title)
    console.log("description", description)
    console.log("inputs", inputs)
    console.log("outputs", outputs)
    console.log("children", children)
    console.log("className", className)
    console.log("variant", variant)
    console.log("handlePosition", handlePosition)
    console.log("styles", styles)
    console.log("isLoopMode", isLoopMode)


  return (
    <TooltipProvider>
      <Card 
        className={cn(
          "w-[320px] rounded-xl shadow-sm border-2",
          styles.background,
          styles.border,
          className
        )}
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {data.icon && (
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg bg-white/80",
                styles.icon
              )}>
                {data.icon}
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-900">{title}</span>
                {description && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">{description}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <p className="text-sm text-gray-500">{data.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">Loop Mode</span>
              <Switch
                checked={isLoopMode}
                onCheckedChange={setIsLoopMode}
                size="sm"
              />
            </div> */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-gray-600"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-gray-600"
              onClick={handleDelete}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <div className="relative space-y-4 p-4">
          {renderHandles(inputs, "target", Position.Top)}
          {React.Children.map(children, child =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  data: data,
                })
              : child
          )}
          {renderHandles(outputs, "source", Position.Bottom)}
        </div>

      </Card>
    </TooltipProvider>
  )
}


"use client"

import * as React from "react"
import { Handle, Position } from "reactflow"
import { useDispatch } from 'react-redux'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Copy, Pencil, Settings2, Trash2, HelpCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { deleteNode, updateNodeField } from "@/redux/flowSlice"
import { cn } from "@/lib/utils"

const HANDLE_STYLES = {
  width: "12px",
  height: "12px",
  background: "white",
  border: "2px solid #6366F1",
  borderRadius: "50%",
  zIndex: 5,
}

export const createHandle = ({ type, position, id, style = {}, ...props }) => (
  <Handle
    type={type}
    position={position}
    id={id}
    style={{ ...HANDLE_STYLES, ...style }}
    {...props}
  />
)

export const BaseNode = ({
  id,
  data,
  title,
  description,
  inputs = [],
  outputs = [],
  children,
  className,
}) => {
  const dispatch = useDispatch()

  const handleDelete = React.useCallback(() => {
    dispatch(deleteNode(id))
  }, [dispatch, id])

  const handleUpdateField = React.useCallback((fieldName: string, value: any) => {
    dispatch(updateNodeField({ nodeId: id, fieldName, fieldValue: value }))
  }, [dispatch, id])

  const renderHandles = (handles, type, position) =>
    handles.map((handle, index) => {
      const yPosition = type === 'target' ? -6 : "calc(100% + 6px)"
      const xPosition = `${((index + 1) * 100) / (handles.length + 1)}%`
      return createHandle({
        key: `${type}-${handle.id}`,
        type,
        position,
        id: `${id}-${handle.id}`,
        style: { left: xPosition, top: yPosition },
        ...(handle.props || {}),
      })
    })

  return (
    <TooltipProvider>
      <Card className={cn(
        "relative w-[360px] rounded-xl bg-gray-50/95 shadow-md border-gray-200",
        className
      )}>
        <div className="flex items-start justify-between p-4 pb-3">
          <div className="flex items-center gap-2">
            {data.icon && (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200/80">
                <span className="text-gray-700">{data.icon}</span>
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-900">{title}</span>
                {description && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                        <HelpCircle className="h-4 w-4 text-gray-500" />
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
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Duplicate</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings2 className="mr-2 h-4 w-4" />
                  <span>Configure Inputs</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDelete}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-gray-900"
              onClick={handleDelete}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative space-y-4 p-4 pt-0">
          {renderHandles(inputs, "target", Position.Top)}
          {React.Children.map(children, child =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  updateField: handleUpdateField,
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


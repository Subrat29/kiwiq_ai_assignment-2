"use client"

import * as React from "react"
import { Handle, Position } from "reactflow"
import { useDispatch } from "react-redux"
import { updateNodeField } from "@/redux/flowSlice"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const HANDLE_STYLES = {
  width: "8px",
  height: "8px",
  background: "white",
  border: "2px solid var(--primary)",
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
  inputs = [],
  outputs = [],
  children,
  className,
}) => {
  const dispatch = useDispatch()

  const updateField = (fieldName, fieldValue) => {
    dispatch(updateNodeField({ nodeId: id, fieldName, fieldValue }))
  }

  const renderHandles = (handles, type, position, offset) =>
    handles.map((handle, index) => {
      const yPosition = `${((index + 1) * 100) / (handles.length + 1)}%`
      return createHandle({
        key: `${type}-${handle.id}`,
        type,
        position,
        id: `${id}-${handle.id}`,
        style: { [offset]: "-4px", top: yPosition },
        ...(handle.props || {}),
      })
    })

  return (
    <Card className={cn("w-[280px] shadow-md", className)}>
      <CardHeader className="flex flex-row items-center gap-2 py-3">
        {data.icon && <span className="text-muted-foreground">{data.icon}</span>}
        <span className="font-medium">{title}</span>
      </CardHeader>
      <CardContent className="relative py-4">
        {renderHandles(inputs, "target", Position.Left, "left")}
        <div className="space-y-4">
          {React.Children.map(children, (child) =>
            typeof child.type === "function"
              ? React.cloneElement(child, { updateField, data })
              : child
          )}
        </div>
        {renderHandles(outputs, "source", Position.Right, "right")}
      </CardContent>
    </Card>
  )
}


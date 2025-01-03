import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

export function NodeCategory({ title, count, children, className }) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("space-y-2", className)}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between p-2 text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            {title}
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
              {count}
            </span>
          </span>
          <ChevronRight
            className={cn("h-4 w-4 transition-transform", {
              "rotate-90": isOpen,
            })}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
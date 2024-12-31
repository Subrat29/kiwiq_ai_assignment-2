"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Share2, Save, Play, ChevronDown, Search, Settings, ChevronRight, ChevronLeft, Copy, Trash, Edit } from 'lucide-react'
import { NodeCategory } from "./node-category"
import { DraggableNode } from "./draggableNode"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import { useDispatch } from 'react-redux'
import { addNode, selectWorkflowName } from '@/redux/flowSlice'
import { useNodeId } from '@/hooks/useNodeId'
import { useSelector } from 'react-redux'
import { ClipboardList, ListTree, FileText, Bot, StickyNote, ArrowDownToLine, ArrowUpToLine } from 'lucide-react'

interface Workflow {
  id: string
  name: string
  lastModified: Date
  nodes: any[]
  edges: any[]
}

export function WorkflowLayout({ children }: { children: React.ReactNode }) {
  const [workflows, setWorkflows] = React.useState<Workflow[]>([
    { id: "1", name: "Employee Satisfaction Survey Analysis", lastModified: new Date(), nodes: [], edges: [] },
  ])
  const [activeWorkflow, setActiveWorkflow] = React.useState(workflows[0])
  const [activeTabIndex, setActiveTabIndex] = React.useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isRenameDialogOpen, setIsRenameDialogOpen] = React.useState(false)
  const [newWorkflowName, setNewWorkflowName] = React.useState("")

  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const workflowName = useSelector(selectWorkflowName)

  const createNewWorkflow = () => {
    const newWorkflow: Workflow = {
      id: `${workflows.length + 1}`,
      name: `Workflow ${workflows.length + 1}`,
      lastModified: new Date(),
      nodes: [],
      edges: [],
    }
    setWorkflows([...workflows, newWorkflow])
    setActiveWorkflow(newWorkflow)
    setActiveTabIndex(workflows.length)

    // Scroll to the new tab after it's created
    setTimeout(() => {
      const container = scrollContainerRef.current
      if (container) {
        container.scrollLeft = container.scrollWidth
      }
    }, 100)
  }

  const navigateWorkflow = (direction: 'next' | 'prev') => {
    const currentIndex = workflows.findIndex(w => w.id === activeWorkflow.id)
    let newIndex
    
    if (direction === 'next') {
      newIndex = currentIndex + 1 >= workflows.length ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex - 1 < 0 ? workflows.length - 1 : currentIndex - 1
    }
    
    setActiveWorkflow(workflows[newIndex])
    setActiveTabIndex(newIndex)

    // Ensure the new active tab is visible
    const container = scrollContainerRef.current
    if (container) {
      const tabs = container.getElementsByTagName('button')
      if (tabs[newIndex]) {
        tabs[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }

  const deleteWorkflow = (id: string) => {
    const updatedWorkflows = workflows.filter((w) => w.id !== id)
    if (updatedWorkflows.length === 0) {
      createNewWorkflow()
      return
    }
    setWorkflows(updatedWorkflows)
    if (activeWorkflow.id === id) {
      const newIndex = Math.min(activeTabIndex, updatedWorkflows.length - 1)
      setActiveWorkflow(updatedWorkflows[newIndex])
      setActiveTabIndex(newIndex)
    }
  }

  const duplicateWorkflow = (workflow: Workflow) => {
    const newWorkflow: Workflow = {
      ...workflow,
      id: `${workflows.length + 1}`,
      name: `${workflow.name} (Copy)`,
      lastModified: new Date(),
    }
    setWorkflows([...workflows, newWorkflow])
  }

  const renameWorkflow = (id: string, newName: string) => {
    if (!newName.trim()) return
    const updatedWorkflows = workflows.map((w) =>
      w.id === id ? { ...w, name: newName } : w
    )
    setWorkflows(updatedWorkflows)
    if (activeWorkflow.id === id) {
      setActiveWorkflow({ ...activeWorkflow, name: newName })
    }
  }

  const nodeTypes = [
    { type: "input", label: "Input", icon: <ArrowDownToLine className="h-4 w-4" /> },
    { type: "output", label: "Output", icon: <ArrowUpToLine className="h-4 w-4" /> },
    { type: "typeform", label: "Typeform Submission Reader", icon: <ClipboardList className="h-4 w-4" /> },
    { type: "combineLists", label: "Combine Lists", icon: <ListTree className="h-4 w-4" /> },
    { type: "joinListItems", label: "Join List Items", icon: <ListTree className="h-4 w-4" /> },
    { type: "askAI", label: "Ask AI", icon: <Bot className="h-4 w-4" /> },
    { type: "generateFile", label: "Generate File", icon: <FileText className="h-4 w-4" /> },
    { type: "notes", label: "Notes", icon: <StickyNote className="h-4 w-4" /> },
  ]

  const filteredNodes = nodeTypes.filter((node) =>
    node.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const dispatch = useDispatch()
  const getNodeId = useNodeId()

  const handleAddNode = (nodeData: { type: string, label: string }) => {
    const newNode = {
      id: getNodeId(nodeData.type),
      type: nodeData.type,
      position: { x: 100, y: 100 },
      data: { label: `${nodeData.label} node` },
    }
    dispatch(addNode(newNode))
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen flex-col">
        {/* Responsive Header */}
        <header className="flex h-14 items-center gap-2 border-b bg-background px-2 sm:px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          <div className="flex flex-1 items-center gap-2 overflow-hidden">
            <span className="truncate font-semibold">{activeWorkflow.name}</span>
            <span className="hidden text-sm text-muted-foreground sm:inline">Unsaved</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden h-8 w-8 sm:inline-flex">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save</TooltipContent>
            </Tooltip>
            <Button size="sm" className="h-8">
              <Play className="mr-2 h-3 w-3" />
              <span className="hidden sm:inline">Run</span>
            </Button>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          {isSidebarOpen && (
            <aside className="w-[300px] border-r bg-background">
              <Tabs defaultValue="nodes" className="h-full">
                <TabsList className="w-full justify-start rounded-none border-b px-4 h-12">
                  <TabsTrigger value="nodes">Node Library</TabsTrigger>
                  <TabsTrigger value="subflows">Subflow Library</TabsTrigger>
                </TabsList>
                <TabsContent value="nodes" className="h-[calc(100%-3rem)] p-0">
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search nodes..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(100%-5rem)]">
                    <div className="grid gap-2 p-4">
                      <NodeCategory title="Nodes" count={filteredNodes.length}>
                        {filteredNodes.map((node) => (
                          <DraggableNode
                            key={node.type}
                            type={node.type}
                            label={node.label}
                            icon={node.icon}
                            onClick={handleAddNode}
                          />
                        ))}
                      </NodeCategory>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="subflows" className="h-[calc(100%-3rem)] p-0">
                  <ScrollArea className="h-full">
                    <div className="grid gap-2 p-4">
                      {workflows.map((workflow) => (
                        <DraggableNode
                          key={workflow.id}
                          type="subflow"
                          label={workflow.name}
                          data={workflow}
                          onClick={handleAddNode}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </aside>
          )}
          <main className="flex-1 overflow-hidden bg-background/50">
            {children}
          </main>
        </div>
         {/* New Footer with Fixed Plus Icon and Navigation */}
        <footer className="border-t bg-background">
          <div className="flex h-12 items-center justify-between px-2">
            {/* Fixed Plus Button on Left */}
            <div className="flex-none pl-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={createNewWorkflow}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-accent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add New Stage</TooltipContent>
              </Tooltip>
            </div>

            {/* Scrollable Tabs */}
            <div className="flex-1 overflow-hidden mx-4">
              <ScrollArea 
                ref={scrollContainerRef}
                className="w-full" 
                orientation="horizontal"
              >
                <div className="flex gap-1 px-2">
                  {workflows.map((workflow, index) => (
                    <DropdownMenu key={workflow.id}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={workflow.id === activeWorkflow.id ? "secondary" : "ghost"}
                          className={cn(
                            "h-8 px-3 text-sm font-normal",
                            workflow.id === activeWorkflow.id && "font-medium"
                          )}
                          onClick={() => {
                            setActiveWorkflow(workflow)
                            setActiveTabIndex(index)
                          }}
                        >
                          {workflow.name}
                          <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem onClick={() => {
                          setNewWorkflowName(workflow.name)
                          setIsRenameDialogOpen(true)
                        }}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Rename</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => duplicateWorkflow(workflow)}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => deleteWorkflow(workflow.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Navigation Arrows on Right */}
            <div className="flex-none flex items-center gap-1 pr-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigateWorkflow('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Previous Stage</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigateWorkflow('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Next Stage</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </footer>

        {/* Rename Dialog */}
        <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename Stage</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newWorkflowName}
                  onChange={(e) => setNewWorkflowName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => {
                renameWorkflow(activeWorkflow.id, newWorkflowName)
                setIsRenameDialogOpen(false)
              }}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}


import { useState, useEffect } from 'react'
import { WorkflowLayout } from "../components/WorkflowBuilder/workflow-layout"
import { PipelineUI } from "../components/WorkflowBuilder/pipeline-ui"
import { NaturalLanguageQuery } from "../components/WorkflowBuilder/natural-language-query"
import { processNaturalLanguage } from "@/nlp/nlp"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WorkflowBuilder() {
  const [query, setQuery] = useState("")
  const [workflow, setWorkflow] = useState({ nodes: [], edges: [] })
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (query) {
      const { nodes, edges } = processNaturalLanguage(query)
      setWorkflow({ nodes, edges })
    }
  }, [query])

  const updateWorkflowFromDiagram = (updatedWorkflow) => {
    setWorkflow(updatedWorkflow)
    setQuery("Updated based on diagram changes")
  }

  const MobileLayout = () => (
    <div className="h-full w-full flex flex-col">
      <Tabs defaultValue="query" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b px-4">
          <TabsTrigger value="query">Query</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        </TabsList>
        <TabsContent value="query" className="p-4 h-[calc(100vh-8rem)]">
          <NaturalLanguageQuery query={query} setQuery={setQuery} />
        </TabsContent>
        <TabsContent value="pipeline" className="p-0 h-[calc(100vh-8rem)]">
          <PipelineUI
            workflow={workflow}
            updateWorkflow={updateWorkflowFromDiagram}
          />
        </TabsContent>
      </Tabs>
    </div>
  )

  const DesktopLayout = () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full rounded-lg border"
    >
      <ResizablePanel
        defaultSize={40}
        minSize={30}
        maxSize={60}
        collapsible={true}
        onCollapse={() => setIsCollapsed(true)}
        onExpand={() => setIsCollapsed(false)}
        className="p-4"
      >
        <div className={`h-full transition-all ${isCollapsed ? 'w-12' : 'w-full'}`}>
          <NaturalLanguageQuery query={query} setQuery={setQuery} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60} minSize={40} maxSize={70}>
        <div className="h-full">
          <PipelineUI
            workflow={workflow}
            updateWorkflow={updateWorkflowFromDiagram}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )

  return (
    <WorkflowLayout>
      <div className="flex h-full bg-background">
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </WorkflowLayout>
  )
}
import { FileText } from 'lucide-react'
import { BaseNode } from './base-node'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Position } from 'reactflow'

export const GenerateFileNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Generate File"
      description="Create a new file by writing input text and specifying file type. It returns a download link to the file. Supports pdf, docx, txt, csv filetypes"
      variant="file"
      data={{
        ...data,
        icon: <FileText className="h-4 w-4" />,
        subtitle: "File Operations",
      }}
      inputs={[
        { id: 'fileName', label: 'File Name', style: { top: '-12px', left: '33%', transform: 'translateX(-50%)' } },
        { id: 'fileContents', label: 'File Contents', style: { top: '-12px', left: '67%', transform: 'translateX(-50%)' } }
      ]}
      outputs={[
        { id: 'generatedFile', label: 'Generated File', style: { bottom: '-12px', left: '50%', transform: 'translateX(-50%)' } }
      ]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-name">File Name</Label>
          <Input
            id="file-name"
            value={data.fileName || ''}
            onChange={(e) => data.updateField('fileName', e.target.value)}
            placeholder="Enter file name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="file-type">File Type</Label>
          <Select
            value={data.fileType || 'pdf'}
            onValueChange={(value) => data.updateField('fileType', value)}
          >
            <SelectTrigger id="file-type">
              <SelectValue placeholder="Select file type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="docx">DOCX</SelectItem>
              <SelectItem value="txt">TXT</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BaseNode>
  )
}


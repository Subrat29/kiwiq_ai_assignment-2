import { ClipboardList, ListTree, FileText, Bot, StickyNote, ArrowDownToLine, ArrowUpToLine   } from 'lucide-react'

export const nodeStyles = {
  typeform: {
    background: 'bg-purple-50',
    border: 'border-purple-200',
    icon: <ClipboardList className="h-4 w-4 text-purple-500" />,
    handle: {
      border: '#C084FC',
      background: 'white'
    }
  },
  list: {
    background: 'bg-orange-50',
    border: 'border-orange-200',
    icon: <ListTree className="h-4 w-4 text-orange-500" />,
    handle: {
      border: '#FB923C',
      background: 'white'
    }
  },
  ai: {
    background: 'bg-pink-50',
    border: 'border-pink-200',
    icon: <Bot className="h-4 w-4 text-pink-500" />,
    handle: {
      border: '#EC4899',
      background: 'white'
    }
  },
  file: {
    background: 'bg-blue-50',
    border: 'border-blue-200',
    icon: <FileText className="h-4 w-4 text-blue-500" />,
    handle: {
      border: '#60A5FA',
      background: 'white'
    }
  },
  notes: {
    background: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: <StickyNote className="h-4 w-4 text-yellow-500" />,
    handle: {
      border: '#FCD34D',
      background: 'white'
    }
  },
  input: {
    background: 'bg-green-50',
    border: 'border-green-200',
    icon: <ArrowDownToLine className="h-4 w-4 text-green-500" />,
    handle: {
      border: '#4ADE80',
      background: 'white'
    }
  },
  output: {
    background: 'bg-red-50',
    border: 'border-red-200',
    icon: <ArrowUpToLine className="h-4 w-4 text-red-500" />,
    handle: {
      border: '#F87171',
      background: 'white'
    }
  }
}

export const HANDLE_STYLES = {
  width: '12px',
  height: '12px',
  background: 'white',
  border: '2px solid',
  borderRadius: '50%',
  zIndex: 5,
}

export const NODE_WIDTH = 320


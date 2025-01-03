# Project Documentation

## Overview
This is a React-based web application that provides workflow building and report generation capabilities. The application uses modern React patterns, Redux for state management, and a component-based architecture.

## Tech Stack
- **Frontend Framework**: React 18
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Shadcn/ui
- **Build Tool**: Vite
- **Flow Visualization**: React Flow
- **Charts**: Recharts

## Project Structure
```
src/
├── App.jsx              # Main application component
├── components/          # Reusable components
│   ├── ReportGenerator/ # Report generation components
│   ├── WorkflowBuilder/ # Workflow builder components
│   └── ui/             # Shared UI components
├── config/             # Configuration files
├── hooks/              # Custom React hooks
├── lib/               # Utility functions
├── nlp/               # Natural language processing
├── pages/             # Page components
└── redux/             # Redux state management
```

## Key Features

### 1. Workflow Builder
- Visual workflow creation using drag-and-drop nodes
- Natural language query processing
- Multiple node types with specific functionalities:
  - Input/Output nodes
  - Channel nodes
  - Segment nodes
  - Metric nodes
  - Analysis nodes
  - Notes nodes

### 2. Report Generator
- Dynamic report creation with drag-and-drop components
- Support for various content types:
  - Text (Headings, Subheadings, Paragraphs)
  - Charts (Bar, Line, Pie)
- Live preview mode
- Mobile-responsive design

## Component Documentation

### WorkflowBuilder Components

#### `WorkflowLayout`
The main layout component for the workflow builder interface.
- Manages workspace tabs
- Handles sidebar visibility
- Provides workflow actions (save, share, preview)

#### `PipelineUI`
Handles the visual workflow canvas using React Flow.
- Node drag-and-drop
- Edge connections
- Node positioning

### ReportGenerator Components

#### `DraggableElement`
Represents a draggable report element.
- Supports text and chart elements
- Handles content editing
- Manages element positioning

#### `ChartComponent`
Renders different chart types using Recharts.
- Supports Bar, Line, and Pie charts
- Handles data updates
- Responsive design

## State Management

### Redux Store Structure
```javascript
{
  flow: {
    nodes: [],        // Workflow nodes
    edges: [],        // Connections between nodes
    nodeIDs: {},      // Track node IDs
    workflowName: ""  // Current workflow name
  }
}
```

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Configuration

### Vite Configuration
The project uses Vite with aliases configured in `vite.config.js`:
```javascript
{
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
}
```

### Tailwind Configuration
Tailwind is configured with custom theme settings in `tailwind.config.js`, including:
- Custom colors
- Border radius
- Animations
- Dark mode support

## Deployment
The project includes a `vercel.json` configuration for deployment on Vercel:
```json
{
  "rewrites": [
    {"source": "/(.*)", "destination": "/"}
  ]
}
```

## Development Guidelines

### Code Style
- ESLint configuration for React
- Modern JavaScript features (ES6+)
- Component-based architecture
- Consistent naming conventions

### Best Practices
- Use functional components with hooks
- Implement proper error handling
- Follow React performance optimization patterns
- Maintain component reusability
- Document complex logic

## License
This project is proprietary and confidential.
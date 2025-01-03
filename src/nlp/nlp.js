export function processNaturalLanguage(query) {
  const lowercaseQuery = query.toLowerCase()
  const nodes = []
  const edges = []

  // Add LinkedIn node
  nodes.push({
    id: 'linkedin',
    type: 'channel',
    position: { x: 0, y: 100 },
    data: { label: 'LinkedIn' }
  })

  // Check for segment
  let segmentNode
  if (lowercaseQuery.includes('enterprise')) {
    segmentNode = {
      id: 'segment',
      type: 'segment',
      position: { x: 250, y: 100 },
      data: { label: 'Enterprise Segment', segment: 'enterprise' }
    }
  } else if (lowercaseQuery.includes('mid-market')) {
    segmentNode = {
      id: 'segment',
      type: 'segment',
      position: { x: 250, y: 100 },
      data: { label: 'Mid-market Segment', segment: 'mid-market' }
    }
  }

  if (segmentNode) {
    nodes.push(segmentNode)
    edges.push({ id: 'e1', source: 'linkedin', target: 'segment' })
  }

  // Check for metrics
  const metricNode = {
    id: 'metric',
    type: 'metric',
    position: { x: 500, y: 100 },
    data: { label: 'Performance Metrics' }
  }
  nodes.push(metricNode)
  edges.push({ id: 'e2', source: segmentNode ? 'segment' : 'linkedin', target: 'metric' })

  // Add analysis node
  const analysisNode = {
    id: 'analysis',
    type: 'analysis',
    position: { x: 750, y: 100 },
    data: { label: 'Performance Analysis' }
  }
  nodes.push(analysisNode)
  edges.push({ id: 'e3', source: 'metric', target: 'analysis' })

  return { nodes, edges }
}
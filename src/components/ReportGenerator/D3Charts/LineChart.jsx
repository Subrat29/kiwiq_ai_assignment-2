import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, 400]);
    const yScale = d3.scaleLinear().domain([0, Math.max(...data)]).range([200, 0]);

    const line = d3.line()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d));

    svg
      .attr('width', 400)
      .attr('height', 200)
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default LineChart;
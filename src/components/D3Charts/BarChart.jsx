import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    svg
      .attr('width', 400)
      .attr('height', 200)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 50)
      .attr('y', (d) => 200 - d * 10)
      .attr('width', 40)
      .attr('height', (d) => d * 10)
      .attr('fill', 'steelblue');
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default BarChart;
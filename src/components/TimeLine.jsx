import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TimeLineChart = () => {
  const chartRef = useRef(null);

  const data = d3.range(0, 360).map((d) => {
    return {
      day: d + 1,
      // value: Math.floor(Math.random() * 10),
      value:1,
    };
  });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const svg = d3.select(chartRef.current);

    const width = svg.attr('width');
    const height = svg.attr('height');

    const margin = { top: 10, right: 20, bottom: 20, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3.scaleBand().domain(data.map((d) => d.day)).range([0, innerWidth]).padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([innerHeight, 0]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickValues(d3.range(30, 361, 30)).tickFormat((d) => months[Math.floor((d - 1) / 30)]));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(2, '%'))
      .append('text')
     

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr("fill", "blue")
      .attr('x', (d) => x(d.day))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => innerHeight - y(d.value));
  }, []);

  return (
    <div className='timeline'>
    <svg ref={chartRef} width={1500} height={70}>
      <g />
    </svg>
    </div>
  );
};

export default TimeLineChart;



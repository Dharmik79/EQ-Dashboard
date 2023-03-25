import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import crossfilter from "crossfilter2";

const TimeLineChart = () => {
  const chartRef = useRef(null);

  const data = [];
  let sDate = new Date(2022, 0, 1);
  const eDate = new Date(2022, 11, 31);

  while (sDate <= eDate) {
    data.push({ day: new Date(sDate), value: 1 });
    sDate.setDate(sDate.getDate() + 1);
  }


  useEffect(() => {
    if (data) {
      const chartData = crossfilter(data);

      const dimension = chartData.dimension((d) => d.day);
      const group = dimension.group().reduceSum((d) => d.value);

      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = chartRef.current.clientWidth - margin.left - margin.right;
      const height = chartRef.current.clientHeight - margin.top - margin.bottom;

      const x = d3.scaleTime().range([0, width]);
      // const y = d3.scaleLinear().range([height, 0]);

      const xAxis = d3.axisBottom(x);
      // const yAxis = d3.axisLeft(y);

      const area = d3
        .area()
        .x((d) => x(d.key))
        .y0(height)
        // .y1((d) => y(d.value));

      const brush = d3
        .brushX()
        .extent([
          [0, 0],
          [width, height],
        ])
        .on("end", brushed);

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

        x.domain(d3.extent(data, (d) => d.date));
        // y.domain([0, d3.max(group.all(), (d) => d.value)]);

        svg.append("path").datum(group.all()).attr("class", "area").attr("d", area).attr("fill","gray")

        svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

   // svg.append("g").attr("class", "y axis").call(yAxis);

   svg.append("g").attr("class", "brush").call(brush)
      .attr("fill","gray")

      function brushed() {
        const selection = d3.selection;
        const filteredData = selection
          ? data.filter((d) => x(d.day) >= selection[0] && x(d.day) <= selection[1])
          : data;

          dimension.filterRange([
            selection ? x.invert(selection[0]) : null,
            selection ? x.invert(selection[1]) : null,
          ]);
  
          svg.select(".area").attr("d", area(group.all())).attr("fill","blue")
          svg.select(".x.axis").call(xAxis);

          console.log(filteredData);
        }
      }
    }, [data]);

  return (
    <div className='timeline'>
    {/* <svg ref={chartRef} width={1500} height={70}>
      <g />
    </svg> */}
    </div>
  );
};

export default TimeLineChart;



import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./TimeLine.css";

const GetSelectedYear=({yearSelected})=>{
  return (
    <select id="year" name="year">
      <option value="">Select Year</option>
      {['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'].map((year) => (
        <option key={year} value={year} selected={year === yearSelected}>
          {year}
        </option>
      ))}
    </select>
  );
}
const TimeLineChart = ({ startDate, endDate, setStartDate, setEndDate ,year,setYear}) => {
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
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = chartRef.current.clientWidth - margin.left - margin.right;
      const height = chartRef.current.clientHeight - margin.top - margin.bottom;
      const x = d3
        .scaleTime()
        .domain([new Date(2022, 0, 1), new Date(2022, 11, 31)])
        .range([0, width]);

      const xAxis = d3
        .axisBottom(x)
        .tickFormat(d3.timeFormat("%b"))
        .tickValues(
          d3.timeMonth.range(new Date(2022, 0, 1), new Date(2022, 11, 31), 1)
        )
        .tickSize(10)
        .tickPadding(5);

      const brush = d3
        .brushX()
        .extent([
          [0, 0],
          [width, height],
        ])
        .on("end", brushed);
      d3.select(chartRef.current)
        .selectAll("*")
        .remove();
      const svg = d3
        .select(chartRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "gray");

      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

      svg
        .append("g")
        .attr("class", "brush")
        .call(brush)
        .call(
          brush.move,
          startDate && endDate
            ? [x(new Date(startDate)), x(new Date(endDate))]
            : null
        );

      function brushed() {
        const selection = d3.event.selection;
        const selectedStartDate = selection ? x.invert(selection[0]) : null;
        const selectedEndDate = selection ? x.invert(selection[1]) : null;

        if (selectedStartDate && selectedEndDate) {
          setStartDate(selectedStartDate.toISOString().split("T")[0]);
          setEndDate(selectedEndDate.toISOString().split("T")[0]);
        } else {
          setStartDate(null);
          setEndDate(null);
        }

        svg.selectAll(".selection").attr("fill", selection ? "blue" : "gray");
      }
    }
  }, [data, startDate, endDate]);
  return (
    <div className="timeline">
      <div className="filter">
        <label className="year-filter">Filter:</label>
        <GetSelectedYear yearSelected={year}/>
      </div>
      <svg ref={chartRef} width="90%" height={70}></svg>
    </div>
  );
};

export default TimeLineChart;

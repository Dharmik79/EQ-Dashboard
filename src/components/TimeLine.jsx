import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./TimeLine.css";

function changeYear(date, newYear) {
  const dateParts = date.split("-");
  const day = dateParts[2];
  const month = dateParts[1];
  return `${newYear}-${month}-${day}`;
}
const GetSelectedYear = ({
  yearSelected,
  setYear,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}) => {
  const onChange = (event) => {
    let year = event.target.value;
    let newStartDate = changeYear(startDate, year);
    let newEndDate = changeYear(endDate, year);
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    setYear(year);
  };
  return (
    <select id="year" name="year" onChange={onChange}>
      <option value="">Select Year</option>
      {[
        "2022",
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2014",
        "2013",
        "2012",
        "2011",
        "2010",
        "2009",
        "2008",
        "2007",
        "2006",
        "2005",
        "2004",
        "2003",
        "2002",
        "2001",
        "2000",
      ].map((year) => (
        <option key={year} value={year} selected={year === yearSelected}>
          {year}
        </option>
      ))}
    </select>
  );
};
const TimeLineChart = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  year,
  setYear,
}) => {
  const chartRef = useRef(null);

  const data = [];

  let sDate = new Date(year, 0, 1);
  const eDate = new Date(year, 11, 31);

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
        .domain([new Date(year, 0, 1), new Date(year, 11, 31)])
        .range([0, width]);

      const xAxis = d3
        .axisBottom(x)
        .tickFormat(d3.timeFormat("%b"))
        .tickValues(
          d3.timeMonth.range(new Date(year, 0, 1), new Date(year, 11, 31), 1)
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
      d3.select(chartRef.current).selectAll("*").remove();
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
          // setStartDate(null);
          // setEndDate(null);
        }

        svg.selectAll(".selection").attr("fill", selection ? "blue" : "gray");
      }
    }
  }, [data, startDate, endDate, year]);
  return (
    <div className="timeline">
      <div className="filter">
        <label className="year-filter">Filter:</label>
        <GetSelectedYear
          yearSelected={year}
          setYear={setYear}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
      <svg ref={chartRef} width="90%" height={70}></svg>
    </div>
  );
};

export default TimeLineChart;

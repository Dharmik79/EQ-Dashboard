import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./TimeLine.css";
const TimeLineChart = ({ startDate, endDate, setStartDate, setEndDate }) => {
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

      const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

      const brush = d3
        .brushX()
        .extent([
          [0, 0],
          [width, height],
        ])
        .on("brush", () => {
          const selection = d3.event.selection;

          if (!selection) return;

          let [startX, endX] = selection;

          if (
            endX - startX >
            x(new Date(oneMonthInMilliseconds)) - x(new Date(0))
          ) {
            endX =
              startX + (x(new Date(oneMonthInMilliseconds)) - x(new Date(0)));
            if (endX > width) {
              endX = width;
              startX =
                endX - (x(new Date(oneMonthInMilliseconds)) - x(new Date(0)));
            }
            d3.select(".brush").call(brush.move, [startX, endX]);
          }
        })
        .on("end", () => {
          const selection = d3.event.selection;

          if (!selection) {
            setStartDate(null);
            setEndDate(null);
            return;
          }

          const [startX, endX] = selection;
          const selectedStartDate = x.invert(startX);
          const selectedEndDate = x.invert(endX);

          setStartDate(selectedStartDate.toISOString().split("T")[0]);
          setEndDate(selectedEndDate.toISOString().split("T")[0]);
        });
      d3.select(chartRef.current)
        .selectAll("*")
        .remove();
      const svg = d3
        .select(chartRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

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
    }
  }, [data, startDate, endDate]);

  return (
    <div className="timeline">
      <svg ref={chartRef} width={1500} height={70}></svg>
    </div>
  );
};

export default TimeLineChart;

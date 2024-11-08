/* eslint-disable react/prop-types */
import { useRef, useMemo, useEffect } from 'react';

import * as d3 from 'd3';

const BarChart = ({ specs, data }) => {
  console.log('specs', specs)
  console.log('data', data)

  const width = specs.size.width;
  const height = specs.size.height;
  const marginTop = specs.margin.top;
  const marginRight = specs.margin.right
  const marginBottom = specs.margin.bottom;
  const marginLeft = specs.margin.left;

  const axesRefs = useRef(null);

  const boundWidth = width - marginLeft - marginRight;
  const boundHeight = height - marginTop - marginBottom;

  // get domain and range fromm data
  const xScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, 10])
      .range([0, boundWidth])
  }, [width, boundWidth]);

  const yScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, 10])
      .range([boundHeight, 0])
  }, [height, boundHeight]);

  useEffect(() => {
    const svgEl = d3.select(axesRefs.current);
    svgEl.selectAll('*').remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    const yAxisGenerator = d3.axisLeft(yScale);

    svgEl
      .append('g')
      .attr('transform', `translate(0, ${boundHeight})`)
      .call(xAxisGenerator)

    svgEl
      .append('g')
      .call(yAxisGenerator);
  }, [xScale, yScale, boundHeight])
  

  return (
    <div>
      <svg
        width={width}
        height={height}
        style={{display: 'inline-block'}}
      >
        <g
          width={boundWidth}
          height={boundHeight}
          ref={axesRefs}
          transform={`translate(${marginLeft}, ${marginTop})`}
        />
      </svg>
    </div>
  )

}
export default BarChart;
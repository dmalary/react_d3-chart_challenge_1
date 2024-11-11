/* eslint-disable react/prop-types */
import { useRef, useMemo, useEffect } from 'react';

import * as d3 from 'd3';

const BarChart = ({ specs, data }) => {
  // console.log('specs', specs)
  console.log('data', data)

  const width = specs.size.width;
  const height = specs.size.height;
  const marginTop = specs.margin.top;
  const marginRight = specs.margin.right
  const marginBottom = specs.margin.bottom;
  const marginLeft = specs.margin.left;
  
  const boundWidth = width - marginLeft - marginRight;
  const boundHeight = height - marginTop - marginBottom;
  
  const axesRefs = useRef(null);

  const fxScale = useMemo(() => {
    return d3.scaleBand()
      .domain([... new Set(data.map(d => d.appearances))])
      .range([width - marginRight, marginLeft])
      .paddingInner(.1)
  }, [data, width, marginLeft, marginRight]);

  const category = new Set(data.map(d => d.key));
  console.log('category', category);

  const xScale = useMemo(() => {
    return d3.scaleBand()
      .domain(category)
      .range([0, fxScale.bandwidth()])
      .padding(.05)
  }, [category, fxScale]);

  const yScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, d3.max(data, d => d.win_loss_totals)]).nice()
      .range([boundHeight, 0])
  }, [data, boundHeight]);

  const colorScale = useMemo(() => {
    return d3.scaleOrdinal()
      .domain(category)
      .range(["#FC766AFF", '#5B84B1FF'])
      .unknown('#fff')
  }, [category]);

  useEffect(() => {
    const svgEl = d3.select(axesRefs.current);
    svgEl.selectAll('*').remove();

    const xAxisGenerator = d3.axisBottom(fxScale);
    const yAxisGenerator = d3.axisLeft(yScale);

    svgEl
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${boundHeight})`)
      .call(xAxisGenerator)

    svgEl
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxisGenerator);
  }, [fxScale, yScale, boundHeight])
  
  const groupRects = Array.from(d3.group(data, d => d.appearances));
  // console.log('groupRects', groupRects);

  const renderRects = groupRects.map(([apps, datum], i) => {
    console.log('apps', apps)
    console.log('datum', datum)
    return (
      <g key={i} transform={(`translate(${fxScale(apps)}, 0)`)}>
        {datum.map((el, n) => (
          <rect 
            key={n}
            x={xScale(el.key)}
            y={yScale(el.win_loss_totals)}
            width={xScale.bandwidth()}
            height={boundHeight - yScale(el.win_loss_totals)}
            fill={colorScale(el.key)}
          />
        ))}
      </g>
    )
  });

  return (
    <div>
      <svg
        width={width}
        height={height}
        style={{display: 'inline-block'}}
      >
        {renderRects}
        <g
          className={'axis-group'}
          ref={axesRefs}
          transform={`translate(${marginLeft}, ${marginTop})`}
        />
      </svg>
    </div>
  )

}
export default BarChart;
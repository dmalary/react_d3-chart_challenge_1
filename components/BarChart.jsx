/* eslint-disable react/prop-types */
import { useRef, useMemo, useEffect, /*useState*/ } from 'react';

// import Tooltip from '../components/Tooltip'

import * as d3 from 'd3';

const BarChart = ({ specs, data }) => {
  // console.log('specs', specs)
  // console.log('data', data)
  // const [hovered, setHovered] = useState(null);

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

  const category = useMemo(() => (new Set(data.map(d => d.key))), [data])
  // console.log('category', category);

  const xScale = useMemo(() => {
    return d3.scaleBand()
      .domain(category)
      .range([0, fxScale.bandwidth()])
      .padding(.03)
  }, [category, fxScale]);

  const yScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, d3.max(data, d => d.win_loss_totals)]).nice()
      .range([boundHeight, 0])
  }, [data, boundHeight]);

  const colorScale = useMemo(() => {
    return d3.scaleOrdinal()
      .domain(category)
      .range(["#00539CFF", '#EEA47FFF'])
      .unknown('#fff')
  }, [category]);

  useEffect(() => {
    const svgEl = d3.select(axesRefs.current);
    svgEl.selectAll('*').remove();

    const xAxisGenerator = d3.axisBottom(fxScale).tickSizeOuter(0);
    const yAxisGenerator = d3.axisLeft(yScale);

    // X AXIS
    svgEl
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${boundHeight})`)
      .call(xAxisGenerator);
    // X AXIS LABEL
    svgEl
      .append('text')
      .attr('class', 'x-axis-label')
      .attr("font-size", 12)
      .attr("text-anchor", "end")
      .attr("x", boundWidth)
      .attr("y", boundHeight + 35)
      .text("Superbowl Appearances");

    // Y AXIS
    svgEl
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${marginLeft}, 0)`)
      .call(yAxisGenerator)
      .call(g => g.selectAll('.domain').remove());
    // Y AXIS LABEL
    svgEl
      .append('text')
      .attr('class', 'y-axis-label')
      .attr("font-size", 12)
      .attr("text-anchor", "end")
      .attr("x", 100)
      .attr("y", 0)
      .text("Win/Loss count")
      // .attr("transform", "rotate(-90)");

  }, [marginLeft, fxScale, yScale, boundWidth, boundHeight])
  
  const groupRects = Array.from(d3.group(data, d => d.appearances));
  // console.log('groupRects', groupRects);

  const renderRects = groupRects.map(([apps, datum], i) => {
    // console.log('apps', apps)
    // console.log('datum', datum)
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
            // onMouseEnter={() => {
            //   setHovered({
            //     xPos: fxScale(apps) + xScale(el.key) + marginLeft,
            //     yPos: yScale(el.win_loss_totals) + marginTop,
            //     teams: el.teams,
            //   })
            // }}
            // onMouseLeave={() => setHovered(null)}
          />
        ))}
      </g>
    )
  });

  return (
    <>
      <svg
        width={width + 2 * (marginLeft + marginRight)}
        height={height + 2 * (marginTop + marginBottom)}
        style={{display: 'inline-block'}}
      >
        <g
          className={'chart-group'}
          transform={`translate(${marginLeft}, ${marginTop})`}
        >
        {renderRects}
        </g>
        <g
          className={'axis-group'}
          ref={axesRefs}
          transform={`translate(${marginLeft}, ${marginTop})`}
        />
      </svg>
      {/* {hovered && 
      <div
          style={{
            position: "absolute",
            top: hovered.yPos,
            left: hovered.xPos + 15,
            pointerEvents: "none",
          }}
        >
          <Tooltip tipData={hovered} />
        </div>
      } */}
      </>
  )

}
export default BarChart;
/* eslint-disable react/prop-types */

import * as d3 from 'd3';

const specs = {
  size: {
    width: 800,
    height: 600,
  },
  margin: {
    top: 10,
    right: 10,
    bottom: 20,
    left: 40,
  },
}

const BarChart = ({ data }) => {
  console.log('width', specs.size.width)
  console.log('height', specs.size.height)
  console.log('data', data)

  return (
    <div>sim sim salabim</div>
  )

}
export default BarChart;
import './App.css'

import data from '../data/data.json'

import BarChart from "../components/BarChart";

function App() {

  const specs = {
    size: {
      width: 900,
      height: 600,
    },
    margin: {
      top: 10,
      right: 20,
      bottom: 20,
      left: 10,
    },
  }

  return (
    <>
      <div className='annotation-layer'>
        <h1>Super bowl wins and losses</h1>
        <h4><i>30 day chart challenge, day 1: part to a whole</i></h4>
        <p>This chart is a rebuild of my <a href='https://observablehq.com/d/e571332b6fd9cbd0'>Observable render</a>.</p>
        <p>Using ProFootballNetwork data for <a href="https://www.profootballnetwork.com/list-of-super-bowl-appearances-by-team/">Super Bowl Appearances by Team</a>, and <a href='https://www.profootballnetwork.com/super-bowl-winners-by-team/'>Most Super Bowl Wins by Team</a>, I drew a grouped bar chart to look at SuperBowl wins and losses (grouped by number of cumulative appearances).</p>
      </div>
      <BarChart specs={specs} data={data}/>
    </>
  )
}

export default App

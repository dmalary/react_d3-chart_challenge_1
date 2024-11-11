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
      left: 20,
    },
  }

  return (
    <>
      <BarChart specs={specs} data={data}/>
    </>
  )
}

export default App

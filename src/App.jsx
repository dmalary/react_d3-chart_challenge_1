import './App.css'

import data from '../data/data.json'

import BarChart from "../components/BarChart";

function App() {

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

  return (
    <>
      <BarChart specs={specs} data={data}/>
    </>
  )
}

export default App

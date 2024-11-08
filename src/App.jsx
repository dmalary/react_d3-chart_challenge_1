import './App.css'

import data from '../data/data.json'

import BarChart from "../components/BarChart";

function App() {

  return (
    <>
      <BarChart data={data}/>
    </>
  )
}

export default App

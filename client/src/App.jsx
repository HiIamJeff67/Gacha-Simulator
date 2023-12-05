import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Contact from './Components/Contact/Contact'
//import HomePage from './Pages/HomePage'
import SimulatorFor1999 from './Pages/SimulatorFor1999'
import SimulatorForGenshi from './Pages/SimulatorForGenshi'

const App = () => {
  return (
    <Routes>
        <Route index element={  // Home Page
           <Contact/>
        }/>
        <Route path='/SimulatorFor1999' element={
          <SimulatorFor1999/>
        }/>
        <Route path='/SimulatorForGenshi' element={
          <SimulatorForGenshi/>
        }/>
    </Routes>
  )
}

export default App
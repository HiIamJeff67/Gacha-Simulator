import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

const App = () => {
  return (
    <Routes>
        <Route index element={
            <div>TEST</div>
        }/>
    </Routes>
  )
}

export default App
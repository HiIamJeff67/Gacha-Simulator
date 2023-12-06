import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Layout from './Layout.jsx'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import SimulatorFor1999 from './Pages/SimulatorFor1999'
import SimulatorForGenshin from './Pages/SimulatorForGenshin.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path={'/SimulatorFor1999'} element={<SimulatorFor1999/>}/>
        <Route path={'/SimulatorForGenshin'} element={<SimulatorForGenshin/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/register'} element={<RegisterPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
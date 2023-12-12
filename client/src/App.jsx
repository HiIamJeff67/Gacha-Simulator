import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Layout from './Layout.jsx'
import HomePage from './Pages/HomePage/HomePage.jsx'
import LoginPage from './Pages/LoginPage/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage/RegisterPage.jsx'
import SimulatorFor1999 from './Pages/SimulatorFor1999/SimulatorFor1999.jsx'
import SimulatorForGenshin from './Pages/SimulatorForGenshin/SimulatorForGenshin.jsx'

const App = () => {
  const [rerenderLoginState, setRerenderLoginState] = useState(1);

  return (
    <Routes>
      <Route path='/' element={<Layout rerenderLoginState={rerenderLoginState}/>}>
        <Route index element={<HomePage/>}/>
        <Route path={'/SimulatorFor1999'} element={<SimulatorFor1999/>}/>
        <Route path={'/SimulatorForGenshin'} element={<SimulatorForGenshin/>}/>
        <Route path={'/login'} element={<LoginPage setRerenderLoginState={setRerenderLoginState}/>}/>
        <Route path={'/register'} element={<RegisterPage setRerenderLoginState={setRerenderLoginState}/>}/>
      </Route>
    </Routes>
  )
}

export default App
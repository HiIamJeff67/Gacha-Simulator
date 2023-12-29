import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext.js'
import './App.css'

import Layout from './Layout.jsx'
import HomePage from './Pages/HomePage/HomePage.jsx'
import LoginPage from './Pages/LoginPage/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage/RegisterPage.jsx'
import SimulatorFor1999 from './Pages/SimulatorFor1999/SimulatorFor1999.jsx'
import GachaDetails1999 from './Pages/SimulatorFor1999/GachaDetails1999.jsx';
import SingleGachaDisplay1999 from './Pages/SimulatorFor1999/GachaingDisplay1999/SingleGachaDisplay1999.jsx';
import MultiGachaDisplay1999 from './Pages/SimulatorFor1999/GachaingDisplay1999/MultiGachaDisplay1999.jsx';
import SimulatorForGenshin from './Pages/SimulatorForGenshin/SimulatorForGenshin.jsx'
import GachaDetailsGenshin from './Pages/SimulatorForGenshin/GachaDetailsGenshin.jsx';
import SingleGachaDisplayGenshin from './Pages/SimulatorForGenshin/GachaingDisplayGenshin/SingleGachaDisplayGenshin.jsx';
import MultiGachaDisplayGenshin from './Pages/SimulatorForGenshin/GachaingDisplayGenshin/MultiGachaDisplayGenshin.jsx';

const App = () => {
  const {currentUser} = useContext(AuthContext);

  console.log(currentUser);
  
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path={'/SimulatorFor1999'} element={<SimulatorFor1999/>}/>
        <Route path={'/SimulatorForGenshin'} element={<SimulatorForGenshin/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/register'} element={<RegisterPage/>}/>

        <Route path={'/GachaDetails1999/:poolIndex'} element={<GachaDetails1999/>}/>
        <Route path={'/SingleGachaDisplay1999/:poolIndex'} element={<SingleGachaDisplay1999/>}/>
        <Route path={'/MultiGachaDisplay1999/:poolIndex'} element={<MultiGachaDisplay1999/>}/>

        <Route path={'/GachaDetailsGenshin'} element={<GachaDetailsGenshin/>}/>
        <Route path={'/SingleGachaDisplayGenshin'} element={<SingleGachaDisplayGenshin/>}/>
        <Route path={'/MultiGachaDisplayGenshin'} element={<MultiGachaDisplayGenshin/>}/>
      </Route>
    </Routes>
  )
}

export default App
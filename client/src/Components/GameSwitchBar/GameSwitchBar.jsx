import { useState } from 'react'
import { Link } from 'react-router-dom'
import './GameSwitchBar.css'

import HomeIcon from '../../Images/HomeIcon.png'
import ReverseIcon from '../../Images/ReverseIcon.png'
import GenshinIcon from '../../Images/GenshinIcon.png'

const GameSwitchBar = () => {
  const [activeItem, setActiveItem] = useState("#");

  return (
    <footer>
        <Link to={'/'} 
          className={`sw-bar-link ${activeItem === "#" ? "active": ""}`}
          onClick={() => setActiveItem("#")}>
            <img src={HomeIcon} width="50px" className='Home-icon'/>
        </Link>
        <Link to={'/SimulatorFor1999'}
          className={`sw-bar-link ${activeItem === "#sim-1" ? "active" : ""}`}
          onClick={() => setActiveItem("#sim-1")}>
            <img src={ReverseIcon} width="50px" className='Reverse-icon'/>
        </Link>
        <Link to={'/SimulatorForGenshin'} 
          className={`sw-bar-link ${activeItem === "#sim-2" ? "active" : ""}`} 
          onClick={() => setActiveItem("#sim-2")}>
            <img src={GenshinIcon} width="50px" className='Genshin-icon'/>
        </Link>
    </footer>
  )
}

export default GameSwitchBar
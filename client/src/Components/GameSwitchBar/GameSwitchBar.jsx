import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './GameSwitchBar.css'

import HomeIcon from '../../Images/HomeIcon.png'
import ReverseIcon from '../../Images/ReverseIcon.png'
import GenshinIcon from '../../Images/GenshinIcon.png'

const GameSwitchBar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("#");

  useEffect(() => {
    let dir = location.pathname.slice(1).toLowerCase();
    setActiveItem(`#${dir}`);
    // console.log(activeItem);
  }, [location]);

  const checkActiveItemString = function(activeItemString) {
    activeItemString = activeItemString.toLowerCase();
    if (activeItem === "#login" || activeItem === "#register") return true;
    const detectWord = "gachadisplay";
    let i = 0;
    for (const letter of activeItemString) {
      if (letter == detectWord[i]) i++;
      if (i == detectWord.length - 1) return true;
    }
    return false;
  }

  return (
    <footer className={checkActiveItemString(activeItem) ? "hide" : ""}>
        <Link to={'/'}
          className={`sw-bar-link ${(activeItem === "#") ? "active": ""}`}
          onClick={() => setActiveItem("#")}>
            <img src={HomeIcon} width="50px" className='Home-icon'/>
        </Link>
        <Link to={'/SimulatorFor1999'}
          className={`sw-bar-link ${((activeItem === "#simulatorfor1999") || (activeItem === "#gachadetails1999")) ? "active" : ""}`}
          onClick={() => setActiveItem("#simulatorfor1999")}>
            <img src={ReverseIcon} width="50px" className='Reverse-icon'/>
        </Link>
        <Link to={'/SimulatorForGenshin'} 
          className={`sw-bar-link ${((activeItem === "#simulatorforgenshin") || (activeItem === "#gachadetailsgenshin")) ? "active" : ""}`} 
          onClick={() => setActiveItem("#simulatorforgenshin")}>
            <img src={GenshinIcon} width="50px" className='Genshin-icon'/>
        </Link>
    </footer>
  )
}

export default GameSwitchBar
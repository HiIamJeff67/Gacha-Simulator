import { Link } from 'react-router-dom'
import './GameSwitchBar.css'

import HomeIcon from '../../Images/HomeIcon.png'
import ReverseIcon from '../../Images/ReverseIcon.png'
import GenshinIcon from '../../Images/GenshinIcon.png'

const GameSwitchBar = () => {
  return (
    <footer>
        <Link to={'/'} className='sw-bar-link'>
            <img src={HomeIcon} width="50px" className='Home-icon'/>
        </Link>
        <Link to={'/SimulatorFor1999'} className='sw-bar-link'>
            <img src={ReverseIcon} width="50px" className='Reverse-icon'/>
        </Link>
        <Link to={'/SimulatorForGenshin'} className='sw-bar-link'>
            <img src={GenshinIcon} width="50px" className='Genshin-icon'/>
        </Link>
    </footer>
  )
}

export default GameSwitchBar
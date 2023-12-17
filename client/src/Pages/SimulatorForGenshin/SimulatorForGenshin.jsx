import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import intertwinedFate from '../../Images/intertwinedFate.webp';
import './SimulatorForGenshin.css';

const SimulatorForGenshin = () => {
  return (
    <div className='simulator-container-genshin'>
      <div className='summon-pool-selector-container'>
        <select className='summon-pool-selector'>
          <option value={'item-1'}>item-1</option>
          <option value={'item-2'}>item-2</option>
          <option value={'item-3'}>item-3</option>
        </select>
        <IoIosArrowDown className='select-arrow'/>
      </div>
      <Link to={'/GachaDetailsGenshin'} className='details-genshin'>Details</Link>
      <div className='draw-container'>
        <Link to={'/SingleGachaDisplayGenshin'} className='single-draw-genshin'>
          Wish x1
          <div className='single-draw-icon'><img src={intertwinedFate} width={'25px'}/></div>
        </Link>
        <Link to={'/MultiGachaDisplayGenshin'} className='ten-draw-genshin'>
          Wish x10
          <div className='ten-draw-icon'><img src={intertwinedFate} width={'25px'}/></div>
        </Link>
      </div>
    </div>
  )
}

export default SimulatorForGenshin
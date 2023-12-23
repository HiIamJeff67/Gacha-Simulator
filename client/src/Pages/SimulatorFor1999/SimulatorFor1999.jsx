import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import UnilogImg from '../../Images/unilog.png';
import './SimulatorFor1999.css';

const SimulatorFor1999 = () => {
  const simulatorContainerStyle = {
    background: "" || "green",
  };

  return (
    <div className='simulator-container-1999' style={simulatorContainerStyle}>
      <div className='summon-pool-selector-container'>
        <select className='summon-pool-selector'>
          <option value={'item-1'}>item-1</option>
          <option value={'item-2'}>item-2</option>
          <option value={'item-3'}>item-3</option>
        </select>
        <IoIosArrowDown className='select-arrow'/>
      </div>
      <Link to={'/GachaDetails1999'} className='details-1999'>Details</Link>
      <div className='draw-container'>
        <Link to={'/SingleGachaDisplay1999'} className='single-draw-1999'>
          <div className='single-draw-icon'><img src={UnilogImg} width={'35px'} alt='unilog'/></div>
          Summon x1
        </Link>
        <Link to={'/MultiGachaDisplay1999'} className='ten-draw-1999'>
          <div className='ten-draw-icon'><img src={UnilogImg} width={'35px'} alt='unilog'/></div>
          Summon x10
        </Link>
      </div>
    </div>
  )
}

export default SimulatorFor1999
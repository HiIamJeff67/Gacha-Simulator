import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext.js';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { IoIosArrowDown } from 'react-icons/io';
import UnilogImg from '../../Images/unilog.png';
import './SimulatorFor1999.css';
import InitialBgImg from '../../Images/InitialBgImg1999.jpg';

const SimulatorFor1999 = () => {
  const {currentUser} = useContext(AuthContext);

  const navigate = useNavigate();
  const [curPoolData, setCurPoolData] = useState(null);
  const [optionValue, setOptionValue] = useState("item-1");
  const [selectedBgStyle, setSelectedBgStyle] = useState({
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/PoolData1999.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch JSON, status: ${response.status}`);
        }

        const jsonData = await response.json();
        setCurPoolData(jsonData);
        // console.log(jsonData.character[0].poolBgURLFromSimulator);
      } catch (err) {
        console.error(`Error during fetching curPoolData from public json file: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSelectedBgStyle({
      backgroundImage: (curPoolData?.character[optionValue - 1]?.poolBgURLFromSimulator) 
                        ? `url(${curPoolData.character[optionValue - 1].poolBgURLFromSimulator})` 
                        : InitialBgImg,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    });
  }, [optionValue]);

  const handleSelectOption = (event) => {
    const selectedValue = event.target.value;
    setOptionValue(selectedValue);
  };

  const checkAndInitialUserPulls = async function() {
    if (currentUser === null) {
      // show the errorMessage(with component)
      navigate('/Login');
      return;
    }
    const response = await getDoc(doc(db, "userPulls1999", currentUser.uid));

    if (!response.exists()) {
      // create a pullsArray to store all the data during summoning
      await setDoc(doc(db, "userPulls1999", currentUser.uid), { pulls : [], guarantee : 0});
    }
  }

  return (
    <div className='simulator-container-1999' style={curPoolData && selectedBgStyle}>
      <div className='summon-pool-selector-container'>
        {curPoolData && curPoolData.character && (
          <select className='summon-pool-selector' value={optionValue} onChange={handleSelectOption}>
            {curPoolData.character.map((chr, index) => (
              <option key={index} value={`${chr.index}`}>
                {chr.poolName}
              </option>
            ))}
          </select>
        )}
        <IoIosArrowDown className='select-arrow'/>
      </div>
      <Link to={`/GachaDetails1999/${optionValue[optionValue.length - 1]}`} className='details-1999'>Details</Link>
      <div className='draw-container'>
        <Link to={`/SingleGachaDisplay1999/${optionValue[optionValue.length - 1]}`} 
          className='single-draw-1999' 
          onClick={checkAndInitialUserPulls}>
            <div className='single-draw-icon'><img src={UnilogImg} width={'35px'} alt='unilog'/></div>
            Summon x1
        </Link>
        <Link to={`/MultiGachaDisplay1999/${optionValue[optionValue.length - 1]}`} 
          className='ten-draw-1999' 
          onClick={checkAndInitialUserPulls}>
            <div className='ten-draw-icon'><img src={UnilogImg} width={'35px'} alt='unilog'/></div>
            Summon x10
        </Link>
      </div>
    </div>
  );
}

export default SimulatorFor1999;

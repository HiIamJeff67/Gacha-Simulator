import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext.js';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { IoIosArrowDown } from 'react-icons/io';
import intertwinedFate from '../../Images/intertwinedFate.webp';
import './SimulatorForGenshin.css';
import InitialBgImg from '../../Images/InitialBgImgGenshin.jpeg';

const SimulatorForGenshin = () => {
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
        const response = await fetch('/PoolDataGenshin.json');
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
    const response = await getDoc(doc(db, "userPullsGenshin", currentUser.uid));

    if (!response.exists()) {
      // create a pullsArray to store all the data during summoning
      await setDoc(doc(db, "userPullsGenshin", currentUser.uid), { pulls : [], guarantee : 0});
    }
  }

  return (
    <div className='simulator-container-genshin' style={curPoolData && selectedBgStyle}>
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
      <Link to={'/GachaDetailsGenshin'} className='details-genshin'>Details</Link>
      <div className='draw-container'>
        <Link to={`/SingleGachaDisplayGenshin/${optionValue[optionValue.length - 1]}`} 
          className='single-draw-genshin' 
          onClick={checkAndInitialUserPulls}>
            Wish x1
          <div className='single-draw-icon'><img src={intertwinedFate} width={'25px'} alt='intertwinedFate'/></div>
        </Link>
        <Link to={`/MultiGachaDisplayGenshin/${optionValue[optionValue.length - 1]}`} 
          className='ten-draw-genshin' 
          onClick={checkAndInitialUserPulls}>
            Wish x10
          <div className='ten-draw-icon'><img src={intertwinedFate} width={'25px'} alt='intertwinedFate'/></div>
        </Link>
      </div>
    </div>
  )
}

export default SimulatorForGenshin
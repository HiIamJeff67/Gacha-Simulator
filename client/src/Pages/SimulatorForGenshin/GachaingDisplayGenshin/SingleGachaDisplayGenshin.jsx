import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateDoc, doc, arrayUnion, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase.js';
import { AuthContext } from '../../../Context/AuthContext';
import CharacterStarGenerator from './CharacterStarGenerator.jsx';
import './SingleGachaDisplayGenshin.css';

import intertwinedFate from '../../../Images/intertwinedFate.webp';
import testChrImg from '../../../Images/Kamisato_Ayaka.jpg';
import Star5Video from '../../../Videos/5starwish.mp4';

const API_BASE = "https://gacha-simulator-backend.vercel.app";

const SingleGachaDisplayGenshin = () => {
  const {currentUser} = useContext(AuthContext);

  const navigate = useNavigate();
  const [curRateUpChr, setCurRateUpChr] = useState(null); // from /public/PoolDataGenshin
  const [rerenderKey, setRerenderKey] = useState(0);
  const [chrInfo, setChrInfo] = useState([]); // from mongodb when summoning
  const [videoState, setVideoState] = useState(true);
  const [fetchingGuaranteeDone, setFetchingGuaranteeDone] = useState(false);
  const currentUserGuarantee = useRef(0);

  const { poolIndex } = useParams();
  const [userDeviceMode, setUserDeviceMode] = useState("");

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setUserDeviceMode("Mobile");
    } else {
      setUserDeviceMode("PC");
    }
    console.log(userDeviceMode);
  }, [rerenderKey]);

  const chrGenshinImageContext = require.context('../../../Images/GenshinImgSrc', false, /\.(png)$/);

  

  useEffect(() => {
    if (currentUser === null) {
      // show the errorMessage(with component)
      navigate('/Login');
      return;
    }

    const getInitialUserGuarantee = async () => {
      try {
        getDoc(doc(db, "userPullsGenshin", currentUser.uid))
          .then((res) => {
            if (res.exists()) {
              currentUserGuarantee.current = parseInt(res.data().guarantee);
              setFetchingGuaranteeDone(true);
              // console.log("current", currentUserGuarantee.current);
            }
          })
      } catch (err) {
        console.log(`Failed to Connected to the firebase database or the data does not exist : ${err}`);
      }
    }
 
    const fetchData = async () => {
      try {
        const response = await fetch('/PoolDataGenshin.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch JSON, status: ${response.status}`);
        }

        const jsonData = await response.json();
        setCurRateUpChr(jsonData.character[poolIndex - 1].rateUpChr);
        // console.log(jsonData.character[0].poolBgURLFromSimulator);
      } catch (err) {
        console.error(`Error during fetching curPoolData from public json file: ${err.message}`);
      }
    };

    const renderProcess = async () => {
      await fetchData();
      await getInitialUserGuarantee();
    }
    renderProcess();
  }, []);

  useEffect(() => {
    if (!fetchingGuaranteeDone) return
    const abortController = new AbortController();
    setVideoState(true);

    const fetchDataAndGuarantees = async () => {
      if (currentUserGuarantee.current === 89) {
        await getGuaranteeChrs(abortController);
      } else if (currentUserGuarantee.current === 179) {
        await getGuaranteeRateUpChr(abortController);
      } else {
        await getChrs(abortController);
      }
    };
  
    fetchDataAndGuarantees();
    // console.log(`outer chrInfo = ${chrInfo}`);
    // console.log(`outer g = ${currentUserGuarantee}`);

    return () => {
      abortController.abort();
    };
  }, [rerenderKey, fetchingGuaranteeDone]);

  const getChrs = async function (abortController) {
    try {
      const response = await fetch(API_BASE + "/randomSelectOne_2", { signal: abortController.signal });
      const data = await response.json();
      currentUserGuarantee.current = (data.star === 5 && data.rateUp) ? 0 : currentUserGuarantee.current + 1;
      setChrInfo([data.name, data.star, data.rateUp, data.rateStart, data.rateEnd]);
      
      // storeUserPulls(currentUserGuarantee.current, data.name, data.star);
      // console.log(`/randomSelectOne get :${data.name}/${data.star}, g = ${currentUserGuarantee.current}`);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted:", error.message);
      } else {
        console.log("Error during summoning:", error.message);
      }
    }
  }
  useEffect(() => {
    if (chrInfo.length > 0 && fetchingGuaranteeDone) {
      storeUserPulls(currentUserGuarantee.current, chrInfo[0], chrInfo[1]);
      console.log(`/randomSelectOne_2 get :${chrInfo[0]}/${chrInfo[1]}, g = ${currentUserGuarantee.current}`);
    }
  }, [currentUserGuarantee.current]);

  const getGuaranteeChrs = async function (abortController) {
    try {
      const response = await fetch(API_BASE + "/getGuarantee5star_2", { signal: abortController.signal });
      const data = await response.json();
  
      currentUserGuarantee.current = (data.rateUp) ? 0 : currentUserGuarantee.current + 1;
      setChrInfo([data.name, data.star, data.rateUp, data.rateStart, data.rateEnd]);
      
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted:", error.message);
      } else {
        console.log("Error during summoning:", error.message);
      }
    }
  }

  const getGuaranteeRateUpChr = async function (abortController) {
    try {
      const response = await fetch(API_BASE + "/getGuaranteeRateUp5star_2", { signal: abortController.signal });
      const data = await response.json();
      
      currentUserGuarantee.current = 0;
      setChrInfo([data.name, data.star, data.rateUp, data.rateStart, data.rateEnd]);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted:", error.message);
      } else {
        console.log("Error during summoning:", error.message);
      }
    }
  }

  const storeUserPulls = async function(curGuarantees, curChrName, curChrStar) {    
    await updateDoc(doc(db, "userPullsGenshin", currentUser.uid), {
      pulls: arrayUnion({
        name: (curChrName === "當期限定角色")
              ? curRateUpChr[0] : (curChrName === "當期限定角色2")
              ? curRateUpChr[1] : (curChrName === "當期限定角色3")
              ? curRateUpChr[2] : (curChrName === "當期限定角色4")
              ? curRateUpChr[3] : curChrName,
        star: curChrStar,
        data: Timestamp.now(),
      }),
      guarantee: curGuarantees,
    })
    if (userDeviceMode !== "PC") {
      navigate('/SimulatorForGenshin');
    }
  }

  const summonAgain = function() {  // use useState to lead the useEffect to make a rerender
    setRerenderKey(prevKey => prevKey + 1);
  }

  return (
    <div className={`single-summon-container-genshin ${videoState ? "" : "video-end"}`}>
      <div className='result-container-genshin'>
        {videoState && (userDeviceMode === "PC") && (
            <video 
              className='video-genshin'
              muted
              autoPlay
              playsInline
              onEnded={() => setVideoState(false)}
              // onClick={() => setVideoState(false)} <= cancel the skip function
              >
              <source src={Star5Video} type='video/mp4'></source>
            </video>)}
        {(!videoState && chrInfo) && (userDeviceMode === "PC") &&
          <div className='result-wrapper-genshin'>
            <div className={`single-result-chr-genshin ${videoState ? "" : "active"}`}>
              <img className='single-chr-img' src={chrGenshinImageContext(`./${((chrInfo[0] === "當期限定角色")
                                                                              ? curRateUpChr[0] : (chrInfo[0] === "當期限定角色2")
                                                                              ? curRateUpChr[1] : (chrInfo[0] === "當期限定角色3")
                                                                              ? curRateUpChr[2] : (chrInfo[0] === "當期限定角色4")
                                                                              ? curRateUpChr[3] : chrInfo[0])}.png`)} alt=''></img>
              <div className='single-chr-star'><CharacterStarGenerator generateNum={chrInfo[1]}/></div>
              <div className='single-chr-name'>
                {(chrInfo[0] === "當期限定角色")
                  ? curRateUpChr[0] : (chrInfo[0] === "當期限定角色2")
                  ? curRateUpChr[1] : (chrInfo[0] === "當期限定角色3")
                  ? curRateUpChr[2] : (chrInfo[0] === "當期限定角色4")
                  ? curRateUpChr[3] : chrInfo[0]
                }
                </div>
            </div>
            <div to={'/SingleGachaDisplayGenshin'} className='single-draw-again-genshin' onClick={summonAgain}>
              <div className='single-draw-again-icon'><img src={intertwinedFate} width={'35px'} alt='intertwinedFate'/></div>
              Summon x1
            </div>
          </div>}
      </div>
    </div>
  )
}

export default SingleGachaDisplayGenshin
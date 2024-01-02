import { useState, useEffect, useRef, useContext } from 'react';
import { Timestamp, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import CharacterStarGenerator from './CharacterStarGenerator';
import './MultiGachaDisplayGenshin.css';

import intertwinedFate from '../../../Images/intertwinedFate.webp';
import Star5Video from '../../../Videos/5starwish.mp4';
import testChrImg from '../../../Images/Kamisato_Ayaka.jpg';

import { useParams } from 'react-router-dom';

const API_BASE = "gacha-simulator-backend.vercel.app";
const _SUMMONTIMES = 10;

const MultiGachaDisplayGenshin = () => {
  const {currentUser} = useContext(AuthContext);

  const navigate = useNavigate();
  const [curRateUpChr, setCurRateUpChr] = useState(null);
  const [rerenderKey, setRerenderKey] = useState(0);  // to prevent the user fresh the page
  const [tempChrInfo, setTempChrInfo] = useState([]);
  const [chrInfos, setChrInfos] = useState([]);
  const [videoState, setVideoState] = useState(true);
  const guaranteeDetRef = useRef(0);  // for 4 star guarantee detect on every 10 summons
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
        console.log(jsonData.character[0].poolBgURLFromSimulator);
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
    setChrInfos(prevChrInfo => [...prevChrInfo, tempChrInfo]);
  },[tempChrInfo])

  useEffect(() => {
    if (!fetchingGuaranteeDone) return;
    const abortController = new AbortController();
    setTempChrInfo([]);
    setChrInfos([]);
    setVideoState(true);

    const fetchDataAndGuarantees = async () => {
      if (currentUserGuarantee.current >= 80 && currentUserGuarantee.current <= 89) {
        getGuaranteeChrs(abortController);
      }
      else if (currentUserGuarantee.current >= 170 && currentUserGuarantee.current <= 179) {
        getGuaranteeRateUpChr(abortController);
      }
      else {
        getChrs(abortController);
        guaranteeDetRef.current = 0;
      }
    }
    fetchDataAndGuarantees();

    return () => {
      abortController.abort();
    };
  }, [rerenderKey, fetchingGuaranteeDone]);

  const getChrs = async function (abortController) {
    try {
      for (let _ = 0; _ < _SUMMONTIMES; _++) {
        if (guaranteeDetRef.current < 9) {
          const response = await fetch(API_BASE + "/randomSelectOne_2", { signal: abortController.signal });
          const data = await response.json();
          currentUserGuarantee.current = (data.star === 5 && data.rateUp) ? 0 : currentUserGuarantee.current + 1;
          setTempChrInfo([data.name, data.star, data.rateUp, data.rateStart, data.rateEnd]);
  
          if (data.star < 4) {
            guaranteeDetRef.current += 1;
          }
        } else {
          guaranteeDetRef.current = 0;
  
          const response = await fetch(API_BASE + "/getGuarantee4star_2", { signal: abortController.signal });
          const data = await response.json();
          currentUserGuarantee.current = (data.star === 5 && data.rateUp) ? 0 : currentUserGuarantee.current + 1;
          setTempChrInfo([data.name, data.star, data.rateUp, data.rateStart, data.rateEnd]);
        }
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted:", error.message);
      } else {
        console.log("Error during summoning:", error.message);
      }
    }
  }
  useEffect(() => {
    if (tempChrInfo.length > 0 && fetchingGuaranteeDone) {
      storeUserPulls(currentUserGuarantee.current, tempChrInfo[0], tempChrInfo[1]);
      console.log(`/randomSelectOne get :${tempChrInfo[0]}/${tempChrInfo[1]}, g = ${currentUserGuarantee.current}`);
    }
  }, [currentUserGuarantee.current]);

  const getGuaranteeChrs = async function (abortController) {
    try {
      const distenceToGuarantee = 90 - currentUserGuarantee.current;
      for (let _ = 1; _ <= _SUMMONTIMES; _++) {
        if (_ !== distenceToGuarantee) {
          const response = await fetch(API_BASE + "/randomSelectOne_2", { signal: abortController.signal });
          const data = await response.json();
          currentUserGuarantee.current = (data.star === 5 && data.rateUp) ? 0 : currentUserGuarantee.current + 1;
          setTempChrInfo([data.name, data.star, data.rateUp, data.rateStart, data.rateEnd]);
        } else {
          const response = await fetch(API_BASE + "/getGuarantee5star_2", { signal: abortController.signal });
          const data = await response.json();
          currentUserGuarantee.current = (data.star === 5 && data.rateUp) ? 0 : currentUserGuarantee.current + 1;
          setTempChrInfo([data.name, data.star, data.rateUp, data.rateStart, data.rateEnd]);
        }
      }
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
      const distenceToGuarantee = 180 - currentUserGuarantee.current;
      for (let _ = 1; _ <= _SUMMONTIMES; _++) {
        if (_ !== distenceToGuarantee) {
          const response = await fetch(API_BASE + "/randomSelectOne_2", { signal: abortController.signal });
          const data = await response.json();
          currentUserGuarantee.current = (data.star === 5 && data.rateUp) ? 0 : currentUserGuarantee.current + 1;
          setTempChrInfo([data.name, data.star, data.rateUp, data.rateStart, data.rateEnd]);
        } else {
          const response = await fetch(API_BASE + "/getGuaranteeRateUp5star_2", { signal: abortController.signal });
          const data = await response.json();
          currentUserGuarantee.current = (data.star === 5 && data.rateUp) ? 0 : currentUserGuarantee.current + 1;
          setTempChrInfo([data.name, data.star, data.rateUp, data.rateStart, data.rateEnd]);
        }
      }
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
    <div className={`ten-summon-container-genshin ${videoState ? "" : "video-end"}`}>
      <div className='result-container-genshin'>
        {videoState && (userDeviceMode === "PC") && (
            <video
              className='video-genshin'
              muted
              autoPlay
              onEnded={() => setVideoState(false)}
              onClick={() => setVideoState(false)}
              >
              <source src={Star5Video} type='video/mp4'></source>
            </video>)}
        {(!videoState && chrInfos) && (userDeviceMode === "PC") &&
        <div className='result-wrapper-genshin'>
          <div className='result-chr-wrapper-genshin'>
            {chrInfos.map((chrInfo, index) => {
              if (chrInfo.length === 0) {
                // console.log("This is for debugging : Skip the first 2 empty index");
                return;
              }
              return (
                <div className={`ten-result-chr-genshin 
                                 ${videoState ? "" : "active"} 
                                 ${(index / ((_SUMMONTIMES / 2) + 1) < 1) ? "result-chr-top" : "result-chr-bottom"}`} 
                     key={index}>
                  <img className='ten-chr-img' src={chrGenshinImageContext(`./${((chrInfo[0] === "當期限定角色")
                                                       ? curRateUpChr[0] : (chrInfo[0] === "當期限定角色2")
                                                       ? curRateUpChr[1] : (chrInfo[0] === "當期限定角色3")
                                                       ? curRateUpChr[2] : (chrInfo[0] === "當期限定角色4")
                                                       ? curRateUpChr[3] : chrInfo[0])}.png`)} alt=''></img>
                  <div className='ten-chr-name'>
                    <div className='ten-chr-star'>
                      <CharacterStarGenerator generateNum={chrInfo[1]}/>
                    </div>
                    {(chrInfo[0] === "當期限定角色")
                      ? curRateUpChr[0] : (chrInfo[0] === "當期限定角色2")
                      ? curRateUpChr[1] : (chrInfo[0] === "當期限定角色3")
                      ? curRateUpChr[2] : (chrInfo[0] === "當期限定角色4")
                      ? curRateUpChr[3] : chrInfo[0]}
                    </div>
                </div>)
            })}
          </div>
          <div to={'/MultiGachaDisplayGenshin'} className='ten-draw-again-genshin' onClick={summonAgain}>
              <div className='ten-draw-again-icon'><img src={intertwinedFate} width={'35px'} alt='intertwinedFate'/></div>
              Summon x10
          </div>
        </div>}
      </div>
    </div>
  )
}


export default MultiGachaDisplayGenshin
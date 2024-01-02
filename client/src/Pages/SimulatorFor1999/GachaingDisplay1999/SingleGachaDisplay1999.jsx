import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateDoc, doc, arrayUnion, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase.js';
import { AuthContext } from '../../../Context/AuthContext';
import CharacterStarGenerator from './CharacterStarGenerator.jsx';
import './SingleGachaDisplay1999.css';

import UnilogImg from '../../../Images/unilog.png';
// import testChrImg from '../../../Images/紅弩箭.png';
import Star5Video from '../../../Videos/5-star.mp4';

const API_BASE = "https://gacha-simulator-backend.vercel.app";

const SingleGachaDisplay1999 = () => {
  const {currentUser} = useContext(AuthContext);

  const navigate = useNavigate();
  const [curRateUpChr, setCurRateUpChr] = useState(null); // from /public/PoolData1999
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

  const chr1999ImageContext = require.context('../../../Images/1999ImgSrc', false, /\.(webp)$/);

  useEffect(() => {
    if (currentUser === null) {
      // show the errorMessage(with component)
      navigate('/Login');
      return;
    }

    const getInitialUserGuarantee = async () => {
      try {
        getDoc(doc(db, "userPulls1999", currentUser.uid))
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
        const response = await fetch('/PoolData1999.json');
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
    if (!fetchingGuaranteeDone) return
    const abortController = new AbortController();
    setVideoState(true);

    const fetchDataAndGuarantees = async () => {
      if (currentUserGuarantee.current === 69) {
        await getGuaranteeChrs(abortController);
      } else if (currentUserGuarantee.current === 139) {
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
      const response = await fetch(API_BASE + "/randomSelectOne", { signal: abortController.signal });
      const data = await response.json();
      currentUserGuarantee.current = (data.star === 6 && data.rateUp) ? 0 : currentUserGuarantee.current + 1;
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
      // console.log(`/randomSelectOne get :${chrInfo[0]}/${chrInfo[1]}, g = ${currentUserGuarantee.current}`);
    }
  }, [currentUserGuarantee.current]);

  const getGuaranteeChrs = async function (abortController) {
    try {
      const response = await fetch(API_BASE + "/getGuarantee6star", { signal: abortController.signal });
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
      const response = await fetch(API_BASE + "/getGuaranteeRateUp6star", { signal: abortController.signal });
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
    await updateDoc(doc(db, "userPulls1999", currentUser.uid), {
      pulls: arrayUnion({
        name: (curChrName === "當期限定角色")
              ? curRateUpChr[0] : (curChrName === "當期限定角色2")
              ? curRateUpChr[1] : (curChrName === "當期限定角色3")
              ? curRateUpChr[2] : curChrName,
        star: curChrStar,
        data: Timestamp.now(),
      }),
      guarantee: curGuarantees,
    })
    if (userDeviceMode !== "PC") {
      navigate('/SimulatorFor1999');
    }
  }

  const summonAgain = function() {  // use useState to lead the useEffect to make a rerender
    setRerenderKey(prevKey => prevKey + 1);
  }

  return (
    <div className={`single-summon-container-1999 ${videoState ? "" : "video-end"}`}>
      <div className='result-container-1999'>
        {videoState && (userDeviceMode === "PC") && (
            <video 
              className='video-1999'
              muted
              autoPlay
              playsInline
              onEnded={() => setVideoState(false)}
              // onClick={() => setVideoState(false)} <= cancel the skip function
              >
              <source src={Star5Video} type='video/mp4'></source>
            </video>)}
        {(!videoState && chrInfo) && (userDeviceMode === "PC") &&
          <div className='result-wrapper-1999'>
            <div className={`single-result-chr-1999 ${videoState ? "" : "active"}`}>
              <img className='single-chr-img' src={chr1999ImageContext(`./${((chrInfo[0] === "當期限定角色")
                                                                              ? curRateUpChr[0] : (chrInfo[0] === "當期限定角色2")
                                                                              ? curRateUpChr[1] : (chrInfo[0] === "當期限定角色3")
                                                                              ? curRateUpChr[2] : chrInfo[0])}.webp`)} alt=''></img>
              <div className='single-chr-star'><CharacterStarGenerator generateNum={chrInfo[1]}/></div>
              <div className='single-chr-name'>
                {(chrInfo[0] === "當期限定角色")
                  ? curRateUpChr[0] : (chrInfo[0] === "當期限定角色2")
                  ? curRateUpChr[1] : (chrInfo[0] === "當期限定角色3")
                  ? curRateUpChr[2] : chrInfo[0]
                }
                </div>
            </div>
            <div to={'/SingleGachaDisplay1999'} className='single-draw-again-1999' onClick={summonAgain}>
              <div className='single-draw-again-icon'><img src={UnilogImg} width={'35px'} alt='unilog'/></div>
              Summon x1
            </div>
          </div>}
      </div>
    </div>
  )
}

export default SingleGachaDisplay1999
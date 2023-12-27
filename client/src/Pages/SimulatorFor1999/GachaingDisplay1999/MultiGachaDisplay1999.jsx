import { useState, useEffect, useRef } from 'react';
import CharacterStarGenerator from './CharacterStarGenerator';
import './MultiGachaDisplay1999.css';

import UnilogImg from '../../../Images/unilog.png';
import Star5Video from '../../../Videos/5-star.mp4';
import testChrImg from '../../../Images/紅弩箭.png';

const API_BASE = "http://localhost:8080";
const _SUMMONTiMES = 10;

const MultiGachaDisplay1999 = () => {
  const [rerenderKey, setRerenderKey] = useState(0);  // to prevent the user fresh the page
  const [tempChrInfo, setTempChrInfo] = useState([]);
  const [chrInfo, setChrInfo] = useState([]);
  const guaranteeDetRef = useRef(0);
  const [videoState, setVideoState] = useState(true);

  useEffect(() => {
    setChrInfo(prevChrInfo => [...prevChrInfo, tempChrInfo]);
  },[tempChrInfo])

  useEffect(() => {
    setTempChrInfo([]);
    setChrInfo([]);
    setVideoState(true);

    const abortController = new AbortController();

    getChrs(abortController)
    guaranteeDetRef.current = 0;

    return () => {
      abortController.abort();
    };
  }, [rerenderKey]);

  const getChrs = async function (abortController) {
    try {
      for (let _ = 0; _ < _SUMMONTiMES; _++) {
        if (guaranteeDetRef.current < 9) {
          const response = await fetch(API_BASE + "/randomSelectOne", { signal: abortController.signal });
          const data = await response.json();
  
          setTempChrInfo([data.name, data.star, data.rateUp, data.rateStart, data.rateEnd]);
  
          if (data.star < 4) {
            guaranteeDetRef.current += 1;
          }
        } else {
          guaranteeDetRef.current = 0;
  
          const response = await fetch(API_BASE + "/getGuarantee4star", { signal: abortController.signal });
          const data = await response.json();
  
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
  };
  

  const summonAgain = function() {  // use useState to lead the useEffect to make a rerender
    setRerenderKey(prevKey => prevKey + 1);
  }

  return (
    <div className={`ten-summon-container-1999 ${videoState ? "" : "video-end"}`}>
      <div className='result-container-1999'>
        {videoState && (
            <video
              className='video-1999'
              muted
              autoPlay
              onEnded={() => setVideoState(false)}
              >
              <source src={Star5Video} type='video/mp4'></source>
            </video>)}
        {!videoState && <div className='result-wrapper-1999'>
          <div className='result-chr-wrapper-1999'>
            {chrInfo.map((chrData, index) => {
              if (chrData.length === 0) {
                // console.log("This is for debugging : Skip the first 2 empty index");
                return;
              }
              return (
                <div className={`ten-result-chr-1999 
                                 ${videoState ? "" : "active"} 
                                 ${(index / ((_SUMMONTiMES / 2) + 1) < 1) ? "result-chr-top" : "result-chr-bottom"}`} 
                     key={index}>
                  <img className='ten-chr-img' src={testChrImg} alt=''></img>
                  <div className='ten-chr-star'>
                    <CharacterStarGenerator generateNum={chrData[1]}/>
                  </div>
                  <div className='ten-chr-name'>
                    {chrData[0]}
                  </div>
                </div>)
            })}
            <div to={'/MultiGachaDisplay1999'} className='ten-draw-again-1999' onClick={summonAgain}>
              <div className='ten-draw-again-icon'><img src={UnilogImg} width={'35px'} alt='unilog'/></div>
              Summon x10
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}


export default MultiGachaDisplay1999
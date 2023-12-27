import { useState, useEffect } from 'react';
import CharacterStarGenerator from './CharacterStarGenerator';
import './SingleGachaDisplay1999.css';

import UnilogImg from '../../../Images/unilog.png';
import Star5Video from '../../../Videos/5-star.mp4';
import testChrImg from '../../../Images/紅弩箭.png';

const API_BASE = "http://localhost:8080";

const SingleGachaDisplay1999 = () => {
  const [rerenderKey, setRerenderKey] = useState(0);
  const [chrInfo, setChrInfo] = useState([]);
  const [videoState, setVideoState] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    setVideoState(true);
    getChrs(abortController);

    return () => {
      abortController.abort();
    };
  }, [rerenderKey]);

  const getChrs = function (abortController) {
    fetch(API_BASE + "/randomSelectOne", { signal: abortController.signal })
      .then(res => res.json())
      .then(data => {
        setChrInfo([data.name, data.star, data.rateUp, data.rateStart, data.rateEnd]);
        console.log(data);
      })
      .catch(error => {
        if (error === "AbortError") {
          console.log(`Use Abort to debug twice fetch : ${error}`);
        }
        else {
          console.log(`Error during summoning : ${error}`);
        }
      });
  }

  const summonAgain = function() {  // use useState to lead the useEffect to make a rerender
    setRerenderKey(prevKey => prevKey + 1);
  }

  return (
    <div className={`single-summon-container-1999 ${videoState ? "" : "video-end"}`}>
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
          <div className={`single-result-chr-1999 ${videoState ? "" : "active"}`}>
            <img className='single-chr-img' src={testChrImg} alt=''></img>
            <div className='single-chr-star'><CharacterStarGenerator generateNum={chrInfo[1]}/></div>
            <div className='single-chr-name'>{chrInfo[0]}</div>
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
import { useState } from 'react';

import GachaRule1999 from '../../Components/GachaRule1999/GachaRule1999.jsx';
import RateDetails1999 from '../../Components/RateDetails1999/RateDetails1999.jsx';
import ProbabilityDisplay1999 from '../../Components/ProbabilityDisplay1999/ProbabilityDisplay1999.jsx';

import './GachaDetails1999.css';

const GachaDetails = () => {
  const [curInfo, setCurInfo] = useState("rules");


  return (
    <div className='gacha-details-container-1999'>
      <div className='details-side-bar-1999'>
        <div className={`rule-title ${(curInfo === "rules") ? "active" : ""}`} 
         onClick={() => setCurInfo("rules")}>
          Rules
        </div>
        <div className={`rate-details-title ${(curInfo === "ratedetails") ? "active" : ""}`}
         onClick={() => setCurInfo("ratedetails")}>
          Rate Details
        </div>
        <div className={`probability-title ${(curInfo === "probability") ? "active" : ""}`}
         onClick={() => setCurInfo("probability")}>
          Probability
        </div>
      </div>
      <div className='details-info-1999'>
        {curInfo === "rules" && <GachaRule1999/>}
        {curInfo === "ratedetails" && <RateDetails1999/>}
        {curInfo === "probability" && <ProbabilityDisplay1999/>}
      </div>
    </div>
  )
}

export default GachaDetails
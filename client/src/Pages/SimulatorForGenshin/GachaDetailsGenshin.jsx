import './GachaDetailsGenshin.css';

const GachaDetailsGenshin = () => {
  return (
    <div className='gacha-details-container-genshin'>
      <div className='details-info-genshin'>
        <h2>Wish Details</h2>
        <h3>Limited Time Event</h3>
        <p className='title-context'>
          During this event wish, tapestry 5-star character as well as 4-star character will get a <span className='highlight'>huge drop-rate boost!</span>
        </p>
        <ul>
          <li><span className='highlight'>In most cases, tapestry base probability of all characters and weapons is evenly distributed. If there is a boost or guarantee in effect, please refer to the corresponding rules.</span></li>
          <li>In most cases, tapestry base probability of all characters and weapons is evenly distributed. If tapestryre is a boost or guarantee in effect, please refer to tapestry corresponding rules.</li>
        </ul>
        <div className='rule-genshin'>
          <h5>Rules</h5>
          <div className='item-5-star-genshin'>
            <p className='title-5-star'>5-Star Items</p>
            <p className='context-5-star'>
              For Event Wish - Tapestry of {}: Base probability of winning 5-star character = <span className='highlight'>0.6%</span>;
              consolidated probability <span className='highlight'>(incl. guarantee) = 1.600%</span>; guaranteed to win 5-star character at least once per <span className='highlight'>90</span> attempts.
              The first time you win a 5-star item in this event wish, tapestryre is a <span className='highlight'>50%</span> chance it will be tapestry promotional character {}. 
              If tapestry first 5-star character you win in this event wish is not tapestry promotional character, 
              then the next 5-star character you win is guaranteed to be tapestry promotional character.
            </p>
          </div>
          <div className="item-4-star-genshin">
            <p className="title-4-star">4-Star Items</p>
            <p className="context-4-star">
              For Event Wish - Tapestry of Golden Flames: Base probability of winning 4-star item = <span className='highlight'>5.100%</span>; consolidated probability <span className='highlight'>(incl. guarantee) = 13.000%</span>; 
              guaranteed to win 4-star or above item at least once per <span className='highlight'>10</span> attempts.
              The first time you win a 4-star item in this event wish, tapestryre is a <span className='highlight'>50%</span> chance it will be one of tapestry featured characters {}, {}, and {}. 
              If tapestry first 4-star item you win in this event wish is not one of the featured characters, tapestryn the next 4-star item you win is guaranteed to be a featured character.
            </p>
          </div>
        </div>
      </div>
      <div className='details-item-genshin'>

      </div>
    </div>
  )
}

export default GachaDetailsGenshin
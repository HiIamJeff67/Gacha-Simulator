import StarFor1999 from '../StarFor1999/StarFor1999';
import './GachaRule1999.css';

const GachaRule = () => {
  return (
    <div className='rule-container-1999'>
      <div className='summon-rule'>
        <h3 className='summon-rule-title'>Summon Rules</h3>
        <ul className='summon-rule-list'>
          <li>In this banner every 10 summons guarantees at least 1 4-start or better character.</li>
          <li>Generally, the basic rate applies to all character. Under certain cicumstances, such as Rate Up or Guarantee, please refer to the specific rules</li>
        </ul>
      </div>
      <div className='summon-rate'>
        <h3 className='summon-rate-title'>Summon Rates</h3>
        <div className='summon-rate-context'>
          <p>In every banner :</p>
          <p>Basic rate of summoning 6 <StarFor1999/> character: <span className='rule-rate'>1.5%</span>. Overall rate (including Guarantee): <span className='rule-rate'>2.36%</span>;</p>
          <p>Basic rate of summoning 5 <StarFor1999/> character: <span className='rule-rate'>8.5%</span>;</p>
          <p>Basic rate of summoning 4 <StarFor1999/> character: <span className='rule-rate'>40%</span>;</p>
          <p>Basic rate of summoning 3 <StarFor1999/> character: <span className='rule-rate'>45%</span>;</p>
          <p>Basic rate of summoning 2 <StarFor1999/> character: <span className='rule-rate'>5%</span>.</p>
        </div>
        
        <ul className='summon-rate-list'>
          <li>In this banner, the rate of summoning 6-star rate-up character takes up <span className='rule-rate'>50%</span> of the rate of summoning 6-star characters. If the first 6-star character obtained from this banner is not the rate-up one, then the next 6-star character obtained from this banner is guaranteed to be the rate-up character.</li>
          <li>In this banner, the rate of summoning 5-star rate-up character takes up <span className='rule-rate'>50%</span> of the rate of summoning 5-star characters. The rate bonus is equally distributed to every 5-star rate-up character.</li>
        </ul>
      </div>
      <div className='special-rule'>
        <h3 className='special-rule-title'>Special Rules</h3>
        <ul className='special-rule-list'>
          <li>This simulator will only provide you the guarantee when you reach 70 summons.</li>
          <li>Every 70 summons guarantees 1 6-star character</li>
          <li>This banner is a [TIme-limited Character Banner] which shares the 6-star character guarantee count with other similar banners.</li>
        </ul>
        
      </div>
    </div>
  )
}

export default GachaRule
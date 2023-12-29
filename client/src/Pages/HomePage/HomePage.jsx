import './HomePage.css'
import Contact from '../../Components/Contact/Contact'

const HomePage = () => {
  return (
    <div className='home-container'>
      <div className='home-img'>
        <div className='slogan'>
          <h1>The Best</h1>
          <h1>Gacha Simulator</h1>
          <h1>for Gamers</h1>
          <div className='homepage-contact'>
            <Contact/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
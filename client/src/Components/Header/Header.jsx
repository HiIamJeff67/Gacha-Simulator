import { Link } from 'react-router-dom'
import './Header.css'
import Contact from '../Contact/Contact.jsx'

const Header = ({ setLoginState }) => {
  return (
    <header>
      <Link to='/' className='logo' onClick={() => {setLoginState(1)}}>Gacha Simulator</Link>
      <Contact/>
      <nav>
        <Link to='/login' className='login-reg' onClick={() => {setLoginState(0)}}>Login</Link>
        <Link to='/Register' className='login-reg' onClick={() => {setLoginState(0)}}>Register</Link>
      </nav>
    </header>
  )
}

export default Header
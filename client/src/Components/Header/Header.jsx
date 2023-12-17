import { Link } from 'react-router-dom'
import './Header.css'
import Contact from '../Contact/Contact.jsx'

const Header = () => {
  return (
    <header>
      <Link to='/' className='logo'>Gacha Simulator</Link>
      <Contact/>
      <nav>
        <Link to='/login' className='login-reg'>Login</Link>
        <Link to='/Register' className='login-reg'>Register</Link>
      </nav>
    </header>
  )
}

export default Header
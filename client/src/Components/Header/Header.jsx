import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.js';
import { AuthContext } from '../../Context/AuthContext.js'
import './Header.css'
import { FaRegUserCircle } from "react-icons/fa";
import Contact from '../Contact/Contact.jsx'

const Header = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <header>
      <Link to='/' className='logo'>Gacha Simulator</Link>
      <Contact/>
      <nav>
        {!currentUser && <Link to='/login' className='login-reg'>Login</Link>}
        {!currentUser && <Link to='/Register' className='login-reg'>Register</Link>}
        {currentUser && <div className='login-reg' onClick={() => {signOut(auth)}}>Logout</div>}
        {currentUser && 
          <div className='login-reg user-account'>
            {<img src={currentUser.photoURL} className='user-icon' alt=''></img> || <FaRegUserCircle className='user-icon'/>}
          <p className='username'>{currentUser.displayName}</p>
          </div>}
      </nav>
    </header>
  )
}

export default Header
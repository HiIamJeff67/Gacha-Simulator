import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { AuthContext } from '../../Context/AuthContext.js';
import './Header.css';
import { FaRegUserCircle } from "react-icons/fa";
import Contact from '../Contact/Contact.jsx';

const Header = () => {
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header>
      <Link to='/' className='logo'>Gacha Simulator</Link>
      <span className='header-contact'><Contact/></span>
      <nav>
        {!currentUser && (<><Link to='/login' className='login-reg'>Login</Link>
                          <Link to='/Register' className='login-reg'>Register</Link></>)}
        {currentUser && (<><div 
                              className='login-reg'
                              onClick={() => {
                                signOut(auth)
                                navigate('/');
                              }}>
                              Logout
                            </div>
                            <div 
                              className='login-reg user-account'
                              onClick={() => {
                                navigate('/CollectionLibrary');
                              }}>
                                {(currentUser.photoURL === null) ? 
                                  (<FaRegUserCircle className='user-icon'/>) : (<img src={currentUser.photoURL} className='user-icon' alt=''/>)}
                                <p className='username'>{currentUser.displayName}</p>
                            </div></>)}
      </nav>
    </header>
  )
}

export default Header
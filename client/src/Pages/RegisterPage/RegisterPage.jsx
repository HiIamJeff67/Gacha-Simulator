import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import logo from '../../Images/logo.png';
import RegisterOutlet from '../../Components/RegisterOutlet/RegisterOutlet';
import './RegisterPage.css';

const RegisterPage = () => {
  const {currentUser} = useContext(AuthContext);

  const navigate = useNavigate();
  const [bookState, setBookState] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  },[currentUser]);

  return (
    <div className="register-container">
      <div className={`book-cover ${bookState}`} onClick={() => setBookState("active")}>
        <h1 className='register-title'>Register</h1>
        <h3 className='register-welcome-1'>Welcome to our</h3>
        <h3 className='register-welcome-2'>Gacha Simulator</h3>
        <p className='register-paragraph'>Please register to begin exploring to your account</p>
        <p className='register-details'>Designed by Team#32</p>
        <p className='register-copyright'>Copyright © 2023 Gacha Simulator</p>
      </div>
      <div className={`register-page page-1 ${bookState}`}>
        <p className='page-paragraph'>"Power meets Elegance: simulator draws effortlessly, witness incredible effects, and manage your card collection with elegance!"</p>
        <img src={logo} className='page-icon' alt='logo'/>
      </div>
      <div className='register-page page-2'>
        <RegisterOutlet/>
      </div>
    </div>
  )
}

export default RegisterPage
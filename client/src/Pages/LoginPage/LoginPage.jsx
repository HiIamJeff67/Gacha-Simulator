import { useState } from 'react'
import logo from '../../Images/logo.png'
import LoginOutlet from '../../Components/LoginOutlet/LoginOutlet';
import './LoginPage.css'

const LoginPage = () => {
  const [bookState, setBookState] = useState("");

  return (
    <div className="login-container">
      <div className={`book-cover ${bookState}`} onClick={() => setBookState("active")}>
        <h1 className='login-title'>Login</h1>
        <h3 className='login-welcome-1'>Welcome to our</h3>
        <h3 className='login-welcome-2'>Gacha Simulator</h3>
        <p className='login-paragraph'>Please login to store all the gacha data to your account</p>
        <p className='login-details'>Designed by Team#32</p>
        <p className='login-copyright'>Copyright © 2023 Gacha Simulator</p>
      </div>
      <div className={`login-page page-1 ${bookState}`}>
        <LoginOutlet/>
      </div>
      <div className='login-page page-2'>
        <p className='page-paragraph'>"Power meets Elegance: simulator draws effortlessly, witness incredible effects, and manage your card collection with elegance!"</p>
        <img src={logo} className='page-icon' alt='page-icon'/>
      </div>
    </div>
  )
}

export default LoginPage
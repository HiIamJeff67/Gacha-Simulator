import { useState } from "react";
import './RegisterOutlet.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginPage1999Icon from '../../Images/LoginPage1999Icon.webp';
import LoginPageGenshinIcon from '../../Images/LoginPageGenshinIcon.webp';

const RegisterOutlet = () => {
  const [eyeState_1, setEyeState_1] = useState("enable");
  const [eyeState_2, setEyeState_2] = useState("enable");

  const handleSubmit = function(ev) {
    ev.preventDefault();
    const account = ev.target[0].value;
    const password = ev.target[1].value;
    const confirmPassword = ev.target[2].value;
    
    
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-chinese">註冊</h1>
        <div className="input-account-container">
          <input type="text" placeholder="account" className="register-input input-account"></input>
        </div>
        <div className="input-password-container">
          <input type={(eyeState_1) === "enable" ? "password" : "text"} placeholder="password" className="register-input input-password"></input>
          <div className="eye-container">
            <a href="#" className={`little-eye ${(eyeState_1 === "enable") ? "" : "hide"}`} onClick={() => {setEyeState_1("disable")}}>
              <FaEye/>
            </a>
          </div>
          <div className="eye-container">
            <a href="#" className={`little-eye ${(eyeState_1 === "disable") ? "" : "hide"}`} onClick={() => {setEyeState_1("enable")}}>
              <FaEyeSlash/>
            </a>
          </div>
        </div>
        <div className="input-password-container">
          <input type={(eyeState_2) === "enable" ? "password" : "text"} placeholder="confirm password" className="register-input input-password"></input>
          <div className="eye-container">
            <a href="#" className={`little-eye-confirm ${(eyeState_2 === "enable") ? "" : "hide"}`} onClick={() => {setEyeState_2("disable")}}>
              <FaEye/>
            </a>
          </div>
          <div className="eye-container">
            <a href="#" className={`little-eye-confirm ${(eyeState_2 === "disable") ? "" : "hide"}`} onClick={() => {setEyeState_2("enable")}}>
              <FaEyeSlash/>
            </a>
          </div>
        </div>
        <button className='register-btn'>Register</button>
        <div className="register-icon-container">
          <img src={LoginPage1999Icon} className="register-1999-icon"/>
          <img src={LoginPageGenshinIcon} className="register-genshin-icon"/>
        </div>
    </form>
  )
}

export default RegisterOutlet
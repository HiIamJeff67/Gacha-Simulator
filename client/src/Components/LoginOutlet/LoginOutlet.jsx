import { useState } from "react";
import './LoginOutlet.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginPage1999Icon from '../../Images/LoginPage1999Icon.webp';
import LoginPageGenshinIcon from '../../Images/LoginPageGenshinIcon.webp';

const LoginOutlet = () => {
  const [eyeState, setEyeState] = useState("enable");

  return (
    <form className="login-form">
        <h1 className="login-chinese">登入</h1>
        <input type="text" placeholder="account" className="login-input input-account"></input>
        <input type={(eyeState) === "enable" ? "password" : "text"} placeholder="password" className="login-input input-password"></input>
        <a className={`little-eye ${(eyeState === "enable") ? "" : "hide"}`} onClick={() => {setEyeState("disable")}}><FaEye/></a>
        <a className={`little-eye ${(eyeState === "disable") ? "" : "hide"}`} onClick={() => {setEyeState("enable")}}><FaEyeSlash/></a>
        <button className='login-btn'>Login</button>
        <div className="login-icon-container">
          <img src={LoginPage1999Icon} className="login-1999-icon"/>
          <img src={LoginPageGenshinIcon} className="login-genshin-icon"/>
        </div>
    </form>
  )
}

export default LoginOutlet
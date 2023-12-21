import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import './LoginOutlet.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginPage1999Icon from '../../Images/LoginPage1999Icon.webp';
import LoginPageGenshinIcon from '../../Images/LoginPageGenshinIcon.webp';
import LoginErrorMessage from "../LoginErrorMessage/LoginErrorMessage.jsx";

const LoginOutlet = () => {
  const navigate = useNavigate();

  const [eyeState, setEyeState] = useState("enable");
  const [error, setError] = useState("");

  const handleSubmit = async function(ev) {
    ev.preventDefault();
    const email = ev.target[0].value;
    const password = ev.target[1].value;
    
    setError("loading");

    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate('/');
        setError("");
      }).catch((err) => {
        setError("wrongPassword");
        ev.target[1].value = "";
      });
    } catch (err) {
      setError("unknownError");
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-chinese">登入</h1>
        <div className="input-account-container">
          <input type="text" placeholder="account@gmail.com" className="login-input input-account"></input>
        </div>
        <div className="input-password-container">
          <input type={(eyeState) === "enable" ? "password" : "text"} placeholder="password" className="login-input input-password"></input>
          <div className="eye-container">
            <a href="#" className={`little-eye ${(eyeState === "enable") ? "" : "hide"}`} onClick={() => {setEyeState("disable")}}>
              <FaEye/>
            </a>
          </div>
          <div className="eye-container">
            <a href="#" className={`little-eye ${(eyeState === "disable") ? "" : "hide"}`} onClick={() => {setEyeState("enable")}}>
              <FaEyeSlash/>
            </a>
          </div>
        </div>
        {error && <LoginErrorMessage errorType={error} setError={setError}/>}
        <button className='login-btn'>Login</button>
        <div className="login-icon-container">
          <img src={LoginPage1999Icon} className="login-1999-icon" alt="login-1999-icon"/>
          <img src={LoginPageGenshinIcon} className="login-genshin-icon" alt="login-genshin-icon"/>
        </div>
    </form>
  )
}

export default LoginOutlet
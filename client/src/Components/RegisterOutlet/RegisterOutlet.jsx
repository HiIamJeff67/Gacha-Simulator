import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import './RegisterOutlet.css';
import addImagePhotoIcon from '../../Images/add-image-photo-icon.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginPage1999Icon from '../../Images/LoginPage1999Icon.webp';
import LoginPageGenshinIcon from '../../Images/LoginPageGenshinIcon.webp';
import RegisterErrorMessage from "../RegisterErrorMessage/RegisterErrorMessage.jsx";
import { useNavigate } from "react-router-dom";
import Contact from '../Contact/Contact.jsx';

const RegisterOutlet = () => {
  const navigate = useNavigate();

  const [eyeState_1, setEyeState_1] = useState("enable");
  const [eyeState_2, setEyeState_2] = useState("enable");
  const [error, setError] = useState("");

  const handleSubmit = async function(ev) {
    ev.preventDefault();
    const displayName = (ev.target[0].value === null) ? "anonymous" : ev.target[0].value;
    const email = ev.target[1].value;
    const password = ev.target[2].value;
    const confirmPassword = ev.target[3].value;
    const file = ev.target[4].files[0];

    if (confirmPassword != password) {
      setError("passwordNotPair");
      return;
    }
    else {
      setError("loading");
    }
    
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: (file === undefined) ? null : downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: (file === undefined) ? null : downloadURL,
            });
            navigate('/');
            setError("");
          } catch (err) {
            console.log(err);
            setError("undefinedError");
          }
        });
      });

      // prepare the database for recording user's pulls in 1999
      await setDoc(doc(db, "userPulls1999", res.user.uid), { pulls : [], guarantee : 0});
      // prepare the database for recording user's pulls in genshin
      await setDoc(doc(db, "userPullsGenshin", res.user.uid), {pulls: [], guarantee : 0});

    } catch (err) {
      console.log(err);
      setError((err.code === "auth/email-already-in-use") 
                              ? "accountUsed" 
                              : "passwordLengthError");
    }
  }

  

  return (
    <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-chinese">註冊</h1>
        <div className="input-displayname">
          <input type="text" placeholder="username" className="register-input input-displayname" required></input>
        </div>
        <div className="input-account-container">
          <input type="text" placeholder="account@gmail.com" className="register-input input-account" required></input>
        </div>
        <div className="input-password-container">
          <input type={(eyeState_1) === "enable" ? "password" : "text"} placeholder="password" className="register-input input-password" required></input>
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
          <input type={(eyeState_2) === "enable" ? "password" : "text"} placeholder="confirm password" className="register-input input-password" required></input>
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
        <input type="file" placeholder="your-icon" id="file" className="hide"></input>
        <label htmlFor="file" className="add-image-label"><img src={addImagePhotoIcon}  className="add-image-icon"></img>upload your photo</label>
        <button className='register-btn'>Register</button>
        {error && <RegisterErrorMessage errorType={error} setError={setError}/>}
        <div className="register-icon-container">
          <img src={LoginPage1999Icon} className="register-1999-icon"/>
          <img src={LoginPageGenshinIcon} className="register-genshin-icon"/>
        </div>
        <div className="register-contact">
          <Contact/>
        </div>
    </form>
  )
}

export default RegisterOutlet
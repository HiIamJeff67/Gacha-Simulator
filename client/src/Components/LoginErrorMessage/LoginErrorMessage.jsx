import { Link } from 'react-router-dom';
import './LoginErrorMessage.css';

const LoginErrorMessage = (props) => {
  return (
    <div className="response-message-login">
        {(props.errorType === "wrongPassword") && 
            <><span className='error-message'>Your password is Wrong! Please try again later.</span>
                <Link to='/Login' className='error-confirm' onClick={() => {props.setError("")}}>OK</Link></>}

        {(props.errorType === "unknownAccount") && 
            <><span className='error-message'>This account haven't register! Please register first<br/>(Click the OK button to go to register page).</span>
                <Link to='/Register' className='error-confirm' onClick={() => {props.setError("")}}>OK</Link></>}

        {(props.errorType === "wrongPasswordOrWrongAccount") && 
            <><span className='error-message'>Wrong account or wrong password.<br/>(Click the OK button to try it again).</span>
                <Link to='/Login' className='error-confirm' onClick={() => {props.setError("")}}>OK</Link></>}

        {(props.errorType === "unknownError") && 
            <><span className='error-message'>Unknown Error. Please try refresh the page again.</span>
                <Link to='/Login' className='error-confirm' onClick={() => {props.setError("")}}>OK</Link></>}  

        {(props.errorType === "undefinedError") && 
            <><span className='error-message'>Undefined Error. Please try refresh the page again.</span>
                <Link to='/Login' className='error-confirm' onClick={() => {props.setError("")}}>OK</Link></>}  



        {(props.errorType === "loading") && <><span className='loading-message'>Now Loading... Please wait a moment~</span></>}      
    </div>
  )
}

export default LoginErrorMessage
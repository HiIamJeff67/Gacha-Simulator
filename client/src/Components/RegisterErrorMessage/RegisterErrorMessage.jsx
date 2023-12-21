import { Link } from 'react-router-dom';
import './RegisterErrorMessage.css';

const RegisterErrorMessage = (props) => {

  return (
    <div className="response-message-register">
        {(props.errorType === "passwordLengthError") && <><span className='error-message'>Something went wrong while registering! Check the length of password is greater than 6.</span>
            <Link to='/Register' className='error-confirm' onClick={() => {props.setError("")}}>OK</Link></>}

        {(props.errorType === "passwordNotPair") && <><span className='error-message'>Password is not eqaul to the comfirm password. Please try again.</span>
            <Link to='/Register' className='error-confirm' onClick={() => {props.setError("")}}>OK</Link></>}

        {(props.errorType === "unknownError") && <><span className='error-message'>Unknown Error. Please try refresh the page again.</span>
            <Link to='/Register' className='error-confirm' onClick={() => {props.setError("")}}>OK</Link></>}  

        {(props.errorType === "undefinedError") && <><span className='error-message'>Undefined Error. Please try refresh the page again.</span>
            <Link to='/Register' className='error-confirm' onClick={() => {props.setError("")}}>OK</Link></>}  



        {(props.errorType === "loading") && <><span className='loading-message'>Now Loading... Please wait a moment~</span></>}      
    </div>
  )
}

export default RegisterErrorMessage




import React from 'react'
import { useState } from 'react'
// import './login .css'
import { useNavigate} from 'react-router-dom'
import {  signInWithEmailAndPassword } from 'firebase/auth'
import InputControl from './InputControl'
import { Link } from 'react-router-dom'
import { auth } from '../Firebase'

const Login = () => {
  const navigate=useNavigate()
  const [values, setValues]=useState({
     email:"",
     password:"",
  });

  const[error, setError]=useState('')
  const[submitButtonDisabled, setSubmitButtonDisabled]=useState(false)


const handleSubmit=()=>{
  if(!values.email ){
      // console.log(!values.fname || !values.email || !values.pass);
        setError("require")
        return;
     
  }
      setError("");
      // alert("hiii")
      setSubmitButtonDisabled(true)
      signInWithEmailAndPassword(auth, values.email, values.password).then(
          async(res)=>{
            const user = res;
            
            // Set session (or local storage)
            sessionStorage.setItem('authUser', JSON.stringify(user));
            
              setSubmitButtonDisabled(false)

              // console.log(user)
              // navigate("/");
              window.location.href = "/";
          })   .catch((err) => 
              setError(err.message))
    
          console.log(values)
  }
  return (
    <div className=''>
      <div className='innerbox'>
       
       <h1 className='heading'>
          Login
       </h1>
       <InputControl 
       label="Email" 
       placeholder="Enter your email"
       onChange={(e) =>
        setValues((prev) => ({...prev, email:e.target.value}))
     }
       />
       <InputControl 
       label="password"
       type="password"
        placeholder="Enter your password"
        onChange={(e) =>
          setValues((prev) => ({...prev, password:e.target.value}))
       }
        />

       <div className='footer'>
        <p className='error'>{error}</p>
         <button disabled={submitButtonDisabled} onClick={handleSubmit}>Login</button>
         <p>
            don't have an account?{""}
            <span>
                <Link to="/signup">Sign up</Link>
            </span>
         </p>
       </div>
      </div>
    </div>
  )
}

export default Login

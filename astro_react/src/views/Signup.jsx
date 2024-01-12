import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors,setErrors] = useState(null);
  const {setUser, setToken} = useStateContext()
  const passwordConfirmationRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      password_confirmation:passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup',payload)
    .then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err=>{
      const response = err.response;
      if(response && response.status==422){
       setErrors(response.data.errors);
      }
    })
};
  return (
    <div>
       <div className="login-signup-form animated fadeInDown">
                <div className="form">
                  <h1 className="title">SignUp</h1>
                  {errors && <div className='alert'>{Object.keys(errors).map(key=>(
                   <p>{errors[key][0]}</p> 
                  ))}</div>}
                    <form onSubmit={onSubmit}>
                        <input type="text" ref={nameRef} placeholder="Full Name" />
                        <input type="email" ref={emailRef} placeholder="Email Address" />
                        <input type="password" ref={passwordRef} placeholder="Password" />
                        <input type="password" ref={passwordConfirmationRef} placeholder="Password Confirmation" />
                        <button className="btn btn-block">Register</button>
                        <p className="message">Already registered?
                        <Link to='/login'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
    </div>
  )
}

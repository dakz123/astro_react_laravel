import React from 'react'

export default function ForgotPassword() {
    const onSubmit = (e) => {
        e.preventDefault();
    };
  return (
    <div>
          <div className="login-signup-form animated fadeInDown">
                <div className="form">
                <h1 className='title'>Choose how you want to login</h1>
                    <form onSubmit={onSubmit}>
                        
                    <p className='message'>  
                    <a href="#"  className="btn-logout">Get a verification code to email</a>
                    </p> 
                    <p className='message'> 
                    <a href="#"  className="btn-logout">Get a verification code to phone</a>   
                    </p> 
                    </form>
                </div>
            </div>
    </div>
  )
}

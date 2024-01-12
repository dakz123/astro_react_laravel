import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [message, setMessage] = useState(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message);
                }
            });
    };
    return (
        <div>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <h1 className="title">Login to your account</h1>
                    {message && (
                        <div className="alert">
                            <p>{message}</p>
                        </div>
                    )}
                    <form onSubmit={onSubmit}>
                        <input
                            type="email"
                            ref={emailRef}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            ref={passwordRef}
                            placeholder="Password"
                        />
                        <button className="btn btn-block">Login</button>
                        <div>
                            <p className="message">
                                <Link to="/forgotpassword">
                                    Forgot Password
                                </Link>
                            </p>
                            <p className="message">
                                Not registered?
                                <Link to="/signup">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

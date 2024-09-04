/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavForLogin from "../navbar/NavForLogin";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../constant/Constant";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const path = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${API_URL}/user/loginUser`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();


            if (response.ok && data.status == "ok") {
                toast.success("Login successful");
                window.localStorage.setItem("token", data.data);
                window.localStorage.setItem("userType", data.userType);
                window.localStorage.setItem("loggedIn", true);
                setTimeout(() => {
                    path('/');
                }, 2000);
            } else {
                setError(data.error || "Login failed. Please try again.");
                toast.error(data.error || "Login failed. Please try again.", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
            toast.error("An unexpected error occurred. Please try again later.");
        }
    }

    return (
        <>
            <NavForLogin />
            <div className="auth-wrapper" style={{ marginTop: "-7vh" }}>
                <div className="auth-inner">
                    <form onSubmit={handleSubmit}>
                        <h3>Login</h3>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="mb-3">
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                style={{ width: "100%" }}
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                style={{ width: "100%" }}
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck1"
                                />
                                <label className="custom-control-label" htmlFor="customCheck1">
                                    &nbsp; Remember me
                                </label>
                            </div>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="forgot-password text-right">
                            <span onClick={() => path('/forgot-password')} style={{ color: "#007BFF", cursor: "pointer" }}>Forgot Password?</span>
                        </p>
                        <p className="forgot-password text-right">
                            Don't have an account? <span onClick={() => path('/register')} style={{ color: "#007BFF", cursor: "pointer" }}>Register !</span>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

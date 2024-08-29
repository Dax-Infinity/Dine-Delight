/* eslint-disable eqeqeq */
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavForLogin from "../navbar/NavForLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../constant/Constant";

export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const path = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domainRegex = /@(gmail|yahoo|outlook|hotmail)\.com$/;
    return emailRegex.test(email) && domainRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address with a supported domain (e.g., Gmail, Yahoo, Outlook).");
      toast.error("Please enter a valid email address with a supported domain (e.g., Gmail, Yahoo, Outlook).");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
          userType: "user", // Assuming a default userType
        }),
      });

      const data = await response.json();

      if (response.ok && data.status == "ok") {
        toast.success("Registration Successful");
        setTimeout(() => {
          path("/login");
        }, 2000);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <NavForLogin />
      <div className="auth-wrapper" style={{ marginTop: "-6vh" }}>
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Register to get started</h3>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="mb-3" style={{ marginTop: "2vh" }}>
              <TextField
                label="Firstname"
                className="form-control"
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <TextField
                label="Lastname"
                className="form-control"
                onChange={(e) => setLname(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <TextField
                label="Email address"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>

            <div className="mb-3">
              <TextField
                type="password"
                label="Password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: "2vh" }}
              >
                Register
              </button>
            </div>
            <p className="forgot-password text-right">
              Already have an account?{" "}
              <span
                onClick={() => path('/login')}
                style={{ color: "#007BFF", cursor: "pointer" }}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

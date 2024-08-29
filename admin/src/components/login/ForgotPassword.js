import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../constant/Constant';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import NavForLogin from '../navbar/NavForLogin';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const path = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/user/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'Password reset link sent to your email.');
                setTimeout(() => {
                    path('/login')
                }, 2000);
            } else {
                toast.error(data.error || 'Failed to send password reset link.');
            }
        } catch (err) {
            toast.error('An unexpected error occurred.');
        }
    };

    return (
        <>
            <NavForLogin />
            <div className="auth-wrapper" style={{ "marginTop": "-4em" }}>
                <div className="auth-inner">
                    <form onSubmit={handleSubmit}>
                        <h3>Forgot Password</h3>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1em' }}>
                            Send Reset Link
                        </Button>
                    </form>
                </div>
                <ToastContainer />
            </div>
            <Footer />
        </>
    );
}

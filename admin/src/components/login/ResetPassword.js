import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../constant/Constant';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../footer/Footer';
import NavForLogin from '../navbar/NavForLogin';

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const path = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/user/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'Password reset successful.');
                setTimeout(() => {
                    path('/login');
                }, 2000);
            } else {
                toast.error(data.error || 'Failed to reset password.');
            }
        } catch (err) {
            toast.error('An unexpected error occurred.');
        }
    };

    return (
        <>
            <NavForLogin />
            <div className="auth-wrapper" style={{ "marginTop": "-4rem" }}>
                <div className="auth-inner">
                    <form onSubmit={handleSubmit}>
                        <h3>Reset Password</h3>
                        <TextField
                            label="New Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1em' }}>
                            Reset Password
                        </Button>
                    </form>
                </div>
                <ToastContainer />
            </div>
            <Footer />
        </>
    );
}

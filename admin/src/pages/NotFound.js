import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <>
            <Navbar />
            <Container sx={{ textAlign: 'center', mt: 8 }}>
                <Box sx={{ display: 'inline-block', px: 2 }}>
                    <Typography variant="h1" color="primary" sx={{ fontWeight: 'bold' }}>
                        404
                    </Typography>
                    <Typography variant="h4" color="textSecondary" sx={{ mt: 2, mb: 4 }}>
                        Oops! The page you are looking for does not exist.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleGoHome}>
                        Go Back Home
                    </Button>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default NotFound;

// src/pages/ContactUs.js
import React from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import './contact.css'
const ContactUs = () => {
    return (
        <Container maxWidth="md" style={{ padding: '2rem', backgroundColor: '#fafafa', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.1)', 'marginTop': '10vh' }}>
            <Typography variant="h4" gutterBottom style={{ color: '#333', marginBottom: '1rem' }}>
                Contact Us
            </Typography>
            <Typography variant="body1" paragraph style={{ color: '#555', marginBottom: '2rem' }}>
                We’re here to help! Please use the form below to send us your inquiries, feedback, or any questions you may have. We aim to respond within 24 hours.
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ marginBottom: '1rem' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ marginBottom: '1rem' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Message"
                            variant="outlined"
                            multiline
                            rows={6}
                            fullWidth
                            required
                            style={{ marginBottom: '1rem' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: '20px', padding: '10px 20px' }}
                        >
                            Send Message
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={4} style={{ textAlign: 'center' }}>
                <Typography variant="h6" style={{ color: '#333' }}>
                    Other Ways to Reach Us
                </Typography>
                <Typography variant="body1" style={{ color: '#555' }}>
                    Email: <a href="mailto:support@dinedelight.com" style={{ color: '#007bff' }}>support@dinedelight.com</a>
                </Typography>
                <Typography variant="body1" style={{ color: '#555' }}>
                    Phone: <a href="tel:+11234567890" style={{ color: '#007bff' }}>(123) 456-7890</a>
                </Typography>
                <Typography variant="body1" style={{ color: '#555' }}>
                    Address: 123 Foodie Lane, Gourmet City, CA 90210
                </Typography>
            </Box>
        </Container>
    );
};

export default ContactUs;

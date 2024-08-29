// src/pages/FAQ.js
import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './faq.css'; // Import the CSS file

const FAQ = () => {
    return (
        <Container maxWidth="md" className="faq-container" style={{ "marginTop": "10vh" }}>
            <Typography variant="h4" gutterBottom className="faq-title">
                Frequently Asked Questions
            </Typography>
            <Accordion className="faq-item">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
                    <Typography variant="h6">What is Dine Delight?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Dine Delight is a platform that connects food enthusiasts with the best dining experiences in their area. Discover top restaurants, read reviews, and make reservations with ease.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className="faq-item">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
                    <Typography variant="h6">How do I make a reservation?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        To make a reservation, simply select the restaurant, choose your desired date and time, and complete the booking process through our website.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className="faq-item">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel3a-header">
                    <Typography variant="h6">What is the cancellation policy?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Cancellation policies vary by restaurant. Please review the specific restaurant's cancellation policy during the booking process for detailed information.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className="faq-item">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel4a-header">
                    <Typography variant="h6">How can I contact customer support?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        For customer support, please visit our Contact Us page or email us directly at <a href="mailto:dinedelight0fficial@gmail.com" className="faq-link">support@dinedelight.com</a>.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    );
};

export default FAQ;

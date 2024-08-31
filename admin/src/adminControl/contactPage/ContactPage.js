import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './contactPage.css';
const ContactPage = () => {
    const [messages, setMessages] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/contact');
                setMessages(response.data);
            } catch (error) {
                alert('An error occurred while fetching messages.');
            }
        };
        fetchMessages();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:4000/user/contact/approve/${id}`);
            setMessages(messages.map(msg => msg._id === id ? { ...msg, status: 'approved' } : msg));
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    const handleIgnore = async (id) => {
        try {
            await axios.put(`http://localhost:4000/user/contact/ignore/${id}`);
            setMessages(messages.map(msg => msg._id === id ? { ...msg, status: 'ignored' } : msg));
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/user/contact/${id}`);
            setMessages(messages.filter(msg => msg._id !== id));
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    const handleOpenDialog = (message) => {
        setSelectedMessage(message);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedMessage(null);
    };

    return (
        <>
            <Navbar />
            <Container className="contact-page">
                <Typography variant="h4" gutterBottom className="page-title">
                    Contact Messages
                </Typography>
                <Paper elevation={6} className="table-paper">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Message</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {messages.map((msg) => (
                                    <TableRow key={msg._id}>
                                        <TableCell>{msg.name}</TableCell>
                                        <TableCell>{msg.email}</TableCell>
                                        <TableCell>
                                            {msg.message.length > 50 ? (
                                                <>
                                                    {msg.message.slice(0, 50)}...
                                                    <Button onClick={() => handleOpenDialog(msg)} variant="text" color="primary">
                                                        More
                                                    </Button>
                                                </>
                                            ) : (
                                                msg.message
                                            )}
                                        </TableCell>
                                        <TableCell>{msg.status}</TableCell>
                                        <TableCell>
                                            {msg.status === 'pending' && (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleApprove(msg._id)}
                                                        style={{ marginRight: '8px' }}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => handleIgnore(msg._id)}
                                                    >
                                                        Ignore
                                                    </Button>
                                                </>
                                            )}
                                            {msg.status !== 'pending' && (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleDelete(msg._id)}
                                                        style={{ marginRight: '8px', marginTop: '8px' }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                {selectedMessage && (
                    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                        <DialogTitle>Full Message</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" style={{ wordWrap: 'break-word' }}>
                                {selectedMessage.message}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            {selectedMessage.status === 'pending' && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleApprove(selectedMessage._id)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleIgnore(selectedMessage._id)}
                                    >
                                        Ignore
                                    </Button>
                                </>
                            )}
                            <Button onClick={handleCloseDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default ContactPage;

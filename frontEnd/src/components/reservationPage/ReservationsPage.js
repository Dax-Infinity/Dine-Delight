import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import '../../components/reservationPage/reservationPage.css';  // Import the CSS file for styling
import moment from 'moment';  // Import moment.js for time formatting
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { API_URL } from '../constant/Constant';
import { useNavigate } from 'react-router-dom';

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentReservation, setCurrentReservation] = useState(null);
    const path = useNavigate();
    const fetchReservations = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/user/reservations`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }

            const data = await response.json();
            setReservations(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleEdit = (reservation) => {
        setCurrentReservation(reservation);
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setCurrentReservation(null);
    };

    const handleEditDialogSubmit = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/user/reservations/${currentReservation._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentReservation),
            });

            if (!response.ok) {
                throw new Error('Failed to update reservation');
            }

            fetchReservations();
            handleEditDialogClose();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/user/reservations/${currentReservation._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete reservation');
            }

            fetchReservations();
            handleDeleteDialogClose();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setCurrentReservation(null);
    };

    const handleOpenDeleteDialog = (reservation) => {
        setCurrentReservation(reservation);
        setOpenDeleteDialog(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentReservation({ ...currentReservation, [name]: value });
    };

    return (
        <>
            <Navbar />
            <Container className="reservations-page">
                <Typography variant="h4" gutterBottom className="page-title" style={{ 'textAlign': "left" }}>
                    My Reservations
                </Typography>
                <Paper elevation={6} className="table-paper">
                    <TableContainer style={{ "textAlign": "center" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="table-header">No.</TableCell>
                                    <TableCell className="table-header">Restaurant Name</TableCell>
                                    <TableCell className="table-header">Date</TableCell>
                                    <TableCell className="table-header">Time</TableCell>
                                    <TableCell className="table-header">Guests</TableCell>
                                    <TableCell className="table-header">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {error ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="error-cell">
                                            <Typography variant="body1" color="error">
                                                {error}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : reservations.length > 0 ? (
                                    reservations.map((reservation, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{reservation.restaurantName}</TableCell>
                                            <TableCell>{new Date(reservation.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{moment(reservation.time, 'HH:mm').format('hh:mm A')}</TableCell> {/* Format time here */}
                                            <TableCell>{reservation.persons}</TableCell>
                                            <TableCell style={{ "width": "200px" }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleEdit(reservation)}
                                                    className="action-button"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleOpenDeleteDialog(reservation)}
                                                    className="action-button"
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="no-reservations-cell">
                                            <Typography variant="body1">
                                                No reservations found. <span onClick={() => path('/')} style={{ "cursor": "pointer", "color": "#007BFF" }}>Add reservation</span>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                {/* Edit Dialog */}
                <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
                    <DialogTitle>Edit Reservation of {currentReservation?.restaurantName}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="name"
                            label="name"
                            type="text"
                            fullWidth
                            value={currentReservation?.name || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="date"
                            label="Date"
                            type="date"
                            fullWidth
                            value={currentReservation?.date || ''}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="time"
                            label="Time"
                            type="time"
                            fullWidth
                            value={currentReservation?.time || ''}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="persons"
                            label="Guests"
                            type="number"
                            fullWidth
                            value={currentReservation?.persons || ''}
                            onChange={handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleEditDialogSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                    <DialogTitle>Confirm Cancellation</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to cancel this reservation?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose} color="primary">
                            No
                        </Button>
                        <Button onClick={handleDelete} color="secondary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
            <Footer />
        </>
    );
};

export default ReservationsPage;

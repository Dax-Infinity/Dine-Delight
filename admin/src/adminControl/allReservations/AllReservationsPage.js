import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { API_URL } from '../../components/constant/Constant';
import "../allReservations/allReservationsPage.css";

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentReservation, setCurrentReservation] = useState(null);

    const fetchReservations = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/user/allreservations`, {
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

    // const handleEdit = (reservation) => {
    //     setCurrentReservation(reservation);
    //     setOpenEditDialog(true);
    // };

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
            <Container className="admin-page">
                <Typography variant="h4" gutterBottom className="page-title" style={{ 'textAlign': "center" }}>
                    Manage Reservations
                </Typography>
                <Paper elevation={6} className="table-paper">
                    <TableContainer style={{ "textAlign": "center" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="table-header">No.</TableCell>
                                    <TableCell className="table-header">Restaurant Name</TableCell>
                                    <TableCell className="table-header">Email</TableCell>
                                    <TableCell className="table-header">Date</TableCell>
                                    <TableCell className="table-header">Time</TableCell>
                                    <TableCell className="table-header">Persons</TableCell>
                                    <TableCell className="table-header">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {error ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="error-cell">
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
                                            <TableCell>{reservation.email}</TableCell>
                                            <TableCell>{reservation.date}</TableCell>
                                            <TableCell>{reservation.time}</TableCell>
                                            <TableCell>{reservation.persons}</TableCell>
                                            <TableCell style={{ "width": "100px" }}>
                                                {/* <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleEdit(reservation)}
                                                    className="action-button"
                                                >
                                                    Edit
                                                </Button> */}
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleOpenDeleteDialog(reservation)}
                                                    className="action-button"
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="no-data-cell">
                                            <Typography variant="body1">
                                                No reservations found.
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
                    <DialogTitle>Edit Reservation</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={currentReservation?.name || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={currentReservation?.email || ''}
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
                            label="Number of Persons"
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
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this reservation?
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

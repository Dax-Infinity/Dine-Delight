import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { API_URL } from '../../components/constant/Constant';
import { useNavigate } from 'react-router-dom';
import "../allRestaurants/allRestaurantPage.css";
const AdminPage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const navigate = useNavigate();

    const fetchRestaurants = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/user/hotelData`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
            }

            const data = await response.json();
            setRestaurants(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleEdit = (restaurant) => {
        setCurrentRestaurant(restaurant);
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setCurrentRestaurant(null);
    };

    const handleEditDialogSubmit = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/user/hotelData/${currentRestaurant._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentRestaurant),
            });

            if (!response.ok) {
                throw new Error('Failed to update restaurant');
            }

            fetchRestaurants();
            handleEditDialogClose();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/user/hotelData/${currentRestaurant._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete restaurant');
            }

            fetchRestaurants();
            handleDeleteDialogClose();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setCurrentRestaurant(null);
    };

    const handleOpenDeleteDialog = (restaurant) => {
        setCurrentRestaurant(restaurant);
        setOpenDeleteDialog(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentRestaurant({ ...currentRestaurant, [name]: value });
    };

    return (
        <>
            <Navbar />
            <Container className="admin-page">
                <Typography variant="h4" gutterBottom className="page-title" style={{ 'textAlign': "center", "marginTop": "5xvh" }}>
                    Manage Restaurants
                </Typography>
                <Paper elevation={6} className="table-paper">
                    <TableContainer style={{ "textAlign": "center" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="table-header">No.</TableCell>
                                    <TableCell className="table-header">Name</TableCell>
                                    <TableCell className="table-header">Cuisine</TableCell>
                                    <TableCell className="table-header">Address</TableCell>
                                    <TableCell className="table-header">City</TableCell>
                                    <TableCell className="table-header">Rating</TableCell>
                                    <TableCell className="table-header">Table left</TableCell>
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
                                ) : restaurants.length > 0 ? (
                                    restaurants.map((restaurant, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{restaurant.name}</TableCell>
                                            <TableCell>{restaurant.cuisine}</TableCell>
                                            <TableCell>{restaurant.address}</TableCell>
                                            <TableCell>{restaurant.city}</TableCell>
                                            <TableCell>{restaurant.rating}</TableCell>
                                            <TableCell>{restaurant.totalTables}</TableCell>
                                            <TableCell style={{ "width": "200px" }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleEdit(restaurant)}
                                                    className="action-button"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleOpenDeleteDialog(restaurant)}
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
                                                No restaurants found. <span onClick={() => navigate('/add-restaurant')} style={{ "cursor": "pointer", "color": "#007BFF" }}>Add a restaurant</span>
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
                    <DialogTitle>Edit Restaurant</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={currentRestaurant?.name || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="cuisine"
                            label="Cuisine"
                            type="text"
                            fullWidth
                            value={currentRestaurant?.cuisine || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="address"
                            label="Address"
                            type="text"
                            fullWidth
                            value={currentRestaurant?.address || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="city"
                            label="City"
                            type="text"
                            fullWidth
                            value={currentRestaurant?.city || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="rating"
                            label="Rating"
                            type="number"
                            fullWidth
                            value={currentRestaurant?.rating || ''}
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
                            Are you sure you want to delete this restaurant?
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

export default AdminPage;

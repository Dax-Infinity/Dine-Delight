import React, { useState } from 'react';
import {
    Container, Typography, Paper, Button, TextField, Grid, InputLabel, MenuItem, Select, FormControl,
} from '@mui/material';
import { API_URL } from '../../components/constant/Constant';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import '../addRestaurant/addRestaurantPage.css';

const AddRestaurantPage = () => {
    const [restaurantData, setRestaurantData] = useState({
        name: '',
        cuisine: '',
        address: '',
        city: '',
        rating: '',
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRestaurantData({ ...restaurantData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();

        for (let key in restaurantData) {
            formData.append(key, restaurantData[key]);
        }

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`${API_URL}/user/hotelData`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to add restaurant');
            }

            navigate('/admin');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <Container className="add-restaurant-page">
                <Typography variant="h4" gutterBottom className="page-title">
                    Add New Restaurant
                </Typography>
                <Paper elevation={6} className="form-paper">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="name"
                                    label="Restaurant Name"
                                    fullWidth
                                    value={restaurantData.name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Cuisine</InputLabel>
                                    <Select
                                        name="cuisine"
                                        value={restaurantData.cuisine}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Italian">Italian</MenuItem>
                                        <MenuItem value="Chinese">Chinese</MenuItem>
                                        <MenuItem value="Indian">Indian</MenuItem>
                                        <MenuItem value="Mexican">Mexican</MenuItem>
                                        {/* Add more cuisines as needed */}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="address"
                                    label="Address"
                                    fullWidth
                                    value={restaurantData.address}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="city"
                                    label="City"
                                    fullWidth
                                    value={restaurantData.city}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="rating"
                                    label="Rating"
                                    type="number"
                                    fullWidth
                                    inputProps={{ min: 0, max: 5, step: 0.1 }}
                                    value={restaurantData.rating}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    className="upload-button"
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>
                                {image && (
                                    <Typography variant="body1" className="image-name">
                                        {image.name}
                                    </Typography>
                                )}
                            </Grid>
                            {error && (
                                <Grid item xs={12}>
                                    <Typography color="error">{error}</Typography>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className="submit-button"
                                >
                                    Add Restaurant
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
            <Footer />
        </>
    );
};

export default AddRestaurantPage;

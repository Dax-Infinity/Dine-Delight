import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../constant/Constant";
import { useNavigate } from 'react-router-dom';

export default function RestaurantCards({ restaurant }) {
    const [open, setOpen] = useState(false);
    const path = useNavigate();
    const [info, setInfo] = useState({
        restaurantName: restaurant.name,
        name: '',
        email: '',
        date: '',
        time: '',
        persons: '',
    });

    useEffect(() => {
        const fetchEmail = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/user/get-email`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setInfo(prev => ({
                    ...prev,
                    email: response.data.email || ''
                }));
            } catch (error) {
                console.error('Error fetching email:', error.response ? error.response.data : error.message);
            }
        };

        fetchEmail();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const GetData = (e) => {
        const { name, value } = e.target;
        setInfo((pre) => ({
            ...pre,
            [name]: value,
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const toServer = async () => {
        if (info.name.trim() === "" || info.email.trim() === "" || info.date.trim() === "" || info.time.trim() === "" || info.persons.trim() === "") {
            return alert("Please fill all the fields");
        }

        if (!validateEmail(info.email)) {
            return alert("Please enter a valid email address");
        }

        if (parseInt(info.persons) <= 0) {
            return alert("Number of guests must be greater than 0");
        }

        try {
            await axios.post(`${API_URL}/user/reservation`, info);
            alert("Reservation Successful");
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
        }
        setInfo({
            restaurantName: restaurant.name,
            name: '',
            email: '',
            date: '',
            time: '',
            persons: '',
        });
        handleClose();
        path('/reservation');
    };

    return (
        <>
            <Card
                className='restaurant-card'
                sx={{
                    maxWidth: 305,
                    height: '450px',
                    marginBottom: 20,
                    padding: "2.5vh",
                    borderRadius: "2vh",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.3s ease-in-out',
                    ':hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    }
                }}
            >
                <div>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: "#313639" }} aria-label="restaurant">
                                {restaurant.name.charAt(0)}
                            </Avatar>
                        }
                        title={restaurant.name}
                        subheader={`Rating: ${restaurant.rating}`}
                    />
                    <CardMedia
                        style={{ width: '100%', borderRadius: "1vh" }}
                        component="img"
                        height="254"
                        image={`${API_URL}/${restaurant.image.replace(/\\/g, '/')}` ? `${API_URL}/${restaurant.image.replace(/\\/g, '/')}` : "loading..."}
                        alt={restaurant.name}
                    />
                </div>
                <div>
                    <CardActions>
                        <Typography variant="body2" color="text.secondary" style={{ "marginTop": "2vh" }}>
                            Cuisine : {restaurant.cuisine}
                        </Typography>
                    </CardActions>
                    <CardActions disableSpacing>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    noWrap
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {restaurant.address}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    style={{ marginTop: "-1vh" }}
                                    startIcon={<AddBoxOutlinedIcon color='primary' />}
                                    onClick={handleClickOpen}
                                >
                                    RESERVE
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </div>
            </Card>

            {/* Dialog for reservation form */}
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Book a Table for {restaurant.name}</DialogTitle>

                <DialogContent>
                    <form>
                        <TextField
                            onChange={GetData}
                            value={info.name}
                            autoFocus
                            name='name'
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            onChange={GetData}
                            value={info.email}
                            name="email"
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            onChange={GetData}
                            value={info.date}
                            name='date'
                            margin="dense"
                            id="date"
                            label="Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            inputProps={{
                                min: new Date().toISOString().split('T')[0] // Sets the minimum date to today
                            }}
                        />
                        <TextField
                            onChange={GetData}
                            value={info.time}
                            name='time'
                            margin="dense"
                            id="time"
                            label="Time"
                            type="time"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            onChange={GetData}
                            value={info.persons}
                            name='persons'
                            margin="dense"
                            id="guests"
                            label="Number of Guests"
                            type="number"
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                min: 1
                            }}
                        />
                    </form>
                    <h6 style={{ "marginTop": "2vh", "paddingLeft": "0.6vh" }}>Address : {restaurant.address}</h6>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={toServer} color="primary">
                        Book
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

import * as React from 'react';
import axios from 'axios';
import { Grid, Pagination, Typography } from '@mui/material';
import RestaurantCards from './RestaurantsCard';
import { API_URL } from '../constant/Constant';

export default function Cards({ location, cuisine, rating, searchBar, email }) {
    const [restaurants, setRestaurants] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const cardsPerPage = 8;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const query = new URLSearchParams({
                    location: location || '',
                    cuisine: cuisine || '',
                    rating: rating || '',
                    searchBar: searchBar || ''
                }).toString();

                const response = await axios.get(`${API_URL}/user/hotelData?${query}`);
                setRestaurants(response.data);
                setPage(1)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [location, cuisine, rating, searchBar]);

    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentCards = restaurants.slice(startIndex, endIndex);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            <Grid
                container
                className="restaurant-grid"
                rowSpacing={0}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                style={{ marginTop: '20vh', marginLeft: '1vh' }}
            >
                {currentCards.length > 0 ? (
                    currentCards.map((restaurant, index) => (
                        <Grid item xs={3} key={index} style={{ marginTop: '-15vh' }}>
                            <RestaurantCards restaurant={restaurant} email={email} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12} style={{ textAlign: 'center', marginTop: '-10vh' }}>
                        <Typography variant="h5" color="textSecondary">
                            No restaurants found.
                        </Typography>
                    </Grid>
                )}
            </Grid>
            {restaurants.length > 0 && (
                <Pagination
                    count={Math.ceil(restaurants.length / cardsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    style={{ marginTop: '-13vh', display: 'flex', justifyContent: 'center' }}
                />
            )}
        </div>
    );
}

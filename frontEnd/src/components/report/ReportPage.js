import React from 'react';
import { Container, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

// Keyframe animation for card hover effect
const hoverAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled card component with animation and shadow
const AnimatedCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.3s, box-shadow 0.3s',
    borderRadius: '10px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#ffffff',
    border: '1px solid #e0e0e0',
    boxShadow: theme.shadows[2],
    '&:hover': {
        animation: `${hoverAnimation} 0.5s ease-in-out`,
        boxShadow: theme.shadows[10],
        cursor: 'pointer',
        border: '1px solid #000',
    },
}));

const ReportPage = () => {
    // Static data for demonstration
    const upcomingEvents = [
        { id: 1, name: 'Exclusive Wine Pairing Dinner', date: '2024-09-15', time: '7:00 PM', description: 'Experience a special dinner with exclusive wine pairings curated by our sommelier.' },
        { id: 2, name: 'Chef\'s Table - Italian Cuisine', date: '2024-09-22', time: '6:00 PM', description: 'Join our chef for a unique dining experience featuring Italian specialties.' },
        { id: 3, name: 'Live Music and Dinner Night', date: '2024-09-25', time: '8:00 PM', description: 'Enjoy live music while dining on a special menu for the evening.' },
        { id: 4, name: 'Weekend Brunch Buffet', date: '2024-09-29', time: '10:00 AM', description: 'Indulge in a brunch buffet featuring a variety of dishes and fresh options.' },
        { id: 5, name: 'Mixology Masterclass', date: '2024-10-02', time: '6:00 PM', description: 'Learn to craft cocktails with our expert mixologists in this interactive class.' },
        { id: 6, name: 'Halloween Dinner Party', date: '2024-10-31', time: '9:00 PM', description: 'Celebrate Halloween with a themed dinner party and festive atmosphere.' },
    ];

    const offers = [
        { id: 1, title: '10% Off Your First Reservation', details: 'Enjoy 10% off your first reservation when you book through our app.', expiryDate: '2024-10-01' },
        { id: 2, title: 'Buy One Get One Free Appetizers', details: 'Order one appetizer and get another one free. Limited time offer!', expiryDate: '2024-09-30' },
        { id: 3, title: 'Free Dessert with Dinner', details: 'Receive a complimentary dessert with every dinner reservation.', expiryDate: '2024-09-28' },
        { id: 4, title: 'Kids Eat Free on Weekends', details: 'Kids eat free on weekends with a paying adult. Available for children under 12.', expiryDate: '2024-09-30' },
        { id: 5, title: 'Happy Hour - 50% Off Drinks', details: 'Get 50% off on selected drinks during our happy hour from 4 PM to 6 PM.', expiryDate: '2024-10-01' },
        { id: 6, title: 'Early Bird Special - 15% Off', details: 'Get 15% off when you book a table between 5 PM and 6 PM.', expiryDate: '2024-10-05' },
    ];

    const trendingDishes = [
        { id: 1, name: 'Signature Wagyu Burger', description: 'Our signature wagyu burger with all the premium toppings you love.', popularity: 'High' },
        { id: 2, name: 'Truffle Risotto', description: 'Creamy risotto infused with the rich flavor of truffles.', popularity: 'Medium' },
        { id: 3, name: 'Seafood Paella', description: 'A vibrant paella packed with fresh seafood and saffron rice.', popularity: 'High' },
        { id: 4, name: 'Vegan Buddha Bowl', description: 'A nutritious and flavorful vegan bowl with fresh vegetables and grains.', popularity: 'Medium' },
        { id: 5, name: 'Decadent Chocolate Fondant', description: 'A rich and gooey chocolate dessert that melts in your mouth.', popularity: 'High' },
        { id: 6, name: 'Crafted Artisan Pizzas', description: 'Handcrafted pizzas with unique toppings and artisanal crust.', popularity: 'High' },
    ];

    return (
        <>
            <Navbar />
            <Container>
                <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, color: '#333' }} style={{ "marginTop": "40px" }}>
                    Key Findings and Insights
                </Typography>

                <Box mb={4}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2, color: '#555' }}>
                        Upcoming Events
                    </Typography>
                    <Grid container spacing={3}>
                        {upcomingEvents.map((event) => (
                            <Grid item xs={12} sm={6} md={4} key={event.id}>
                                <AnimatedCard>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>{event.name}</Typography>
                                        <Typography variant="subtitle1" color="textSecondary">{event.date}</Typography>
                                        <Typography variant="subtitle2" color="textSecondary">{event.time}</Typography>
                                        <Typography variant="body2">{event.description}</Typography>
                                    </CardContent>
                                </AnimatedCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box mb={4}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2, color: '#555' }}>
                        Current Offers
                    </Typography>
                    <Grid container spacing={3}>
                        {offers.map((offer) => (
                            <Grid item xs={12} sm={6} md={4} key={offer.id}>
                                <AnimatedCard>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>{offer.title}</Typography>
                                        <Typography variant="body2">{offer.details}</Typography>
                                        <Typography variant="caption" color="textSecondary">{`Expires on: ${offer.expiryDate}`}</Typography>
                                    </CardContent>
                                </AnimatedCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box mb={4}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2, color: '#555' }}>
                        Trending Dishes
                    </Typography>
                    <Grid container spacing={3}>
                        {trendingDishes.map((dish) => (
                            <Grid item xs={12} sm={6} md={4} key={dish.id}>
                                <AnimatedCard>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>{dish.name}</Typography>
                                        <Typography variant="body2">{dish.description}</Typography>
                                        <Typography variant="caption" color="textSecondary">{`Popularity: ${dish.popularity}`}</Typography>
                                    </CardContent>
                                </AnimatedCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default ReportPage;

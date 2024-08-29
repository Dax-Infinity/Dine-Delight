import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import '../utilities/util.css'
import Cards from '../cards/Cards';
import { FaStar } from 'react-icons/fa';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Util() {

    const [location, setLocation] = useState('All');
    const [cuisine, setCuisine] = useState('All');
    const [rating, setRating] = useState(3);
    const [hover, setHover] = useState(null);
    const [searchBar, setSearchBar] = useState('');

    const handleLocation = (event) => {
        setLocation(event.target.value);
    };
    const handleCuisine = (event) => {
        setCuisine(event.target.value);
    };
    const handleRating = (event) => {
        setRating(event.target.value);
    };
    const handleSearch = (event) => {
        setSearchBar(event.target.value)
    }
    return (
        <>
            <div>
                <Button variant="contained" style={{ "float": "right", "marginTop": "5.5vh", "marginRight": "6vh", "backgroundColor": "#007BFF" }}><SearchIcon /></Button>
                <TextField id="outlined-basic" label="Search" variant="standard" style={{ "float": "right", "marginRight": "2vh", "marginTop": "4vh", "paddingBottom": "3vh" }} onChange={handleSearch} />
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 25 }} style={{ "marginTop": "14vh" }}>
                <Grid item xs={4}>

                    <div className='util_content_1'>
                        <FormControl sx={{ m: 1, minWidth: 110 }} >
                            <InputLabel id="demo-simple-select-autowidth-label">Location</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={location}
                                onChange={handleLocation}
                                autoWidth
                                label="Location"
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Mumbai">Mumbai</MenuItem>
                                <MenuItem value="Delhi">Delhi</MenuItem>
                                <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                                <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                                <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                                <MenuItem value="Chennai">Chennai</MenuItem>
                                <MenuItem value="Kolkata">Kolkata</MenuItem>
                                <MenuItem value="Pune">Pune</MenuItem>
                                <MenuItem value="Jaipur">Jaipur</MenuItem>
                                <MenuItem value="Lucknow">Lucknow</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid item xs={4} style={{ "paddingLeft": "46vh" }}>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 110 }} >
                            <InputLabel id="demo-simple-select-autowidth-label">Cuisines</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={cuisine}
                                onChange={handleCuisine}
                                autoWidth
                                label="Cuisines"
                            >

                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Punjabi">Punjabi</MenuItem>
                                <MenuItem value="South Indian">South Indian</MenuItem>
                                <MenuItem value="Gujarati">Gujarati</MenuItem>
                                <MenuItem value="Rajasthani">Rajasthani</MenuItem>
                                <MenuItem value="Bengali">Bengali</MenuItem>
                                <MenuItem value="Mughlai">Mughlai</MenuItem>
                                <MenuItem value="Kashmiri">Kashmiri</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div>
                        <FormControl sx={{ m: 0, minWidth: 110 }} >
                            <InputLabel id="demo-simple-select-autowidth-label">Rating</InputLabel>
                            <Select
                                label="Rating"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={`${rating}`}
                                onChange={handleRating}
                                inputProps={{ readOnly: true }}
                            >
                                <MenuItem value={rating} >
                                    <div className="App">
                                        {[...Array(5)].map((star, index) => {
                                            const currentRating = index + 1;
                                            return (
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        value={currentRating}
                                                        onClick={() => setRating(currentRating)}
                                                    />
                                                    <FaStar
                                                        className="star"
                                                        size={50}
                                                        color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                        onMouseEnter={() => setHover(currentRating)}
                                                        onMouseLeave={() => setHover(null)}
                                                    />
                                                </label>
                                            );
                                        })}
                                    </div>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
            </Grid>
            <Cards location={location} cuisine={cuisine} rating={rating} searchBar={searchBar} />

        </>
    )
}

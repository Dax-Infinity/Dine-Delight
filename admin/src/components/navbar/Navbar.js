import '../navbar/navbar.css';
import logo from "../../images/logo.png"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const path = useNavigate();
    const token = window.localStorage.getItem("token")

    const logOut = () => {
        window.localStorage.clear();
        path("/login")
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo"><img src={logo} alt="logo" onClick={() => path("/")} /></div>
                <ul className="navbar-items">
                    <li className="navbar-item" onClick={() => path("/")}>Home</li>
                    <li className="navbar-item" onClick={() => path("/admin/add-restaurant")}>Add Restaurant</li>
                    <li className="navbar-item" onClick={() => path("/admin/all-restaurants")}>Restaurants</li>
                    <li className="navbar-item" onClick={() => path("/admin/contact")}>Contact</li>
                    <li className="navbar-item" onClick={() => path("/admin/all-reservations")}>Reservations</li>
                    <li className="navbar-item" onClick={() => path("/admin/all-users")}>Users</li>
                    {token ? <Button variant="contained" onClick={logOut} style={{ "backgroundColor": "#007BFF" }}>Logout</Button> :
                        <Button variant="contained" onClick={() => path("/login")} style={{ "backgroundColor": "#007BFF" }}>Login</Button>}

                </ul>
            </nav>
        </>
    );
};

export default Navbar;

import '../navbar/navbar.css';
import logo from "../../images/logo.png"
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const NavForLogin = () => {
    const path = useNavigate();

    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo"><img src={logo} alt="logo" onClick={() => path("/")} /></div>
                <ul className="navbar-items">
                    <li className="navbar-item" onClick={() => path("/login")}><Button variant="contained" style={{ "backgroundColor": "#007BFF" }}>Login</Button></li>
                    <li className="navbar-item" onClick={() => path("/register")}><Button variant="contained" style={{ "backgroundColor": "#007BFF" }}>SignUp  </Button></li>
                </ul>
            </nav>
        </>
    );
};

export default NavForLogin;

import React, {useState} from 'react';
import {Box} from '@mui/material';

function Menu({logo}) {
    const [open, setOpen] = useState(false);
    const toggleMenu = () => setOpen(o => !o);

    return (
     <Box className="navbar">
       <Box component="nav" className="nav-container">
            <div className="logo">
                <img src={logo} alt="Airplane Logo" className="nav-logo"/>
                <a href="index.html" className="logo-text">Fly With Us</a>
            </div>

            <div className={"hamburger" + (open ? ' open' : '')} onClick={toggleMenu} role="button" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={"nav-links" + (open ? ' open' : '')} id="navLinks">
                <a href="index.html#hero">Kryefaqja</a>
                <a href="index.html#booking">Rezervo</a>
                <a href="index.html#destinations">Destinacionet</a>
                <a href="about.html">Rreth Nesh</a>
                <a href="#about-form-box">Login / Regjistrohu</a>
                <a href="contact.html">Kontakti</a>
                <a href="faq.html">FAQ</a>
            </div>
       </Box>
     </Box>
    )
}

export default Menu;

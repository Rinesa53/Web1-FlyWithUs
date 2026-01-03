import React from 'react';
function Menu({logo}) {
    return (
     <nav class="navbar">
            <div class="logo">
                <img src={logo} alt="Airplane Logo" class="nav-logo"/>
                <a href="index.html" class="logo-text">Fly With Us</a>
            </div>
    
            <div class="hamburger" onclick="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="nav-links" id="navLinks">
                <a href="index.html#hero">Kryefaqja</a>
                <a href="index.html#booking">Rezervo</a>
                <a href="index.html#destinations">Destinacionet</a>
                <a href="about.html">Rreth Nesh</a>
                <a href="#about-form-box">Login / Regjistrohu</a>
                <a href="contact.html">Kontakti</a>
                <a href="faq.html">FAQ</a>
            </div>
        </nav>
)
}
export default Menu;

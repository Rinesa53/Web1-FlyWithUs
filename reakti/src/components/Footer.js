import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <p>© {year} Fly With Us. Të gjitha të drejtat e rezervuara.</p>

      <p className="sub-footer">
        <a href="/">Privacy Policy</a> | 
        <a href="/"> Terms & Conditions</a>
      </p>
    </footer>
  );
}

export default Footer;
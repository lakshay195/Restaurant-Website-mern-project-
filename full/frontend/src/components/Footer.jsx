import React from "react";

const Footer = () => {
  return (
      <footer className="footer">
        <div className="container">
            <p>&copy; 2024 Delicious Eats</p>
            <div>
                <a href="#">Contact Us</a> |
                <a href="#">Locations</a> |
                <a href="#">Privacy Policy</a> |
                <a href="#">Terms of Service</a>
            </div>
            <div className="social-icons mt-3">
                <a href="#"><img src="facebook.png" alt="Facebook" /></a>
                <a href="#"><img src="instagram.png" alt="Instagram" /></a>
            </div>
        </div>
    </footer>
   
  );
};

export default Footer;
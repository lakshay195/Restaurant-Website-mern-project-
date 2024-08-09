import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <h1>Delicious Eats</h1>
                <nav className="nav justify-content-center">
                    <a href="/" className="nav-link">HOME</a>
                    <a href="Menu" className="nav-link">MENU</a>
                    <a href="/" className="nav-link">SERVICES</a>
                    <a href="/" className="nav-link">TEAM</a>
                    <a href="/" className="nav-link">RESERVATION</a>
                    
                </nav>
            </div>
        </header>
    );
}

export default Header;

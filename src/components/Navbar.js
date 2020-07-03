import React from 'react';
import {Link } from 'react-router-dom';

const Navbar = () => {

    const handleActive = () => {
        document.getElementById('sidebar').classList.add('active');
        document.getElementById('overlay').classList.add('active');
    }
    
    return (
        <nav className="navbar navbar-dark bg-dark">
            <button className="navbar-toggler" onClick={handleActive}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <h4 className="ml-auto">
                <a className="navbar-brand" href="#">NavBar</a>
            </h4>
        </nav>
    )
}

export default Navbar
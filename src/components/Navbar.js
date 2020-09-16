import React from 'react';
import {Link} from 'react-router-dom';

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
                <Link className="navbar-brand" to="/">Energia electrica</Link>
            </h4>
        </nav>
    )
}

export default Navbar
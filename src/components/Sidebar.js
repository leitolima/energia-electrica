import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => {
    const handleDismiss = () => {
        document.getElementById("sidebar").classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    }

    return (
        <>
        <nav id="sidebar" className="bg-dark">
            <div className="sidebar-header">
                <h3>Dashboard</h3>
            </div>

            <div className="divisor rainbow mb-2"></div>
            
            <button id="dismiss" onClick={handleDismiss}>
                <i className="fas fa-arrow-left"></i>
            </button>

            <ul className="nav flex-column">
                <li className="nav-item d-flex flex-column">
                    <div className="d-flex flex-row">
                        <div className="icon-box">
                            <i className="fas fa-user-tie"></i>
                        </div>
                        <h5 className="sec-nav" data-collapse="personasList">Personas</h5>
                    </div>
                    <ul className="d-none" id="personasList">
                        <li>
                            <Link to="/personas/empleados">Empleados</Link>
                        </li>
                        <li>
                            <Link to="/personas/usuarios">Usuarios</Link>
                        </li>
                    </ul>
                </li>
                <div className="divisor rainbow my-2"></div>
                <li className="nav-item d-flex flex-column">
                    <div className="d-flex d-row">
                        <div className="icon-box">
                            <i className="fas fa-industry"></i>
                        </div>
                        <h5 className="sec-nav" data-collapse="centralesList">Centrales</h5>
                    </div>
                    <ul className="d-none" id="centralesList">
                        <li>
                            <Link to="/centrales/solares">Solar</Link>
                        </li>
                        <li>
                            <Link to="/centrales/hidroelectrica">Hidroeléctrica</Link>
                        </li>
                        <li>
                            <Link to="/centrales/termica">Térmica</Link>
                        </li>
                        <li>
                            <Link to="/centrales/nuclear">Nuclear</Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-item d-flex flex-column">
                    <div className="d-flex flex-row">
                        <div className="icon-box">
                            <i className="fab fa-playstation"></i>
                        </div>
                        <h5 className="sec-nav" data-collapse="estacionesList">Estaciones</h5>
                    </div>
                    <ul className="d-none" id="estacionesList">
                        <li>
                            <Link to="/estaciones/primarias">Primarias</Link>
                        </li>
                        <li>
                            <Link to="/estaciones/secundarias">Secundarias</Link>
                        </li>
                    </ul>
                </li>
                <div className="divisor rainbow my-2"></div>        
                <li className="nav-item d-flex flex-row">
                    <div className="icon-box">
                        <i className="fas fa-bolt"></i>
                    </div>
                    <h5>
                        <Link to="/redes">Redes</Link>
                    </h5>
                </li>           
                <li className="nav-item d-flex flex-row">
                    <div className="icon-box">
                        <i className="fas fa-plug"></i>
                    </div>
                    <h5>
                        <Link to="/lineas">Lineas</Link>
                    </h5>
                </li>
                <li className="nav-item d-flex flex-row">
                    <div className="icon-box">
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <h5>
                        <Link to="/transformadores">Transformadores</Link>
                    </h5>
                </li>
                <li className="nav-item d-flex flex-row">
                    <div className="icon-box">
                        <i className="fas fa-building"></i>
                    </div>
                    <h5>
                        <Link to="/companias">Compañias</Link>
                    </h5>
                </li>
                <div className="divisor rainbow my-2"></div>
                <li className="nav-item d-flex flex-row">
                    <div className="icon-box">
                        <i className="fas fa-question-circle"></i>
                    </div>
                    <h5>
                        <Link to="/">Ayuda</Link>
                    </h5>
                </li>
                <li className="nav-item d-flex flex-row">
                    <div className="icon-box">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                    <h5>
                        <Link to="/">Logout</Link>
                    </h5>
                </li>
            </ul>
        </nav>

        <div id="overlay" onClick={handleDismiss}></div>
        </>
    )
}
export default Sidebar
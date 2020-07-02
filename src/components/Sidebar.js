import React from 'react';

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
                <li className="nav-item">
                    <h5><a className="nav-link" href="#">Empleados</a></h5>
                    <ul>
                        <li>Usuarios</li>
                    </ul>
                </li>
                <li className="nav-item">
                    <h5><a className="nav-link" href="#"></a></h5>
                </li>
                <div className="divisor rainbow my-2"></div>
                <li className="nav-item">
                    <h5><a className="nav-link" href="#">Centrales</a></h5>
                    <ul>
                        <li>Solar</li>
                        <li>Hidroeléctrica</li>
                        <li>Térmica</li>
                        <li>Nuclear</li>
                    </ul>
                </li>
                <li className="nav-item">
                    <h5><a className="nav-link" href="#">Estaciones</a></h5>
                    <ul>
                        <li>Primarias</li>
                        <li>Secundarias</li>
                    </ul>
                </li>
                <div className="divisor rainbow my-2"></div>
                <li className="nav-item">
                    <h5><a className="nav-link" href="#">Redes</a></h5>
                </li>
                <li className="nav-item">
                    <h5><a className="nav-link" href="#">Lineas</a></h5>
                </li>
                <li className="nav-item">
                    <h5><a className="nav-link" href="#">Transformadores</a></h5>
                </li>
                <li className="nav-item">
                    <h5><a className="nav-link" href="#">Compañias</a></h5>
                </li>
                <div className="divisor rainbow my-2"></div>
                <li className="nav-item">
                    <h5><a className="nav-link" href="#">Ayuda</a></h5>
                </li>
                <li className="nav-item">
                    <h5><a className="nav-link" href="#">Logout</a></h5>
                </li>
            </ul>
        </nav>

        <div id="overlay" onClick={handleDismiss}></div>
        </>
    )
}
export default Sidebar
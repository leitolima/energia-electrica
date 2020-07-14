import React,{useState,useEffect}  from 'react';

import ModalUsuario from '../../components/modals/ModalUsuario';



const Usuarios = () => {

    const[show, setShow] = useState(false);

    const[usuario, setUsuario] = useState({
        usuario: '',
        id: '',
        genero: '',
        empleado: '',
        activo: ''
    });

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Administrar permisos</h2>
                <button 
                    type="button"
                    className="btn btn-success"
                    onClick={handleOpen}
                >Agregar nuevo</button>
            </div>
            <div className="fixed-head w-100 mt-4">
                <table className="table table-striped">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="options">Opciones</th>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Nivel</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                                <button className="btn btn-success btn-icon" title="Accesos"><i className="fab fa-windows"></i></button>
                            </td>
                            <td>Leonel Lima</td>
                            <td>leytholima</td>
                            <td>Administrador</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                                <button className="btn btn-success btn-icon" title="Accesos"><i className="fab fa-windows"></i></button>
                            </td>
                            <td>Susana Horia</td>
                            <td>susanahoria</td>
                            <td>Empleado</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                                <button className="btn btn-success btn-icon" title="Accesos"><i className="fab fa-windows"></i></button>
                            </td>
                            <td>Enzo Diaz</td>
                            <td>enzoxao</td>
                            <td>Administrador</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                                <button className="btn btn-success btn-icon" title="Accesos"><i className="fab fa-windows"></i></button>
                            </td>
                            <td>Homero Simpson</td>
                            <td>homerosimpson</td>
                            <td>Supervisor</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                                <button className="btn btn-success btn-icon" title="Accesos"><i className="fab fa-windows"></i></button>
                            </td>
                            <td>Cosme Fulanito</td>
                            <td>cosmefulanito</td>
                            <td>Empleado</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                                <button className="btn btn-success btn-icon" title="Accesos"><i className="fab fa-windows"></i></button>
                            </td>
                            <td>Martin Garrix</td>
                            <td>martingarrix</td>
                            <td>Empleado</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ModalUsuario
                show={show}
                usuario={usuario}
                handleClose={handleClose}
                handleChange={handleChange}
                //handleSubmit={handleEditarCompleto}
            />
        </div>
        
    )
}

export default Usuarios

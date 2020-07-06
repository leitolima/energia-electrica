import React from 'react';
import Swal from 'sweetalert2';

const Empleados = () => {
    const lanzarAlerta = () =>{
        Swal.fire({
            title: '¿Estas seguro de eliminar el usuario?',
            text: "Esta accion no puede ser revertida",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: 'Accion exitosa',
                    text: 'Usuario agregado correctamente'
                })
            }
        })
    }
    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Administrar empleados</h2>
                <button className="btn btn-success" onClick={lanzarAlerta}>Agregar nuevo</button>
            </div>
            <div className="fixed-head w-100 mt-4">
                <table className="table table-striped">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="options">Opciones</th>
                            <th>Nombre</th>
                            <th>Fecha nacimiento</th>
                            <th>Correo electrónico</th>
                            <th>Telefono</th>
                            <th>Central</th>
                            <th>Nivel</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>Leonel Lima</td><td>02/09/1999</td><td>leonel_lima19@hotmail.com</td><td>336419919</td><td>Enel Generación Costanera</td><td>Administrador</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>Susana Horia</td><td>18/01/1991</td><td>suhoria@hotmail.com</td><td>3364432181</td><td>Enel Generación Costanera</td><td>Empleado</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>Enzo Diaz</td><td>05/11/1999</td><td>enzodiaz@hotmail.com</td><td>3364582767</td><td>AES Argentina</td><td>Administrador</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>Homero Simpson</td><td>12/12/1989</td><td>homerjsimpson@hotmail.com</td><td>3364132517</td><td>AES Argentina</td><td>Supervisor</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>Cosme Fulanito</td><td>04/06/1999</td><td>fulanito@hotmail.com</td><td>3364532717</td><td>AES Argentina</td><td>Empleado</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>Martin Garrix</td><td>27/03/1994</td><td>ngarrix@hotmail.com</td><td>3364592214</td><td>AES Argentina</td><td>Empleado</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>Martin Garrix</td><td>27/03/1994</td><td>ngarrix@hotmail.com</td><td>3364592214</td><td>AES Argentina</td><td>Empleado</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>Martin Garrix</td><td>27/03/1994</td><td>ngarrix@hotmail.com</td><td>3364592214</td><td>AES Argentina</td><td>Empleado</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>Martin Garrix</td><td>27/03/1994</td><td>ngarrix@hotmail.com</td><td>3364592214</td><td>AES Argentina</td><td>Empleado</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>Martin Garrix</td><td>27/03/1994</td><td>ngarrix@hotmail.com</td><td>3364592214</td><td>AES Argentina</td><td>Empleado</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>Martin Garrix</td><td>27/03/1994</td><td>ngarrix@hotmail.com</td><td>3364592214</td><td>AES Argentina</td><td>Empleado</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Empleados

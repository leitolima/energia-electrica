import React from 'react';

const Redes = () => {
    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Redes</h2>
                <button className="btn btn-success">Agregar nueva</button>
            </div>
            <div className="fixed-head w-100 mt-4">
                <table className="table table-hover mt-5">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="options text-center">Actions</th>
                            <th>Id. Red</th>
                            <th>Estación</th>
                            <th>Compañías</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>1</td>
                            <td>32</td>
                            <td>EDEN</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>2</td>
                            <td>15</td>
                            <td>AES</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>3</td>
                            <td>12</td>
                            <td>TRANSBA</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>4</td>
                            <td>23</td>
                            <td>EDENOR</td>
                        </tr>      
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Redes
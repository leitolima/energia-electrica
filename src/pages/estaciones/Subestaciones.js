import React from 'react';

const Subestaciones = () => {
    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Subestaciones</h2>
                <button className="btn btn-success">Agregar nueva</button>
            </div>
                <table className="table table-hover">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="options text-center">Actions</th>
                            <th>Id.Subestación</th>
                            <th>Id.Linea</th>
                            <th>Cod. Postal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>2</td>
                            <td>56215424</td>
                            <td>S2900</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>1</td>
                            <td>12154312</td>
                            <td>S2919</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>3</td>
                            <td>32134124</td>
                            <td>S2915</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>5</td>
                            <td>42141672</td>
                            <td>B1900</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>4</td>
                            <td>13456312</td>
                            <td>B7600</td>
                        </tr> 
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>6</td>
                            <td>32790012</td>
                            <td>S2901</td>
                        </tr>     
                    </tbody>
                </table>
        </div>
    );
}

export default Subestaciones
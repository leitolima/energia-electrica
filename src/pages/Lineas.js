import React, {useState}  from 'react';
import ModalLineas from '../components/modals/ModalLineas';

const Lineas = () => {
    
    const[show, setShow] = useState(false);

    const[linea, setLinea] = useState({
        idLinea: '',
        idRed: '',
        longitud: ''
    });

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleChange = e => {
        setLinea({
            ...linea,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Lineas</h2>
                <button 
                    type="button"
                    className="btn btn-success"
                    onClick={handleOpen}
                >Agregar nuevo</button>
            </div>
            <div className="fixed-head w-100 mt-4">
                <table className="table table-hover">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="options text-center">Actions</th>
                            <th>Id.Linea</th>
                            <th>Id. Red</th>
                            <th>Longitud</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>56215424</td>
                            <td>2</td>
                            <td>90 M</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>12154312</td>
                            <td>1</td>
                            <td>50 M</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>32134124</td>
                            <td>4</td>
                            <td>85 M</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>42141672</td>
                            <td>2</td>
                            <td>60 M</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>13456312</td>
                            <td>3</td>
                            <td>30 M</td>
                        </tr> 
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>32790012</td>
                            <td>2</td>
                            <td>60 M</td>
                        </tr>     
                    </tbody>
                </table>
            </div>
            <ModalLineas
                show={show}
                linea={linea}
                handleClose={handleClose}
                handleChange={handleChange}
                //handleSubmit={handleEditarCompleto}
            />
        </div>
    );
}

export default Lineas
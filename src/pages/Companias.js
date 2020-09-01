import React,{useState,useEffect}  from 'react';
import ModalCompanias from '../components/modals/ModalCompanias';

const Companias = () => {

    const[show, setShow] = useState(false);

    const[compania, setCompania] = useState({
        nomComp: '',
        idRed: ''
    });

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleChange = e => {
        setCompania({
            ...compania,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Compañias</h2>
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
                            <th>Nombre</th>
                            <th>Id.Red</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>EDEN</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>AES</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>TRANSBA</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                            </td>
                            <td>EDENOR</td>
                            <td>4</td>
                        </tr>      
                    </tbody>
                </table>
            </div>
            <ModalCompanias
                show={show}
                compania={compania}
                handleClose={handleClose}
                handleChange={handleChange}
                //handleSubmit={handleEditarCompleto}
            />
        </div>
    );
}

export default Companias
import React,{useState,useEffect}  from 'react';
import ModalRedes from '../components/modals/ModalRedes';
const Redes = () => {
    const[show, setShow] = useState(false);

    const[red, setRed] = useState({
        idRed: '',
        estacion: '',
        compania: ''
    });

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleChange = e => {
        setRed({
            ...red,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Redes</h2>
                <button 
                    type="button"
                    className="btn btn-success"
                    onClick={handleOpen}
                >Agregar nuevo</button>
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
            <ModalRedes
                show={show}
                red={red}
                handleClose={handleClose}
                handleChange={handleChange}
                //handleSubmit={handleEditarCompleto}
            />
        </div>
    );
}

export default Redes
import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';

//Functions
import {
    buscarTodosLosRegistros
} from '../../functions';

const ModalEmpleado = ({show, empleado, handleClose, handleChange, handleSubmit}) => {

    const[centrales, setCentrales] = useState([]);

    useEffect(() => {
        buscarTodosLosRegistros('/centrales/get/all', setCentrales);
        // eslint-disable-next-line
    }, [show])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar empleado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre del empleado: </label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    id="nombre"
                                    onChange={handleChange}
                                    value={empleado.nombre}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="dni">DNI: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="dni"
                                    onChange={handleChange}
                                    value={empleado.dni}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="fecha">Fecha de nacimiento: </label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="fecha"
                                    onChange={handleChange}
                                    value={empleado.fecha_nac}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="central">Central</label>
                                <select 
                                    id="central"
                                    onChange={handleChange} 
                                    defaultValue={empleado.central} 
                                    className="form-control"
                                >
                                    <option value="0">Seleccionar</option>
                                    {
                                        centrales.map((e, key) => {
                                            return(
                                                <option key={key} value={e.id}>{e.nombre}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="email"
                                    onChange={handleChange}
                                    value={empleado.email}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="telefono"
                                    onChange={handleChange}
                                    value={empleado.telefono}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={handleClose}
                >Cancelar</button>
                <button 
                    type="button"
                    className="btn btn-success"
                    onClick={handleSubmit}
                >Guardar cambios</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEmpleado
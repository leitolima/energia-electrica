import React from 'react';
import {Modal} from 'react-bootstrap';

const ModalLineas = ({show, linea, handleClose, handleChange, handleSubmit}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar compañía</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="usuario">Id.Linea: </label>
                                <input
                                    type="number" 
                                    className="form-control" 
                                    id="idlinea"
                                    onChange={handleChange}
                                    value={linea.nombre}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="clave">Id.Red: </label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="idred"
                                    onChange={handleChange}
                                    value={linea.autor}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="clave">Longitud: </label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="longitud"
                                    onChange={handleChange}
                                    value={linea.autor}
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

export default ModalLineas
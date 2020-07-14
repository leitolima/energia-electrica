import React from 'react';
import {Modal} from 'react-bootstrap';

const ModalLineas = ({show, red, handleClose, handleChange, handleSubmit}) => {
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
                                <label htmlFor="usuario">Id.Red: </label>
                                <input
                                    type="number" 
                                    className="form-control" 
                                    id="idred"
                                    onChange={handleChange}
                                    value={red.idRed}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="clave">Estación: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="estacion"
                                    onChange={handleChange}
                                    value={red.estacion}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="clave">Compañías: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nomCom"
                                    onChange={handleChange}
                                    value={red.companias}
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
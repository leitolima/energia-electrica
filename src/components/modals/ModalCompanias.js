import React from 'react';
import {Modal} from 'react-bootstrap';

const ModalCompanias = ({show, compania, handleClose, handleChange, handleSubmit}) => {
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
                                <label htmlFor="usuario">Nombre de la compañía: </label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    id="nomComp"
                                    onChange={handleChange}
                                    value={compania.nombreCom}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="clave">Id. de la red: </label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="clave"
                                    onChange={handleChange}
                                    value={compania.red}
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

export default ModalCompanias
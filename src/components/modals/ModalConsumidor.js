import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';

const ModalConsumidor = ({show, consumidor, handleClose, handleChange, handleSubmit}) => {
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
                                <label htmlFor="provincia">Provincia: </label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    id="provincia"
                                    disabled
                                    value={consumidor.provincia}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="zona">Zona: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="zona"
                                    disabled
                                    value={consumidor.nombre}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="particulares">Particulares: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="particulares"
                                    onChange={handleChange}
                                    value={consumidor.particulares}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="empresas">Empresas: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="empresas"
                                    onChange={handleChange}
                                    value={consumidor.empresas}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="instituciones">Instituciones: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="instituciones"
                                    onChange={handleChange}
                                    value={consumidor.instituciones}
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

export default ModalConsumidor

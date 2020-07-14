import React from 'react';
import {Modal} from 'react-bootstrap';

const ModalUsuario = ({show, usuario, handleClose, handleChange, handleSubmit}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="usuario">Nombre de usuario: </label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    id="usuario"
                                    onChange={handleChange}
                                    value={usuario.nombre}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="clave">Clave: </label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="clave"
                                    onChange={handleChange}
                                    value={usuario.clave}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                            <label htmlFor="empleado">Empleado</label>
                                <select id="empleado" className="form-control">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="activo">Estado</label>
                                <select id="activo" disabled className="form-control">
                                    <option defaultValue value="1">Activo</option>
                                    <option value="0">No activo</option>
                                </select>
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

export default ModalUsuario
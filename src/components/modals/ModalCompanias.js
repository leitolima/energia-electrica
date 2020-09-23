import React from 'react';
import {Modal} from 'react-bootstrap';

const ModalCompanias = ({show, compania, handleClose, handleChange, handleSubmit}) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar compañia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre de la compañia: </label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    id="nombre"
                                    onChange={handleChange}
                                    value={compania.nombre}
                                />
                            </div>
                        </div>
                        {/*
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="idred">Id. Red: </label>
                                <select 
                                    className="form-control" 
                                    id="idred"
                                    onChange={handleChange}
                                >
                                    <option value="0">Selectionar</option>
                                    {
                                        companias.map((p, key)=>{
                                            return(
                                                <option key={key} value={p.id}>{p.nombre}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        */}
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
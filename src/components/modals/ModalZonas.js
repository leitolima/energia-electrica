import React from 'react';
import {Modal} from 'react-bootstrap';

const ModalZonas = ({show, zona, handleClose, handleChange, handleSubmit, provincias}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Zona de servicio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre: </label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    id="nombre"
                                    onChange={handleChange}
                                    value={zona.nombre}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="idprovincia">Provincia</label>
                                <select 
                                    className="form-control" 
                                    id="idprovincia"
                                    onChange={handleChange}
                                    value={zona.idprovincia}
                                >
                                    <option value="0">Seleccionar</option>
                                    {
                                        provincias.map((p, key)=>{
                                            return(
                                                <option key={key} value={p.id}>{p.nombre}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12 mb-3">
                            <h5 className="text-dark">Consumidores</h5>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="particulares">Particulares</label>
                                <input
                                    type="number" 
                                    className="form-control" 
                                    id="particulares"
                                    onChange={handleChange}
                                    value={zona.particulares}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="empresas">Empresas</label>
                                <input
                                    type="number" 
                                    className="form-control" 
                                    id="empresas"
                                    onChange={handleChange}
                                    value={zona.empresas}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="instituciones">Instituciones</label>
                                <input
                                    type="number" 
                                    className="form-control" 
                                    id="instituciones"
                                    onChange={handleChange}
                                    value={zona.instituciones}
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

export default ModalZonas
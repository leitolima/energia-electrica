import React from 'react';
import {Modal} from 'react-bootstrap';

const ModalSolar = ({show, central, handleClose, handleChange, handleSubmit}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar central solar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre de la central: </label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    id="nombre"
                                    onChange={handleChange}
                                    value={central.nombre}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="fecha">Fecha de fundacion</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="fecha"
                                    onChange={handleChange}
                                    value={central.fecha}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="prod_media">Producción media (Kw): </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="prod_media"
                                    onChange={handleChange}
                                    value={central.prod_media}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="prod_max">Producción máxima (Kw): </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="prod_max"
                                    onChange={handleChange}
                                    value={central.prod_max}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="sup_paneles">Superficie de paneles (m^2): </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="sup_paneles"
                                    onChange={handleChange}
                                    value={central.sup_paneles}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="hs_sol">Media HS de sol: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="hs_sol"
                                    onChange={handleChange}
                                    value={central.hs_sol}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="tipo_panel">Tipo: </label>
                                <select 
                                    type="text" 
                                    className="form-control" 
                                    id="tipo_panel"
                                    onChange={handleChange}
                                    value={central.tipo_panel}
                                >
                                    <option value="0">Seleccionar</option>
                                    <option value="1">Fotovoltaica</option>
                                    <option value="2">Termodinámica</option>
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

export default ModalSolar;
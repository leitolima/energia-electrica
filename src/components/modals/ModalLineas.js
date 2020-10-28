import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';

import {
    buscarTodosLosRegistros,

} from '../../functions';


import clientAxios from '../../config/clientAxios';

const ModalLineas = ({show, linea, handleClose, handleChange, handleSubmit}) => {
    const[redes, setRedes] = useState([]);

    useEffect(() =>{
        if(show){
            buscarTodosLosRegistros('/redes/get/all', setRedes)
        }
        // eslint-disable-next-line
    },[show]);
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Línea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="numero">Num de Red: </label>
                                <select 
                                    className="form-control" 
                                    id="numero"
                                    onChange={handleChange}
                                    value={linea.numero}
                                >
                                    <option value="0">Seleccionar</option>
                                    {
                                        redes.map((c, key)=>{
                                            return(
                                                <option key={key} value={c.numero}>{c.numero}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="longitud">Longitud: </label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="longitud"
                                    onChange={handleChange}
                                    value={linea.longitud}
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
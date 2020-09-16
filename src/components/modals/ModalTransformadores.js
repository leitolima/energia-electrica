import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';

import clientAxios from '../../config/clientAxios';

const ModalTransformadores = ({show, trafo, handleClose, handleChange, handleSubmit}) => {
    
    const[estaciones, setEstaciones] = useState([]);

    useEffect(() => {
        if(show){
            setEstaciones([]); //Precaucion
            const token = localStorage.getItem('token');
            clientAxios.get('/estaciones/get/all', {headers: {access:token}})
            .then(res => {
                if(res.data.length === 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'No hay estaciones disponibles',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Cerrar'
                    }).then((result) => handleClose());
                } else {
                    setEstaciones(res.data);
                }
            })
        }
        // eslint-disable-next-line
    }, [show])
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Transformador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="codigo">Código:</label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    id="codigo"
                                    onChange={handleChange}
                                    value={trafo.codigo}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="estacion">Empleado</label>
                                    <select 
                                        id="estacion"
                                        onChange={handleChange}  
                                        className="form-control"
                                        value={trafo.id_estacion_fk}
                                    >
                                        <option value="0">Seleccionar</option>
                                        {
                                            estaciones.map((e, key) => {
                                                return(
                                                    <option key={key} value={e.id}>{e.nombre}</option>
                                                )
                                            })
                                        }
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

export default ModalTransformadores
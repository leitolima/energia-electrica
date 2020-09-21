import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';

import clientAxios from '../../config/clientAxios';

const ModalEstaciones = ({show, subestaciones, handleClose, handleChange, handleSubmit}) => {
    const[provincias, setProvincias] = useState([]);
    const[lineas, setLineas] = useState([]);

    const fetchData = (url, fn) => {
        const token = localStorage.getItem('token');
            clientAxios.post(url, {}, {headers: {access:token}})
            .then(res => {
                if(res.data.type === 'notfound'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'No hay provincias disponibles',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Cerrar'
                    }).then((result) => handleClose());
                }else {
                    fn(res.data);
                }
            })
    }

    useEffect(() =>{
        if(show){
            fetchData('/provincias/get/all', setProvincias);
            fetchData('/lineas/get/all', setLineas);
        }
        // eslint-disable-next-line
    },[show]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Subestacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                    <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="linea">Id Línea: </label>
                                <select 
                                    className="form-control" 
                                    id="linea"
                                    onChange={handleChange}
                                    value={subestaciones.linea}
                                >
                                    <option value="0">Seleccionar Línea</option>
                                    {
                                        lineas.map((l, key)=>{
                                            return(
                                                <option key={key} value={l.id}>{l.numero_red_sec}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="provincia">Ubicación: </label>
                                <select 
                                    className="form-control" 
                                    id="provincia"
                                    onChange={handleChange}
                                    value={subestaciones.provincia}
                                >
                                    <option value="0">Seleccionar provincia</option>
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

export default ModalEstaciones
import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';

import clientAxios from '../../config/clientAxios';

const ModalPropietarioRed = ({show, propietario, idred, handleClose, handleChange, handleSubmit}) => {

    const[propietarios, setPropietarios] = useState([]);

    useEffect(() =>{
        if(show){
            const token = localStorage.getItem('token');
            clientAxios.get(`/compania/get/notpropietarias/${idred}`, {headers: {access:token}})
            .then(res => {
                if(res.data.length === 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'No hay compañias disponibles',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Cerrar'
                    }).then((result) => handleClose());
                }else {
                    setPropietarios(res.data);
                }
            })
        }
        // eslint-disable-next-line
    },[show])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Red</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="compania">Compañia: </label>
                                <select 
                                    className="form-control" 
                                    id="compania"
                                    value={propietario.compania}
                                    onChange={handleChange}
                                >
                                    <option value="0">Seleccionar</option>
                                    {
                                            propietarios.map((p, key) => {
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

export default ModalPropietarioRed

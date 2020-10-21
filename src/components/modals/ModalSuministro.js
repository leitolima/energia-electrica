//PROBLEMAS: SELECT transportista, cantidad de plutonio tanto en compra como en los sumnistros. Una vez solucionado el tema del plutonio habilitar las validaciones

import React, {useState,useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';

import clientAxios from '../../config/clientAxios';

const ModalSuministro = ({show, suministro, handleClose, handleChange, handleSubmit}) => {

    const[nuclear, setNuclear] = useState([]);
    const[stransportista, setTransportista] = useState([]);

    useEffect(() =>{
        if(show){
            const token = localStorage.getItem('token');
            clientAxios.post('/nucleares/get/all', {}, {headers: {access:token}})
            .then(res => {
                if(res.data.type === 'notfound'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'No hay estaciones disponibles',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Cerrar'
                    }).then((result) => handleClose());
                }else {
                    setNuclear(res.data);
                }
            })
        }
        // eslint-disable-next-line
    },[show])

    useEffect(() =>{
        if(show){
            const token = localStorage.getItem('token');
            clientAxios.post('/transportista/get/all', {}, {headers: {access:token}})
            .then(res => {
                if(res.data.type === 'notfound'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'No hay estaciones disponibles',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Cerrar'
                    }).then((result) => handleClose());
                }else {
                    setTransportista(res.data);
                }
            })
        }
        // eslint-disable-next-line
    },[show])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Suministro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre de la empresa: </label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    id="nombre"
                                    onChange={handleChange}
                                    value={suministro.nombre}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="pais">País: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="pais"
                                    onChange={handleChange}
                                    value={suministro.pais}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="cant_plutonio">Volumen de plutonio: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="cant_plutonio"
                                    onChange={handleChange}
                                    value={suministro.cant_plutonio}
                                />
                            </div>
                        </div>
                        <div className="form-group col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="central">Central: </label>
                                <select 
                                    className="form-control" 
                                    id="central"
                                    onChange={handleChange}
                                    value={suministro.central}
                                >
                                    <option value="0">Seleccionar</option>
                                    {
                                            nuclear.map((e, key) => {
                                                return(
                                                    <option key={key} value={e.id}>{e.nombre}</option>
                                                )
                                            })
                                    }
                                </select>
                        </div>
                        <div className="form-group col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="transportista">Transportista: </label>
                                <select 
                                    className="form-control" 
                                    id="transportista"
                                    onChange={handleChange}
                                    value={suministro.transportista}
                                >
                                    <option value="0">Seleccionar</option>
                                    {
                                            stransportista.map((e, key) => {
                                                return(
                                                    <option key={key} value={e.id}>{e.nombre}</option>
                                                )
                                            })
                                    }
                                </select>
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

export default ModalSuministro
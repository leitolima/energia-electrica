import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';


import clientAxios from '../../config/clientAxios';

const ModalCompras = ({show, compra, handleClose, handleChange, handleSubmit}) => {

    const[nuclear, setNuclear] = useState([]);

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

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar compra</Modal.Title>
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
                                    value={compra.nombre}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="volumen">Volumen de plutonio: </label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="volumen"
                                    onChange={handleChange}
                                    value={compra.volumen}
                                />
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="volumen">País: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="volumen"
                                    onChange={handleChange}
                                    value={compra.pais}
                                />
                            </div>
                        </div>

                        <div className="form-group col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="central">Central: </label>
                                <select 
                                    className="form-control" 
                                    id="central"
                                    onChange={handleChange}
                                    value={compra.central}
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

export default ModalCompras
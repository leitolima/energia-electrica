import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';

import clientAxios from '../../config/clientAxios';

const ModalTermica = ({show, central, handleClose, handleChange, handleSubmit}) => {
    const[provincias, setProvincias] = useState([]);
    
    useEffect(() =>{
        if(show){
            const token = localStorage.getItem('token');
            clientAxios.get('/provincias/get/all', {headers: {access:token}})
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
                    setProvincias(res.data);
                }
            })
        }
        // eslint-disable-next-line
    },[show]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar central térmica</Modal.Title>
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
                                <label htmlFor="provincia">Provincia: </label>
                                <select 
                                    className="form-control" 
                                    id="provincia"
                                    onChange={handleChange}
                                    value={central.provincia}
                                >
                                    <option value="0">Selectionar</option>
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
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="fecha_func">Fecha de fundacion</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="fecha_func"
                                    onChange={handleChange}
                                    value={central.fecha_func}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="prod_media">Producción media (Mw): </label>
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
                                <label htmlFor="prod_maxima">Producción máxima (Mw): </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="prod_maxima"
                                    onChange={handleChange}
                                    value={central.prod_maxima}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="num_hornos">Numero de hornos</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="num_hornos"
                                    onChange={handleChange}
                                    value={central.num_hornos}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="vol_carbon_consum">Vol. Carbon Consumido</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="vol_carbon_consum"
                                    onChange={handleChange}
                                    value={central.vol_carbon_consum}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <label htmlFor="vol_emision_gases">Vol. Emision de Gases</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    id="vol_emision_gases"
                                    onChange={handleChange}
                                    defaultValue={central.vol_emision_gases}
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

export default ModalTermica

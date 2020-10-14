import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
//Functions
import {
    buscarTodosLosRegistros
} from '../../functions';

const ModalEstaciones = ({show, estaciones, handleClose, handleChange, handleSubmit}) => {
    const[provincias, setProvincias] = useState([]);
    const[centrales, setCentrales] = useState([]);

    useEffect(() => {
        buscarTodosLosRegistros('/provincias/get/all', setProvincias);
        buscarTodosLosRegistros('/centrales/get/all', setCentrales);
        // eslint-disable-next-line
    }, [show])

    useEffect(() => {
        if(estaciones.central !== 0 && centrales.length !== 0){
            //Busca provincia de la central
            const provArray = centrales.filter(element => element.id === estaciones.central);
            handleChange({target: {id: 'provincia', type: 'select-one', value: provArray[0].id_provincia_fk}});
        }
        // eslint-disable-next-line
    }, [estaciones.central, centrales])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Estacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre de la estacion: </label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    id="nombre"
                                    onChange={handleChange}
                                    value={estaciones.nombre}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="central">Central proveedora: </label>
                                <select 
                                    className="form-control" 
                                    id="central"
                                    onChange={handleChange}
                                    value={estaciones.central}
                                >
                                    <option value="0">Seleccionar</option>
                                    {
                                        centrales.map((c, key)=>{
                                            return(
                                                <option key={key} value={c.id}>{c.nombre}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="provincia">Provincia: </label>
                                <select 
                                    className="form-control" 
                                    id="provincia"
                                    onChange={handleChange}
                                    value={estaciones.provincia}
                                    disabled
                                >
                                    <option value="0">Seleccionar central proveedora</option>
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
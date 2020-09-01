import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';

import clientAxios from '../../config/clientAxios';

const ModalUsuario = ({show, usuario, handleClose, handleChange, handleSubmit}) => {

    const[empleados, setEmpleados] = useState([]);
    const[activo, setActivo] = useState(true);

    useEffect(() => {
        if(usuario.usuario === ''){
            setActivo(true);
        } else {
            setActivo(false);
        }
        if(show){
            setEmpleados([]); //Precaucion
            const token = localStorage.getItem('token');
            clientAxios.get('/empleados/get/sinusuario', {headers: {access:token}})
            .then(res => {
                /* 
                    Verifica si el res.data.type es 'notfound'
                        true: crea un arreglo vacio []
                        false: obtiene el arreglo de empleados de res.data
                */
                let array = res.data.type === 'notfound' ? [] : res.data;
                if(usuario.usuario !== ''){
                    array.push({id: usuario.empleado, nombre: usuario.nombre});
                    setEmpleados(array);
                } else {
                    if(res.data.type === 'notfound'){
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'No hay empleados disponibles para asignarles un usuario',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Cerrar'
                        }).then((result) => handleClose());
                    } else {
                        setEmpleados(res.data);
                    }
                }
            })
        }
        // eslint-disable-next-line
    }, [show])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <input 
                        type="text" 
                        className="d-none"
                        defaultValue={usuario.id}
                    />
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="usuario">Nombre de usuario: </label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    id="usuario"
                                    onChange={handleChange}
                                    value={usuario.usuario}
                                />
                            </div>
                        </div>
                        {
                            activo ? (
                                <div className="col-md-12 col-lg-12 col-xl-12">
                                    <div className="form-group">
                                        <label htmlFor="clave">Clave: </label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="clave"
                                            onChange={handleChange}
                                            value={usuario.clave}
                                        />
                                    </div>
                                </div>
                            ) : (
                                null
                            )
                        }
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                            <label htmlFor="empleado">Empleado</label>
                                <select 
                                    id="empleado" 
                                    onChange={handleChange}  
                                    className="form-control"
                                    value={usuario.empleado}
                                >
                                    <option value="0">Seleccionar</option>
                                    {
                                        empleados.map((e, key) => {
                                            return(
                                                <option key={key} value={e.id}>{e.nombre}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                            <label htmlFor="nivel">Nivel</label>
                                <select 
                                    id="nivel" 
                                    onChange={handleChange} 
                                    defaultValue={usuario.nivel} 
                                    className="form-control"
                                >
                                    <option value="0">Seleccionar</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Supervisor</option>
                                    <option value="3">Empleado</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <label htmlFor="activo">Estado</label>
                                <select 
                                    id="activo" 
                                    disabled={activo} 
                                    onChange={handleChange} 
                                    defaultValue={usuario.activo} 
                                    className="form-control"
                                >
                                    <option value="1">Activo</option>
                                    <option value="0">No activo</option>
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

export default ModalUsuario
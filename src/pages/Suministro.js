import React, {useState, useEffect}  from 'react';
import Swal from 'sweetalert2';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router';
import {useUsuario} from '../context';


import ModalSuministro from '../components/modals/ModalSuministro'
import validarEmpresa from '../validations/validarEmpresa';


//Functions 
import {
    eliminarRegistro, 
    buscarRegistroById,
    agregarNuevoEditar,
    lanzarError
} from '../functions';

//Validar 

import useValidar from '../hooks/useValidar';

import useData from '../hooks/useData';

const INITIAL_STATE = {
    nombre:'',
    pais: '',
    central: '',
    fecha: '',
    cant_plutonio: 0
}

const Suministro = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);

    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarEmpresa, registrarNueva);
    const {rows, error, handleLoading} = useData('/suministro/get/all');

    const permiso = useUsuario();
    const history = useHistory();

    useEffect(() => {
        if(error){
            lanzarError(error);
        }
    }, [error]);

    useEffect(() => {
        if(Object.keys(errores).length !== 0){
            errores.map(e => {
                return toast.error(e);
            })
        }
    }, [errores]);

    async function registrarNueva(){
        let result = {};
        if(editar){
            result = await agregarNuevoEditar('/suministro/editar', valores);
        } else {
            result = await agregarNuevoEditar('/suministro/nueva', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarSuministro = async id => {
        const result = await buscarRegistroById('/suministro/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarSuministro= id => {
        Swal.fire({
            title: '¿Estás seguro/a?',
            text: "Esta acción puede ser irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!'
        }).then(async res => {
            if(res.value) {
                const result = await eliminarRegistro('/suministro/eliminar', id);
                if(result.type === 'success'){
                    handleLoading();
                } else {
                    lanzarError(result.text);
                }
            }
        })
    }


    const renderPage = () => {
        if(permiso.usuario == null){
            return null
        }
        if(!permiso.usuario[10].c){
            toast.error('No tienes permiso de visualizar esta página.');
            return <Redirect to='/'/>
        }
        if(permiso.usuario[10].c){
                    return (
                        <div className="container-fluid mt-4">
                            <div className="d-flex flex-row justify-content-between">
                                <h2>Suministradores</h2>
                                <button 
                                    className="btn btn-info btn-icon" 
                                    title="Transporte"
                                    
                                        disabled={
                                            permiso.usuario == null ? null : (
                                            permiso.usuario[5].b ? false : true
                                        )
                                     }
                                    onClick={() => history.push(`/transportista/`)}
                                >Agregar transportista</button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    disabled={
                                        permiso.usuario == null ? null : (
                                            permiso.usuario[10].a ? false : true
                                        )
                                    }
                                    onClick={() => {
                                        setEditar(false);
                                        setShow(true);
                                    }}
                                >Agregar nueva empresa</button>
                                
                            </div>
                            
                            <div className="fixed-head w-100 mt-4">
                                <table className="table table-striped">
                                    <thead className="thead-dark thead-border-top">
                                        <tr>
                                            <th className="options">Opciones</th>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>País</th>
                                            <th>Central</th>
                                            <th>Cantidad de plutonio</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                            rows.length > 0 ? (
                                                rows.map((r, key) => {
                                                    return(
                                                        <tr key={key}>
                                                            <td>
                                                                <button 
                                                                    className="btn btn-warning btn-icon" 
                                                                    title="Editar"
                                                                    disabled={
                                                                        permiso.usuario == null ? null : (
                                                                            permiso.usuario[11].m ? false : true
                                                                        )
                                                                    }
                                                                    onClick={() => editarSuministro(r.id)}
                                                                ><i className="fas fa-pen"></i></button>
                                                                <button 
                                                                    className="btn btn-danger btn-icon" 
                                                                    title="Eliminar"
                                                                    disabled={
                                                                        permiso.usuario == null ? null : (
                                                                            permiso.usuario[11].b ? false : true
                                                                        )
                                                                    }
                                                                    onClick={() => eliminarSuministro(r.id)}
                                                                ><i className="fas fa-trash-alt"></i></button>
                                                            </td>
                                                            <td>{r.id}</td>
                                                            <td>{r.nombre}</td>
                                                            <td>{r.pais}</td>
                                                            <td>{r.central}</td>
                                                            <td>{r.cant_plutonio}</td>
                                                            <td>{r.fecha}</td>
                                                        </tr>
                                                    )
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="9">No hay suministros registrados</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>


                            <ModalSuministro
                                show={show}
                                suministro={valores}
                                handleClose={() => setShow(false)}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />

                            
                        </div>
                    )
            }
    }
    return(
        renderPage()
    )
}

export default Suministro

import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

import {useUsuario} from '../../context';
import validarSubestacion from '../../validations/validarSubestacion';

import ModalSubestaciones from '../../components/modals/ModalSubestaciones';
//Functions 
import {
    eliminarRegistro, 
    buscarRegistroById,
    agregarNuevoEditar,
    lanzarError
} from '../../functions';

//Validar 

import useValidar from '../../hooks/useValidar';

import useData from '../../hooks/useData';

const INITIAL_STATE = {
    linea: 0,
    provincia: 0
}

const Subestaciones = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);

    const {rows, error, handleLoading} = useData('/subestaciones/get/all');
    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarSubestacion, registrarNueva);
    
    const permiso = useUsuario();

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
            result = await agregarNuevoEditar('/subestaciones/editar', valores);
        } else {
            result = await agregarNuevoEditar('/subestaciones/nueva', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarSubestacion = async id => {
        const result = await buscarRegistroById('/subestaciones/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarSubestacion = id => {
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
                const result = await eliminarRegistro('/subestaciones/eliminar', id);
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
        if(!permiso.usuario[7].c){
            toast.error('No tienes permiso de visualizar esta página.');
            return <Redirect to='/'/>
        }
        if(permiso.usuario[7].c){
                return (
                    <div className="container-fluid mt-4">
                        <div className="d-flex flex-row justify-content-between">
                            <h2>Subestaciones</h2>
                            <button 
                                type="button"
                                className="btn btn-success"
                                disabled={
                                    permiso.usuario == null ? null : (
                                        permiso.usuario[7].a ? false : true
                                    )
                                }
                                onClick={() => {
                                    handleEditar(INITIAL_STATE);
                                    setEditar(false);
                                    setShow(true);
                                }}
                            >Agregar nueva</button>
                        </div>
                        <div className="fixed-head w-100 mt-4">
                            <table className="table table-hover">
                                <thead className="thead-dark thead-border-top">
                                    <tr>
                                        <th className="options text-center">Actions</th>
                                        <th>Num Linea</th>
                                        <th>Ubicación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                        rows.length > 0 ?(
                                            rows.map((r, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>
                                                        <button 
                                                                className="btn btn-warning btn-icon" 
                                                                title="Editar"
                                                                disabled={
                                                                    permiso.usuario == null ? null : (
                                                                        permiso.usuario[7].m ? false : true
                                                                    )
                                                                }
                                                                onClick={() => editarSubestacion(r.id)}
                                                            ><i className="fas fa-pen"></i></button>
                                                            <button 
                                                                className="btn btn-danger btn-icon" 
                                                                title="Eliminar"
                                                                disabled={
                                                                    permiso.usuario == null ? null : (
                                                                        permiso.usuario[7].b ? false : true
                                                                    )
                                                                }
                                                                onClick={() => eliminarSubestacion(r.id)}
                                                            ><i className="fas fa-trash-alt"></i></button>   
                                                        </td>
                                                        <td>{r.nrolinea}</td>
                                                        <td>{r.nombreprov}</td>
                                                    </tr>
                                                )
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="3">No hay subestaciones registradas</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <ModalSubestaciones
                            show={show}
                            subestaciones={valores}
                            handleClose={() => setShow(false)}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                );
        }
    }
    return(
        renderPage()
    )
}

export default Subestaciones
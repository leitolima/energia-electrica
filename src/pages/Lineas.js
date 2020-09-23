import React, {useState, useEffect}  from 'react';
import {Redirect} from 'react-router-dom';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

import {useUsuario} from '../context';
import validarLinea from '../validations/validarLinea';

import ModalLineas from '../components/modals/ModalLineas';

import {
    eliminarRegistro, 
    buscarRegistroById,
    agregarNuevoEditar,
    lanzarError
} from '../functions';

import useData from '../hooks/useData';

//Validar
import useValidar from '../hooks/useValidar';

const INITIAL_STATE = {
    numero: 0,
    longitud: 0
}

const Lineas = () => {
    
    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);
    
    const permiso = useUsuario();

    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarLinea, registrarNuevaLinea);
    const {rows, error, handleLoading} = useData('/lineas/get/all');

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

    async function registrarNuevaLinea(){
        let result = {};
        if(editar){
            result = await agregarNuevoEditar('/lineas/editar', valores);
        } else {
            result = await agregarNuevoEditar('/lineas/nueva', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarLinea = async id => {
        const result = await buscarRegistroById('/lineas/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarLinea = id => {
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
                const result = await eliminarRegistro('/lineas/eliminar', id);
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
        if(!permiso.usuario[9].c){
            toast.error('No tienes permiso de visualizar esta página.');
            return <Redirect to='/'/>
        }
        if(permiso.usuario[9].c){
                return (
                    <div className="container-fluid mt-4">
                        <div className="d-flex flex-row justify-content-between">
                            <h2>Lineas</h2>
                            <button 
                                type="button"
                                className="btn btn-success"
                                disabled={
                                    permiso.usuario == null ? null : (
                                        permiso.usuario[9].a ? false : true
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
                                        <th>Id.Linea</th>
                                        <th>Num. Red</th>
                                        <th>Longitud</th>
                                        <th>Subestaciones</th>
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
                                                                        permiso.usuario[9].m ? false : true
                                                                    )
                                                                }
                                                                onClick={() => editarLinea(r.id)}
                                                            ><i className="fas fa-pen"></i></button>
                                                            <button 
                                                                className="btn btn-danger btn-icon" 
                                                                title="Eliminar"
                                                                disabled={
                                                                    permiso.usuario == null ? null : (
                                                                        permiso.usuario[9].b ? false : true
                                                                    )
                                                                }
                                                                onClick={() => eliminarLinea(r.id)}
                                                            ><i className="fas fa-trash-alt"></i></button>
                                                        </td>
                                                        <td>{r.id}</td>
                                                        <td>{r.numero}</td>
                                                        <td>{r.longitud} Mts</td>
                                                        <td>{r.subestaciones}</td>
                                                    </tr>
                                                )
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="5">No hay lineas registradas</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <ModalLineas
                            show={show}
                            linea={valores}
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

export default Lineas
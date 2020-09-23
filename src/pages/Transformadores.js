import React, {useState, useEffect}  from 'react';
import Swal from 'sweetalert2';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

import {useUsuario} from '../context';
import validarTransformador from '../validations/validarTransformador';

import ModalTransformadores from '../components/modals/ModalTransformadores';
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
    codigo: '',
    estacion: 0,
}

const Transformadores = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);

    const {rows, error, handleLoading} = useData('/transformadores/get/all');
    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarTransformador, registrarNuevo);
    
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

    async function registrarNuevo(){
        let result = {};
        if(editar){
            result = await agregarNuevoEditar('/transformadores/editar', valores);
        } else {
            result = await agregarNuevoEditar('/transformadores/nuevo', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarTransformador = async id => {
        const result = await buscarRegistroById('/transformadores/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarTransformador = id => {
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
                const result = await eliminarRegistro('/transformadores/eliminar', id);
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
                                <h2>Transformadores</h2>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    disabled={
                                        permiso.usuario == null ? null : (
                                            permiso.usuario[10].a ? false : true
                                        )
                                    }
                                    onClick={() => {
                                        handleEditar(INITIAL_STATE);
                                        setEditar(false);
                                        setShow(true);
                                    }}
                                >Agregar nuevo</button>
                            </div>
                            <div className="fixed-head w-100 mt-4">
                                <table className="table table-striped">
                                    <thead className="thead-dark thead-border-top">
                                        <tr>
                                            <th className="options">Opciones</th>
                                            <th>Id</th>
                                            <th>Estación</th>
                                            <th>Código</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            rows.length > 0 ?(
                                                rows.map((r,key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>
                                                            <button 
                                                                    className="btn btn-warning btn-icon" 
                                                                    title="Editar"
                                                                    disabled={
                                                                        permiso.usuario == null ? null : (
                                                                            permiso.usuario[10].m ? false : true
                                                                        )
                                                                    }
                                                                    onClick={() => editarTransformador(r.id)}
                                                                ><i className="fas fa-pen"></i></button>
                                                                <button 
                                                                    className="btn btn-danger btn-icon" 
                                                                    title="Eliminar"
                                                                    disabled={
                                                                        permiso.usuario == null ? null : (
                                                                            permiso.usuario[10].b ? false : true
                                                                        )
                                                                    }
                                                                    onClick={() => eliminarTransformador(r.id)}
                                                                ><i className="fas fa-trash-alt"></i></button>   
                                                            </td>
                                                            <td>{r.id}</td>
                                                            <td>{r.nombre}</td>
                                                            <td>{r.codigo}</td>
                                                        </tr>
                                                    )
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="3">No hay transformadores registrados</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <ModalTransformadores
                                show={show}
                                trafo={valores}
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

export default Transformadores

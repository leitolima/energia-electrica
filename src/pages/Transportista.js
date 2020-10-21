import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

import {useUsuario} from '../context';
import validarTransportista from '../validations/validarTransportista';

import ModalTransportista from '../components/modals/ModalTransportista';

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
    nombre: '',
    matricula: 0
}

const Transportista = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);
    
    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarTransportista, registrarNuevoTransportista);
    const {rows, error, handleLoading} = useData('/transportista/get/all');

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

    async function registrarNuevoTransportista(){
        let result = {};
        if(editar){
            result = await agregarNuevoEditar('/transportista/editar', valores);
        } else {
            result = await agregarNuevoEditar('/transportista/nuevo', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarTransportista = async id => {
        const result = await buscarRegistroById('/transportista/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }
    const eliminarTransportista = id => {
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
                const result = await eliminarRegistro('/transportista/eliminar', id);
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
        if(!permiso.usuario[0].c){
            toast.error('No tienes permiso de visualizar esta página.');
            return <Redirect to='/'/>
        }
        if(permiso.usuario[0].c){
                    return (
                        <div className="container-fluid mt-4">
                            <div className="d-flex flex-row justify-content-between">
                                <h2>Transportistas</h2>
                                <button 
                                    type="button"
                                    className="btn btn-success"
                                    disabled={
                                        permiso.usuario == null ? null : (
                                            permiso.usuario[11].a ? false : true
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
                                <table className="table table-hover">
                                    <thead className="thead-dark thead-border-top">
                                        <tr>
                                            <th className="options">Opciones</th>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Matricula</th>
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
                                                                            permiso.usuario[0].m ? false : true
                                                                        )
                                                                    }
                                                                    onClick={() => editarTransportista(r.id)}
                                                                ><i className="fas fa-pen"></i></button>
                                                                <button 
                                                                    className="btn btn-danger btn-icon" 
                                                                    title="Eliminar"
                                                                    disabled={
                                                                        permiso.usuario == null ? null : (
                                                                            permiso.usuario[0].b ? false : true
                                                                        )
                                                                    }
                                                                    onClick={() => eliminarTransportista(r.id)}
                                                                ><i className="fas fa-trash-alt"></i></button>
                                                            </td>
                                                            <td>{r.id}</td>
                                                            <td>{r.nombre}</td>
                                                            <td>{r.matricula}</td>
                                                        </tr>
                                                    )
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="6">No se encontraron transportistas registrados</td>
                                                </tr>
                                            )
                                        }
                            </tbody>
                                    
                                </table>
                            </div>
                            <ModalTransportista
                                show={show}
                                transportista={valores}
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

export default Transportista
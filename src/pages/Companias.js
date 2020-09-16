import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

import validarCompania from '../validations/validarCompania';

import ModalCompania from '../components/modals/ModalCompanias';

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
    idred: 0
}

const Companias = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);
    
    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarCompania, registrarNuevaCompania);
    const {rows, error, handleLoading} = useData('/compania/get/all');

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

    async function registrarNuevaCompania(){
        let result = {};
        if(editar){
            result = await agregarNuevoEditar('/compania/editar', valores);
        } else {
            result = await agregarNuevoEditar('/compania/nueva', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarCompania = async id => {
        const result = await buscarRegistroById('/compania/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }
    const eliminarCompania = id => {
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
                const result = await eliminarRegistro('/compania/eliminar', id);
                if(result.type === 'success'){
                    handleLoading();
                } else {
                    lanzarError(result.text);
                }
            }
        })
    }

    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Compañias</h2>
                <button 
                    type="button"
                    className="btn btn-success"
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
                            <th className="options text-center">Actions</th>
                            <th>Nombre</th>
                            <th>Id.Red</th>
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
                                                    onClick={() => editarCompania(r.id)}
                                                ><i className="fas fa-pen"></i></button>
                                                <button 
                                                    className="btn btn-danger btn-icon" 
                                                    title="Eliminar"
                                                    onClick={() => eliminarCompania(r.id)}
                                                ><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                            <td>{r.nombre}</td>
                                            <td>{r.codigo}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4">No hay companias registradas</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <ModalCompania
                show={show}
                provincia={valores}
                handleClose={() => setShow(false)}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default Companias
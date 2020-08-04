import React, {useState,useEffect} from 'react'
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

import ModalZonas from '../../components/modals/ModalZonas'

import validarZona from '../../validations/validarZona';
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
    nombre:'',
    idprovincia:0
}
const Zonas = () => {
    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);

    const {rows, error, handleLoading} = useData('/zona/get/all');
    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarZona, registrarNuevaZona);

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

    async function registrarNuevaZona(){
        let result = {};
        if(editar){
            result = await agregarNuevoEditar('/zona/editar', valores);
        } else {
            result = await agregarNuevoEditar('/zona/nueva', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }
    const editarZona = async id => {
        const result = await buscarRegistroById('/zona/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarZona = id => {
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
                const result = await eliminarRegistro('/zona/eliminar', id);
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
                <h2>Zonas de servicio</h2>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        handleEditar(INITIAL_STATE);
                        setEditar(false);
                        setShow(true);
                    }}
                >Agregar nueva</button>
            </div>
            <div className="fixed-head w-100 mt-4">
                <table className="table table-striped">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="options">Opciones</th>
                            <th>Nombre</th>
                            <th>Provincia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.length > 0 ?(
                                rows.map((z,key) => {
                                    return (
                                        <tr key={key}>
                                            <td>
                                            <button 
                                                    className="btn btn-warning btn-icon" 
                                                    title="Editar"
                                                    onClick={() => editarZona(z.id)}
                                                ><i className="fas fa-pen"></i></button>
                                                <button 
                                                    className="btn btn-danger btn-icon" 
                                                    title="Eliminar"
                                                    onClick={() => eliminarZona(z.id)}
                                                ><i className="fas fa-trash-alt"></i></button>   
                                            </td>
                                            <td>{z.nombre}</td>
                                            <td>{z.provincia}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="3">No hay zonas de servicio registradas</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <ModalZonas
                show={show}
                zona={valores}
                handleClose={() => setShow(false)}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Zonas

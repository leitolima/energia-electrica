import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

import validarProvincia from '../../validations/validarProvincia';

import ModalProvincia from '../../components/modals/ModalProvincia';

//Functions
import {
    eliminarRegistro, 
    buscarRegistroById,
    agregarNuevoEditar,
    lanzarError
} from '../../functions';
import useData from '../../hooks/useData';

//Validar
import useValidar from '../../hooks/useValidar';

const INITIAL_STATE = {
    nombre: '',
    codigo: ''
}

const Provincias = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);
    
    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarProvincia, registrarNueva);
    const {rows, error, handleLoading} = useData('/provincias/get/all');

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
            result = await agregarNuevoEditar('/provincia/editar', valores);
        } else {
            result = await agregarNuevoEditar('/provincia/nueva', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarProvincia = async id => {
        const result = await buscarRegistroById('/provincia/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarProvincia = id => {
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
                const result = await eliminarRegistro('/provincia/eliminar', id);
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
                <h2>Provincias</h2>
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
                            <th>Codigo</th>
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
                                                    onClick={() => editarProvincia(r.id)}
                                                ><i className="fas fa-pen"></i></button>
                                                <button 
                                                    className="btn btn-danger btn-icon" 
                                                    title="Eliminar"
                                                    onClick={() => eliminarProvincia(r.id)}
                                                ><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                            <td>{r.nombre}</td>
                                            <td>{r.codigo}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4">No hay provincias registradas</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <ModalProvincia
                show={show}
                provincia={valores}
                handleClose={() => setShow(false)}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Provincias

import React, {useState, useEffect}  from 'react';

import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

import ModalRedes from '../components/modals/ModalRedes';

//Functions
import {
    eliminarRegistro, 
    buscarRegistroById,
    agregarNuevoEditar,
    lanzarError
} from '../functions';

import useData from '../hooks/useData';

//Validar
import useValidar from '../hooks/useValidar';
import validarRed from '../validations/validarRed';

const INITIAL_STATE  = {
    idred: 0,
    estacion: '',
    compania: ''
}

const Redes = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);
    
    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarRed, registrarNuevaRed);
    const {rows, error, handleLoading} = useData('/redes/get/all');
   
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
    
    async function registrarNuevaRed(){
        let result = {};
        if(editar){
            result = await agregarNuevoEditar('/redes/editar', valores);
        } else {
            result = await agregarNuevoEditar('/redes/nueva', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarRed = async id => {
        const result = await buscarRegistroById('/redes/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarRed = id => {
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
                const result = await eliminarRegistro('/redes/eliminar', id);
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
                <h2>Redes</h2>
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
                <table className="table table-hover mt-5">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="options text-center">Actions</th>
                            <th>Id. Red</th>
                            <th>Estación</th>
                            <th>Compañías</th>
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
                                                    onClick={() => editarRed(z.id)}
                                                ><i className="fas fa-pen"></i></button>
                                                <button 
                                                    className="btn btn-danger btn-icon" 
                                                    title="Eliminar"
                                                    onClick={() => eliminarRed(z.id)}
                                                ><i className="fas fa-trash-alt"></i></button>   
                                            </td>
                                            <td>{z.id}</td>
                                            <td>{z.nombre}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="3">No hay redes registradas</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <ModalRedes
                show={show}
                red={valores}
                handleClose={() => setShow(false)}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default Redes
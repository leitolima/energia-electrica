import React, {useState,useEffect} from 'react'
import Swal from 'sweetalert2';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

import validarEstacion from '../../validations/validarEstacion';
import {useUsuario} from '../../context';

import ModalEstaciones from '../../components/modals/ModalEstaciones';
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
    nombre: '',
    central: 0,
    provincia: 0
}
const Estaciones = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);

    const {rows, error, handleLoading} = useData('/estaciones/get/all');
    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarEstacion, registrarNueva);

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
            result = await agregarNuevoEditar('/estaciones/editar', valores);
        } else {
            result = await agregarNuevoEditar('/estaciones/nueva', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarEstacion = async id => {
        const result = await buscarRegistroById('/estaciones/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarEstacion = id => {
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
                const result = await eliminarRegistro('/estaciones/eliminar', id);
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
        if(!permiso.usuario[6].c){
            toast.error('No tienes permiso de visualizar esta página.');
            return <Redirect to='/'/>
        }
        if(permiso.usuario[6].c){
            return (
                <div className="container-fluid mt-4">
                    <div className="d-flex flex-row justify-content-between">
                        <h2>Estaciones</h2>
                        <button
                            type="button"
                            className="btn btn-success"
                            disabled={
                                permiso.usuario == null ? null : (
                                    permiso.usuario[6].a ? false : true
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
                        <table className="table table-striped">
                            <thead className="thead-dark thead-border-top">
                                <tr>
                                    <th className="options">Opciones</th>
                                    <th>Id. Estacion</th>
                                    <th>Nombre</th>
                                    <th>Provincia</th>
                                    <th>Central proveedora</th>
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
                                                            disabled={
                                                                permiso.usuario == null ? null : (
                                                                    permiso.usuario[6].m ? false : true
                                                                )
                                                            }
                                                            onClick={() => editarEstacion(z.id)}
                                                        ><i className="fas fa-pen"></i></button>
                                                        <button 
                                                            className="btn btn-danger btn-icon" 
                                                            title="Eliminar"
                                                            disabled={
                                                                permiso.usuario == null ? null : (
                                                                    permiso.usuario[6].b ? false : true
                                                                )
                                                            }
                                                            onClick={() => eliminarEstacion(z.id)}
                                                        ><i className="fas fa-trash-alt"></i></button>   
                                                    </td>
                                                    <td>{z.id}</td>
                                                    <td>{z.nombre}</td>
                                                    <td>{z.nombreprov}</td>
                                                    <td>{z.nombrecentral}</td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5">No hay estaciones registradas</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <ModalEstaciones
                        show={show}
                        estaciones={valores}
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
    
};

export default Estaciones;

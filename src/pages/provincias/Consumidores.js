import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

import {useUsuario} from '../../context';
import validarConsumidor from '../../validations/validarConsumidor';

import ModalConsumidor from '../../components/modals/ModalConsumidor';

import {
    buscarRegistroById,
    agregarNuevoEditar,
    lanzarError
} from '../../functions';

import useData from '../../hooks/useData';

//Validar
import useValidar from '../../hooks/useValidar';

const INITIAL_STATE = {
    nombre: ''
}

const Consumidores = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);

    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarConsumidor, guardarConsumidores);
    const {rows, error, handleLoading} = useData('/consumidores/get/all');

    const permiso = useUsuario();

    async function guardarConsumidores(){
        let result = await agregarNuevoEditar('/consumidores/update', valores);
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    useEffect(() => {
        if(Object.keys(errores).length !== 0){
            errores.map(e => {
                return toast.error(e);
            })
        }
    }, [errores]);

    const editarConsumidores = async id => {
        const result = await buscarRegistroById('/consumidores/get', id);
        console.log(id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    useEffect(() => {
        if(error){
            lanzarError(error);
        }
    }, [error]);

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
                    <div className="d-flex flex-row justify-content-start">
                        <h2>Consumidores</h2>
                    </div>
                    <div className="fixed-head w-100 mt-4">
                        <table className="table table-hover">
                            <thead className="thead-dark thead-border-top">
                                <tr>
                                    <th className="options text-center">Actions</th>
                                    <th>Provincia</th>
                                    <th>Zona</th>
                                    <th>Particulares</th>
                                    <th>Empresas</th>
                                    <th>Instituciones</th>
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
                                                            onClick={() => editarConsumidores(r.id)}
                                                        ><i className="fas fa-pen"></i></button>
                                                    </td>
                                                    <td>{r.provincia}</td>
                                                    <td>{r.nombre}</td>
                                                    <td>{r.particulares}</td>
                                                    <td>{r.empresas}</td>
                                                    <td>{r.instituciones}</td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No hay companias registradas</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <ModalConsumidor
                        show={show}
                        consumidor={valores}
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

export default Consumidores;
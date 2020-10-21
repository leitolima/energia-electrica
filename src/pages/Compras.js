import React, {useState, useEffect}  from 'react';
import Swal from 'sweetalert2';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

import {useUsuario} from '../context';

import validarCompra from '../validations/validarCompra';

import ModalCompras from '../components/modals/ModalCompras';

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
    central: '',
    suministro: '',
    cant_plutonio: 0
}

const Compras = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);

    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarCompra, registrarNueva);
    const {rows, error, handleLoading} = useData('/compras/get/all');

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
            result = await agregarNuevoEditar('/compras/editar', valores);
        } else {
            result = await agregarNuevoEditar('/compras/nueva', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarCompra = async id => {
        const result = await buscarRegistroById('/compras/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarCompra= id => {
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
                const result = await eliminarRegistro('/compras/eliminar', id);
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
                                <h2>Compras de la central: </h2>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    disabled={
                                        permiso.usuario == null ? null : (
                                            permiso.usuario[10].a ? false : true
                                        )
                                    }
                                    onClick={() => {
                                        setEditar(false);
                                        setShow(true);
                                    }}
                                >Hacer pedido</button>
                                
                            </div>
                            
                            <div className="fixed-head w-100 mt-4">
                                <table className="table table-striped">
                                    <thead className="thead-dark thead-border-top">
                                        <tr>
                                            <th className="options">Opciones</th>
                                            <th>Id</th>
                                            <th>Central</th>
                                            <th>Suministro</th>
                                            <th>Volumen de plutonio</th>
                                            <th>Fecha</th>
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
                                                                    onClick={() => editarCompra(r.id)}
                                                                ><i className="fas fa-pen"></i></button>
                                                                <button 
                                                                    className="btn btn-danger btn-icon" 
                                                                    title="Eliminar"
                                                                    disabled={
                                                                        permiso.usuario == null ? null : (
                                                                            permiso.usuario[10].b ? false : true
                                                                        )
                                                                    }
                                                                    onClick={() => eliminarCompra(r.id)}
                                                                ><i className="fas fa-trash-alt"></i></button>   
                                                            </td>
                                                            <td>{r.id}</td>
                                                            <td>{r.central}</td>
                                                            <td>{r.suministro}</td>
                                                            <td>{r.cant_plutonio}</td>
                                                            <td>{r.fecha}</td>
                                                        </tr>
                                                    )
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="6">No hay compras registrados</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <ModalCompras
                                show={show}
                                compra={valores}
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

export default Compras;

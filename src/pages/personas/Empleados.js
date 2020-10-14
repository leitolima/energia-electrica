import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

import {useUsuario} from '../../context';
import ModalEmpleado from '../../components/modals/ModalEmpleado';

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
import validarEmpleado from '../../validations/validarEmpleado';

const INITIAL_STATE  = {
    nombre: '',
    fecha: '',
    central: 0,
    dni: '',
    email: '',
    telefono: ''
}

const Empleados = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);

    const permiso = useUsuario();

    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarEmpleado, registrarEmpleado);
    const {rows, error, handleLoading} = useData('/empleados/get/all');

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

    async function registrarEmpleado(){
        let result = {};
        if(editar){
            //Edita un empleado existente
            result = await agregarNuevoEditar('/empleado/editar', valores);
        } else {
            //Agrega un nuevo empleado
            result = await agregarNuevoEditar('/empleado/nuevo', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarEmpleado = async id => {
        const result = await buscarRegistroById('/empleado/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarEmpleado = async id => {
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
                const result = await eliminarRegistro('/empleado/eliminar', id);
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
            return(
                <div className="container-fluid mt-4">
                    <div className="d-flex flex-row justify-content-between">
                        <h2>Administrar empleados</h2>
                        <button 
                            type="button"
                            className="btn btn-success"
                            disabled={
                                permiso.usuario == null ? null : (
                                    permiso.usuario[0].a ? false : true
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
                                    <th>Nombre</th>
                                    <th>DNI</th>
                                    <th>Fecha nacimiento</th>
                                    <th>Central</th>
                                    <th>Correo electrónico</th>
                                    <th>Telefono</th>
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
                                                            onClick={() => editarEmpleado(r.id)}
                                                        ><i className="fas fa-pen"></i></button>
                                                        <button 
                                                            className="btn btn-danger btn-icon" 
                                                            title="Eliminar"
                                                            disabled={
                                                                permiso.usuario == null ? null : (
                                                                    permiso.usuario[0].b ? false : true
                                                                )
                                                            }
                                                            onClick={() => eliminarEmpleado(r.id)}
                                                        ><i className="fas fa-trash-alt"></i></button>
                                                    </td>
                                                    <td>{r.nombre}</td>
                                                    <td>{r.dni}</td>
                                                    <td>{r.fecha}</td>
                                                    <td>{r.nomcentral}</td>
                                                    <td>{r.email}</td>
                                                    <td>{r.telefono}</td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No se encontraron empleados registrados</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <ModalEmpleado
                        show={show}
                        empleado={valores}
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

export default Empleados

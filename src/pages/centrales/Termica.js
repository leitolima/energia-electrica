import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

import {useUsuario} from '../../context';
import ModalTermica from '../../components/modals/ModalTermica';

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
import validarTermica from '../../validations/validarTermica';

const INITIAL_STATE  = {
    nombre: '',
    provincia: 0,
    fecha_func: '',
    prod_media: '',
    prod_maxima: '',
    num_hornos: 0,
    vol_carbon_consum: 0,
    vol_emision_gases: 0
}

const Termica = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);

    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarTermica, registrarNueva);
    const {rows, error, handleLoading} = useData('/termicas/get/all');

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
            result = await agregarNuevoEditar('/termicas/editar', valores);
        } else {
            result = await agregarNuevoEditar('/termicas/nuevo', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarCentral = async id => {
        const result = await buscarRegistroById('/termicas/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarCentral = id => {
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
                const result = await eliminarRegistro('/termicas/eliminar', id);
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
        if(!permiso.usuario[4].c){
            toast.error('No tienes permiso de visualizar esta página.');
            return <Redirect to='/'/>
        }
        if(permiso.usuario[4].c){
            return (
                <div className="container-fluid mt-4">
                    <div className="d-flex flex-row justify-content-between">
                        <h2>Centrales térmicas</h2>
                        <button
                            type="button"
                            className="btn btn-success"
                            disabled={
                                permiso.usuario == null ? null : (
                                    permiso.usuario[4].a ? false : true
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
                                    <th>Nombre</th>
                                    <th>Provincia</th>
                                    <th>Fundación</th>
                                    <th>Prod. Media</th>
                                    <th>Prod. Max.</th>
                                    <th>Num. Hornos</th>
                                    <th>Vol. Carbon Consum.</th>
                                    <th>Vol. Emisión Gases</th>
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
                                                                    permiso.usuario[4].m ? false : true
                                                                )
                                                            }
                                                            onClick={() => editarCentral(r.id)}
                                                        ><i className="fas fa-pen"></i></button>
                                                        <button 
                                                            className="btn btn-danger btn-icon" 
                                                            title="Eliminar"
                                                            disabled={
                                                                permiso.usuario == null ? null : (
                                                                    permiso.usuario[4].b ? false : true
                                                                )
                                                            }
                                                            onClick={() => eliminarCentral(r.id)}
                                                        ><i className="fas fa-trash-alt"></i></button>
                                                    </td>
                                                    <td>{r.nombre}</td>
                                                    <td>{r.nombreprov}</td>
                                                    <td>{r.fecha_func}</td>
                                                    <td>{r.prod_media} Mw</td>
                                                    <td>{r.prod_maxima} Mw</td>
                                                    <td>{r.num_hornos}</td>
                                                    <td>{r.vol_carbon_consum} m^3</td>
                                                    <td>{r.vol_emision_gases} m^3</td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="8">No hay centrales registradas</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <ModalTermica
                        show={show}
                        central={valores}
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

export default Termica;
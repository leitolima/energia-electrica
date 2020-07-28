import React,{useState, useEffect}  from 'react';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

import ModalUsuario from '../../components/modals/ModalUsuario';

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
import validarUsuario from '../../validations/validarUsuario';

const INITIAL_STATE  = {
    usuario: '',
    clave: '',
    empleado: 0,
    nivel: 0,
    activo: 1
}

const Usuarios = () => {

    const[show, setShow] = useState(false);
    const[editar, setEditar] = useState(false);

    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarUsuario, registrarUsuario);
    const {rows, error, handleLoading} = useData('/usuarios/get/all');

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

    async function registrarUsuario(){
        let result = {};
        if(editar){
            //Edita un usuario existente
            result = await agregarNuevoEditar('/usuario/editar', valores);
        } else {
            //Agrega un nuevo usuario
            result = await agregarNuevoEditar('/usuario/nuevo', valores);
        }
        if(result.type === 'success'){
            setShow(false);
            handleLoading();
        } else {
            lanzarError(result.text);
        }
    }

    const editarUsuario = async id => {
        const result = await buscarRegistroById('/usuario/get', id);
        setEditar(true);
        handleEditar(result);
        setShow(true);
    }

    const eliminarUsuario = id => {
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
                const result = await eliminarRegistro('/usuario/eliminar', id);
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
                <h2>Administrar permisos</h2>
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
                <table className="table table-striped">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="options">Opciones</th>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Nivel</th>
                            <th>Activo</th>
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
                                                    onClick={() => editarUsuario(r.id)}
                                                ><i className="fas fa-pen"></i></button>
                                                <button 
                                                    className="btn btn-danger btn-icon" 
                                                    title="Eliminar"
                                                    onClick={() => eliminarUsuario(r.id)}
                                                ><i className="fas fa-trash-alt"></i></button>
                                                <button 
                                                    className="btn btn-success btn-icon" 
                                                    title="Accesos"
                                                ><i className="fab fa-windows"></i></button>
                                            </td>
                                            <td>{r.nombre}</td>
                                            <td>{r.usuario}</td>
                                            <td>{r.nivel}</td>
                                            <td>{r.activo ? 'Activo' : 'No activo'}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5">No se encontraron usuarios registrados</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <ModalUsuario
                show={show}
                usuario={valores}
                handleClose={() => setShow(false)}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
        
    )
}

export default Usuarios

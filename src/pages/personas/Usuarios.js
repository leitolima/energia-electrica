import React,{useState, useEffect}  from 'react';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router';

import ModalUsuario from '../../components/modals/ModalUsuario';

//Functions
import {
    eliminarRegistro, 
    buscarRegistroById,
    agregarNuevoEditar,
    lanzarError,
    buscarTodosLosRegistros
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
    //Para filtro
    const[loadinfo, setLoadinfo] = useState(true);
    const[centrales, setCentrales] = useState([]);
    const[filtro, setFiltro] = useState({
        fcentral: 0,
        fnivel: 0
    });

    const {valores, errores, handleChange, handleSubmit, handleEditar} = useValidar(INITIAL_STATE, validarUsuario, registrarUsuario);
    const {rows, error, handleLoading, setLoading} = useData('/usuarios/get/all', filtro);

    const history = useHistory();

    //Busca informacion para los filtros
    useEffect(() => {
        if(loadinfo){
            buscarTodosLosRegistros('/centrales/get/all', setCentrales);
            setLoadinfo(false);
        }
    }, [loadinfo])


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

    //Setea el objeto de filtro
    const changeFiltro = e => {
        setFiltro({
            ...filtro,
            [e.target.name]: e.target.value
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
            <div className="mt-3 d-flex flex-row justify-content-end">
                <button className="btn btn-info" onClick={() => setLoading(true)}>Filtrar</button>
                <div className="col-md-3 col-lg-3 col-xl-3 pr-0">
                    <select 
                        name="fnivel" 
                        id="fnivel"
                        className="form-control"
                        onChange={changeFiltro}
                    >
                        <option value="0">Selecciona un nivel</option>
                        <option value="1">Administrador</option>
                        <option value="2">Supervisor</option>
                        <option value="3">Empleado</option>
                    </select>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3 pr-0">
                    <select 
                        name="fcentral" 
                        id="fcentral"
                        className="form-control"
                        onChange={changeFiltro}
                    >
                        <option value="0" defaultValue>Selecciona una central</option>
                        {
                        centrales.length > 0 ? (
                            centrales.map((c, key) => {
                                return (
                                    <option key={key} value={c.id}>{c.nombre}</option>
                                );
                            })
                        ) : (
                            <option value="0" defaultValue>No hay centrales</option>
                        )
                    }</select>
                </div>
            </div>
            <div className="fixed-head w-100 mt-4">
                <table className="table table-striped">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="options">Opciones</th>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Nivel</th>
                            <th>Central</th>
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
                                                    onClick={() => history.push(`/permisos/usuario/${r.id}`)}
                                                ><i className="fab fa-windows"></i></button>
                                            </td>
                                            <td>{r.nombre}</td>
                                            <td>{r.usuario}</td>
                                            <td>{r.nivel}</td>
                                            <td>{r.nomcentral}</td>
                                            <td>{r.activo ? 'Activo' : 'No activo'}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6">No se encontraron usuarios registrados</td>
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

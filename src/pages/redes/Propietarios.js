import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/clientAxios';

import {
    buscarTodosLosRegistros,
    eliminarRegistro
} from '../../functions';

const Propietarios = () => {

    const[load, setLoad] = useState(true);
    const[propietarios, setPropietarios] = useState([]);
    const[red, setRed] = useState({});

    useEffect(() => {
        if(load){
            const path = window.location.pathname.split('/');
            const id = path[3];
            const token = localStorage.getItem('token');
            clientAxios.get(`/redes/get/${id}`, {headers: {access:token}})
            .then(res => {
                setRed(res.data[0]);
            })
            .catch(err => {

            });
            buscarTodosLosRegistros(`/redes/get/propietarios`, setPropietarios, {idred: id});
            setLoad(false);
        }
    }, [load]);

    const eliminarPropietario = id => {
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
                /*
                const result = await eliminarRegistro(`/redes/eliminar/propietario/${}`, id);
                if(result.type === 'success'){
                    handleLoading();
                } else {
                    lanzarError(result.text);
                }
                */
            }
        })
    }

    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Administrar red: #{red.numero}</h2>
                <div>
                    <Link to="/redes" className="btn btn-info mr-3">Volver</Link>
                    <button
                        className="btn btn-success"
                    >Nuevo Propietario</button>
                </div>
            </div>
            <div className="fixed-head w-100 mt-4">
                <table className="table table-striped">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="width-160">Menu</th>
                            <th>Id</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody className="first-td-bold">
                        {
                            propietarios.length > 0 ? (
                                propietarios.map((r, key) => {
                                    return(
                                        <tr key={key}>
                                            <td className="text-center">
                                                <button 
                                                    className="btn btn-danger btn-icon" 
                                                    title="Eliminar"
                                                    onClick={() => eliminarPropietario(r.id)}
                                                ><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                            <td>{r.id}</td>
                                            <td>{r.compania}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="3">No hay resultados de la busqueda</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Propietarios

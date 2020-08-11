import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';

import clientAxios from '../config/clientAxios';

//Functions
import {
    eliminarRegistro, 
    buscarRegistroById,
    agregarNuevoEditar,
    lanzarError
} from '../functions';
import useData from '../hooks/useData';

const Borro = () => {

    const[show, setShow] = useState(false);
    const[view, setView] = useState({});

    const {rows, error, handleLoading} = useData('/borro/get/all');

    useEffect(() => {
        if(error){
            lanzarError(error);
        }
    }, [error]);

    const verRegistro = async (id, tabla) => {
        /*
        const token = localStorage.getItem('token');
        const result = await clientAxios.get(`/borro/get/${id}/${tabla}`, 
            {headers: {access:token}}
        );
        setShow(true);
        setView(result.data[0]);
        */
        alert('Visualizacion desactivada temporalmente');
    }

    const eliminarPermanentemente = id => {
        Swal.fire({
            title: '¿Estás seguro/a?',
            text: "Al eliminar este registro permanentemente no podrá ser recuperado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!'
        }).then(async res => {
            if(res.value) {
                const result = await eliminarRegistro('/borro/eliminar', id);
                if(result.type === 'success'){
                    handleLoading();
                } else {
                    lanzarError(result.text);
                }
            }
        })
    }

    const restaurarRegistro = async (id, id_tabla, tabla) => {
        const token = localStorage.getItem('token');
        const result = await clientAxios.get(`/borro/restaurar/${id}/${id_tabla}/${tabla}`, 
            {headers: {access:token}}
        );
        if(result.data.type === 'success'){
            Swal.fire({
                icon: result.data.type,
                title: result.data.title,
                text: result.data.text,
                timer: 1500
            });
            handleLoading();
        }
    }

    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Historial de registros borrados</h2>
            </div>
            <div className="fixed-head w-100 mt-4">
                <table className="table table-striped">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="options">Opciones</th>
                            <th>Usuario</th>
                            <th>Descripcion</th>
                            <th className="fecha">Fecha</th>
                            <th>Recomendación</th>
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
                                                    className="btn btn-success btn-icon" 
                                                    title="Restaurar"
                                                    onClick={() => restaurarRegistro(r.id, r.id_tabla, r.tabla)}
                                                ><i className="fas fa-undo-alt"></i></button>
                                                <button 
                                                    className="btn btn-warning btn-icon" 
                                                    title="Ver registro"
                                                    onClick={() => verRegistro(r.id_tabla, r.tabla)}
                                                ><i className="fas fa-eye"></i></button>
                                                <button 
                                                    className="btn btn-danger btn-icon m-0" 
                                                    title="Eliminar permanentemente"
                                                    onClick={() => eliminarPermanentemente(r.id)}
                                                ><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                            <td>{r.usuario}</td>
                                            <td>{r.titulo}</td>
                                            <td>{r.fecha}</td>
                                            <td>Al eliminar permanentemente este registro, no podrá ser recuperado</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5">No se encontraron empleados registrados</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Borro

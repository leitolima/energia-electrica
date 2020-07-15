import React,{useState, useEffect}  from 'react';
import Swal from 'sweetalert2';
import useData from '../../hooks/useData';

import ModalUsuario from '../../components/modals/ModalUsuario';
import clientAxios from '../../config/clientAxios';

const Usuarios = () => {

    const[show, setShow] = useState(false);
    const[usuario, setUsuario] = useState({
        usuario: '',
        clave: '',
        empleado: 0,
        nivel: 0,
        activo: 1
    });

    const {rows, error} = useData('/usuario/get/all');

    useEffect(() => {
        if(error){
            lanzarError(error);
        }
    }, [error]);

    const lanzarError = err => {
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: err,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Recargar'
        }).then((result) => window.location.reload(false));
    }

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = () => {
        const token = localStorage.getItem('token');
        clientAxios.post('/usuario/nuevo', usuario, {headers: {access:token}})
        .then(res => {
            if(res.data.type === 'notok') throw new Error(res.data.text);
            Swal.fire({
                icon: res.data.type,
                title: res.data.title,
                text: res.data.text
            });
            if(res.data.type === 'success') handleClose();
        })
        .catch(err => {
            lanzarError(err);
        })
    }

    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Administrar permisos</h2>
                <button 
                    type="button"
                    className="btn btn-success"
                    onClick={handleOpen}
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
                                            <td>Opciones</td>
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
                        <tr>
                            <td>
                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                                <button className="btn btn-success btn-icon" title="Accesos"><i className="fab fa-windows"></i></button>
                            </td>
                            <td>Susana Horia</td>
                            <td>susanahoria</td>
                            <td>Empleado</td>
                            <td>Activo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ModalUsuario
                show={show}
                usuario={usuario}
                handleClose={handleClose}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
        
    )
}

export default Usuarios

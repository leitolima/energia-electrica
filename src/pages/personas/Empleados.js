import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import useData from '../../hooks/useData';

import ModalEmpleado from '../../components/modals/ModalEmpleado';
import clientAxios from '../../config/clientAxios';

const Empleados = () => {

    const[show, setShow] = useState(false);
    const[load, setLoad] = useState(true);
    const[empleado, setEmpleado] = useState({
        nombre: '',
        fecha: '',
        dni: '',
        email: '',
        telefono: ''
    });

    const {rows, error} = useData('/empleado/get/all', load);

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

    const handleChange = e => {
        setEmpleado({
            ...empleado,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = () => {
        const token = localStorage.getItem('token');
        clientAxios.post('/empleado/nuevo', empleado, {headers: {access:token}})
        .then(res => {
            if(res.data.type === 'notok') throw new Error(res.data.text);
            Swal.fire({
                icon: res.data.type,
                title: res.data.title,
                text: res.data.text
            });
            if(res.data.type === 'success') {setShow(false);setLoad(true);}
        })
        .catch(err => {
            lanzarError(err);
        })
    }

    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Administrar empleados</h2>
                <button 
                    type="button"
                    className="btn btn-success"
                    onClick={() => setShow(true)}
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
                                                <button className="btn btn-warning btn-icon" title="Editar"><i className="fas fa-pen"></i></button>
                                                <button className="btn btn-danger btn-icon" title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                            <td>{r.nombre}</td>
                                            <td>{r.dni}</td>
                                            <td>{r.fecha_nac}</td>
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
                empleado={empleado}
                handleClose={() => setShow(false)}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Empleados

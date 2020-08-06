import React, {useState, useEffect} from 'react';
import clientAxios from '../../config/clientAxios';
import {Link} from 'react-router-dom';
import {agregarNuevoEditar} from '../../functions';

const Accesos = () => {

    const[load, setLoad] = useState(true);
    const[user, setUser] = useState({});
    const[accesos, setAccesos] = useState([]);
    const[keys, setKeys] = useState([]);

    useEffect(() => {
        if(load){
            const path = window.location.pathname.split('/');
            const id = path[3];
            const token = localStorage.getItem('token');
            clientAxios.get(`/accesos/get/${id}`, {headers: {access:token}})
                .then(res => {
                    setUser(res.data.usuario[0]);
                    setKeys(Object.keys(res.data.accesos[0]));
                    setAccesos(res.data.accesos);
                    setLoad(false);
                })
                .catch(err => {

                });
        }
    }, [load]);

    const handleGuardarPermisos = () => {
        agregarNuevoEditar('')
    }

    const handleOnChange = (id, value, key) => {
        if(value){value = 1;} else {value = 0;}
        let array = accesos;
        //Actualizacion de un acceso
        let arrAccess = array.filter(element => {
            if(element.menu === id){
                element[key] = value;
            }
            return element
        });
        setAccesos(arrAccess);
    }

    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Administrar permisos de: {user.nombre} ({user.usuario})</h2>
                <div>
                    <Link to="/personas/usuarios" className="btn btn-info mr-3">Volver</Link>
                    <button 
                        className="btn btn-success"
                        onClick={handleGuardarPermisos}
                    >Guardar permisos</button>
                </div>
            </div>
            <div className="fixed-head w-100 mt-4">
                <table className="table table-striped">
                    <thead className="thead-dark thead-border-top">
                        <tr>
                            <th className="width-160">Menu</th>
                            <th>Titulo</th>
                            <th className="width-160 text-center">Alta</th>
                            <th className="width-160 text-center">Baja</th>
                            <th className="width-160 text-center">Modificación</th>
                            <th className="width-160 text-center">Consulta</th>
                        </tr>
                    </thead>
                    <tbody className="first-td-bold">
                        {
                            accesos.length > 0 ? (
                                accesos.map((a, key) => {
                                    return(
                                        <tr key={key}>
                                            <td className="text-center">{a.menu}</td>
                                            <td>{a.titulo}</td>
                                            <td className="text-center">
                                                <input 
                                                    type="checkbox" 
                                                    defaultChecked={a.a}
                                                    onChange={() => handleOnChange(a.menu, !a.a, keys[3])}
                                                />
                                            </td>
                                            <td className="text-center">
                                                <input 
                                                    type="checkbox" 
                                                    defaultChecked={a.b}
                                                    onChange={() => handleOnChange(a.menu, !a.b, keys[4])}
                                                />
                                            </td>
                                            <td className="text-center">
                                                <input 
                                                    type="checkbox" 
                                                    defaultChecked={a.m}
                                                    onChange={() => handleOnChange(a.menu, !a.m, keys[5])}
                                                />
                                            </td>
                                            <td className="text-center">
                                                <input 
                                                    type="checkbox" 
                                                    defaultChecked={a.c}
                                                    onChange={() => handleOnChange(a.menu, !a.c, keys[6])}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6">No hay resultados de la busqueda</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Accesos

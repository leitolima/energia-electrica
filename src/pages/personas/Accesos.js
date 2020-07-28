import React, {useState, useEffect} from 'react';
import clientAxios from '../../config/clientAxios';

const Accesos = () => {

    const[load, setLoad] = useState(true);
    const[user, setUser] = useState({});
    const[accesos, setAccesos] = useState([]);

    useEffect(() => {
        if(load){
            const path = window.location.pathname.split('/');
            const id = path[3];
            const token = localStorage.getItem('token');
            clientAxios.get(`/accesos/get/${id}`, {headers: {access:token}})
                .then(res => {
                    setUser(res.data.usuario[0]);
                    setAccesos(res.data.accesos);
                })
                .catch(err => {

                });
        }
    }, []);

    return (
        <div className="container-fluid mt-4">
            <div className="d-flex flex-row justify-content-between">
                <h2>Administrar permisos de: {user.nombre} ({user.usuario})</h2>
                <button className="btn btn-success">Guardar permisos</button>
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
                        <tr>
                            <td className="text-center">1</td>
                            <td>Empleados</td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">2</td>
                            <td>Usuarios</td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">3</td>
                            <td>Centrales</td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">4</td>
                            <td>Estaciones primarias</td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">5</td>
                            <td>Estaciones secundarias</td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">6</td>
                            <td>Transformadores</td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">7</td>
                            <td>Compañias</td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox"/>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Accesos

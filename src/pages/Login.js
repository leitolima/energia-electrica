import React, {useState} from 'react';
import clientAxios from '../config/clientAxios';
import {useHistory} from 'react-router';
import {toast} from 'react-toastify';

const Login = () => {

    const[login, setLogin] = useState({usuario: '', clave: ''});
    
    const history = useHistory();

    const handleChange = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        clientAxios.post('/login', login)
            .then(res => {
                if(res.data.auth){
                    localStorage.setItem('token', res.data.token);
                    window.location.replace('/');
                } else {
                    return toast.error('Usuario o contraseña invalidos.');
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <div id="login">
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form 
                                id="login-form" 
                                className="form" 
                                onSubmit={handleSubmit}
                            >
                            <h3 className="text-center text-info pt-4">Login</h3>
                                <div className="form-group">
                                    <label htmlFor="usuario" className="text-info mt-2">Usuario:</label>
                                    <input 
                                        type="text" 
                                        name="usuario" 
                                        id="usuario" 
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Clave:</label>
                                    <input 
                                        type="password" 
                                        name="clave" 
                                        id="clave" 
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="submit" 
                                        name="submit" 
                                        className="btn btn-info btn-outline-secondary btn-block text-white" 
                                        value="Enviar"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login



import React, {useState, useEffect, useMemo, useContext} from 'react';
import clientAxios from '../config/clientAxios';

const UsuarioContext = React.createContext();

export const UsuarioProvider = props => {
    const[usuario, setUsuario] = useState(null);
    const[load, setLoad] = useState(false);

    useEffect(() => {
        if(!load){
            const token = localStorage.getItem('token');
            clientAxios.get('/accesos/misaccesos', {headers: {access:token}})
                .then(res => {
                    setUsuario(res.data);
                    setLoad(true);
                });
        }
    }, [load]);

    const value = useMemo(() => {
        return({
            usuario
        })
    }, [usuario]);

    return <UsuarioContext.Provider value={value} {...props}/>
}

export const useUsuario = () => {
    const context = useContext(UsuarioContext);
    if(!context){
        throw new Error('useUsuario debe estar dentro del proveedor de UsuarioContext');
    } return context;
}
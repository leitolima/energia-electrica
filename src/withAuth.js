import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import clientAxios from './config/clientAxios';

export default function withAuth(Component){
    return(() => {
        const[loading, setLoading] = useState(true);
        const[redirect, setRedirect] = useState(false);

        useEffect(() => {
            async function fetchData(){
                const token = localStorage.getItem('token');
                await clientAxios.get('/api/checktoken', {
                    headers: {
                        access: token
                    }
                })
                .then(res => {
                    if(res.status === 200){
                        setLoading(false);
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    setLoading(false);
                    setRedirect(true);
                })
            }
            fetchData();
        }, []);

        const renderComponent = () => {
            if(loading){
                return null
            }
            if(redirect){
                return <Redirect to='/login'/>
            }
            return <Component/>
        }
    
        return(
            renderComponent()
        )
    })
}
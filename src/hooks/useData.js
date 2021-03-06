import {useState, useEffect} from 'react';

import clientAxios from '../config/clientAxios';

const useData = (url, filtro = {}) => {
    const[loading, setLoading] = useState(true);
    const[rows, setRows] = useState([]);
    const[error, setError] = useState(null);

    useEffect(() => {
        if(loading){
            const token = localStorage.getItem('token');
            clientAxios.post(url, filtro, {
                headers: {access:token}
            })
            .then(res => {
                if(res.data.type === 'notok') throw new Error(res.data.text);
                setLoading(false);
                setRows(res.data);
            })
            .catch(err => {
                setError(err);
            });
        }
        // eslint-disable-next-line
    }, [loading])

    const handleLoading = () => {
        setLoading(true);
    }

    return{
        rows,
        error,
        handleLoading,
        setLoading
    }
}

export default useData;
import {useState, useEffect} from 'react';
import clientAxios from '../config/clientAxios';

const useData = (url) => {
    const[rows, setRows] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        if(loading){
            const token = localStorage.getItem('token');
            clientAxios.get(url, {headers: {access:token}})
            .then(res => {
                if(res.data.type === 'notok') throw new Error(res.data.text);
                console.log(res.data);
                setLoading(false);
                setRows(res.data);
            })
            .catch(err => {
                setError(err);
            });
        }
    }, [loading]);

    return {
        rows,
        error
    }
}

export default useData

import {useState, useEffect} from 'react';
import clientAxios from '../config/clientAxios';

const useData = (url, load) => {
    const[rows, setRows] = useState([]);
    const[error, setError] = useState(null);

    useEffect(() => {
        if(load){
            const token = localStorage.getItem('token');
            clientAxios.get(url, {headers: {access:token}})
            .then(res => {
                if(res.data.type === 'notok') throw new Error(res.data.text);
                console.log(res.data);
                setRows(res.data);
            })
            .catch(err => {
                setError(err);
            });
        }
    }, [load]);

    return {
        rows,
        error
    }
}

export default useData

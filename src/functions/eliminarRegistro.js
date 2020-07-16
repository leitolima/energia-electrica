import clientAxios from '../config/clientAxios';

export default async function eliminarRegistro(url, id){
    const token = localStorage.getItem('token');
    const result = await clientAxios.get(`${url}/${id}`, {headers: {access:token}})
    return result.data;
}
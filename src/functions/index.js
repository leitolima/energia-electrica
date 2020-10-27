import clientAxios from '../config/clientAxios';
import Swal from 'sweetalert2';

export function lanzarError(err){
    Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: err,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
    });
}

//Se utiliza la funcion para editar registro y agregar nuevo
export async function agregarNuevoEditar(url, data){
    const token = localStorage.getItem('token');
    const result = await clientAxios.post(url, data, {
        headers: {access:token}
    });
    if(result.data.type === 'success'){
        Swal.fire({
            icon: result.data.type,
            title: result.data.title,
            text: result.data.text,
            timer: 1500
        });
    } return result.data;
}

export async function eliminarRegistro(url, id){
    const token = localStorage.getItem('token');
    const result = await clientAxios.get(`${url}/${id}`, {
        headers: {access:token}
    })
    //Devuelve un objeto {...}
    if(result.data.type === 'success'){
        Swal.fire({
            icon: result.data.type,
            title: result.data.title,
            text: result.data.text,
            timer: 1500
        });
    }
    return result.data;
}

export async function buscarRegistroById(url, id){
    const token = localStorage.getItem('token');
    //Devuelve un array con un objeto [{...}]
    const result = await clientAxios.get(`${url}/${id}`, {headers: {access:token}})
    //Retorna el objeto
    return result.data[0];
}

export async function buscarTodosLosRegistros(url, fn, data = {}){
    const token = localStorage.getItem('token');
    const result = await clientAxios.post(url, data, {headers: {access:token}})
    fn(result.data);
    return 
}

export async function cargaDeDatos(data){
    const token = localStorage.getItem('token');
    const result = await clientAxios.post('/energia/carga', data, {headers: {access:token}});
    Swal.fire({
        icon: result.data.type,
        title: result.data.title,
        text: result.data.text,
        timer: 1500
    });
}
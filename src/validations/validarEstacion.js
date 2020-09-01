export default function validarEstacion(valores){
    let errores = [];

    if(!valores.nombre){
        errores.push('El nombre es obligatorio.');
    }else if(valores.nombre.length > 100){
        errores.push('El nombre es demasiado largo.');
    }
    return errores;
}
export default function validarEstacion(valores){
    let errores = [];

    if(!valores.nombre){
        errores.push('El nombre es obligatorio.');
    }else if(valores.nombre.length > 100){
        errores.push('El nombre es demasiado largo.');
    }
    if(valores.provincia === 0){
        errores.push('Debe seleccionar una provincia.');
    }
    if(valores.central === 0){
        errores.push('Debe seleccionar una central proveedora.');
    }
    return errores;
}
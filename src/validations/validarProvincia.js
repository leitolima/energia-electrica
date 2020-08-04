export default function validarProvincia(valores){
    let errores = [];

    if(!valores.nombre){
        errores.push('El nombre es obligatorio.');
    } else if(valores.nombre.length > 100){
        errores.push('El nombre es demasiado largo.');
    }

    if(!valores.codigo){
        errores.push('El código es obligatorio.');
    } else if(valores.codigo.length > 10){
        errores.push('El código es demasiado largo.');
    }

    return errores;
}
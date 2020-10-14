export default function validarUsuario(valores){
    let errores = [];

    //nombre
    if(!valores.usuario){
        errores.push('El nombre es obligatorio.');
    } else if(valores.usuario.length > 25){
        errores.push('El nombre es demasiado largo.');
    }
    //clave
    if(!valores.clave){
        errores.push('La clave es obligatoria.');
    }
    //empleado
    if(valores.empleado === 0){
        errores.push('Seleccione un empleado.');
    }
    //nivel
    if(valores.nivel === 0){
        errores.push('Selecione un nivel.');
    }

    return errores;
}
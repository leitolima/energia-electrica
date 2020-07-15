export default function validarUsuario(valores){
    let errores = {};

    //nombre
    if(!valores.usuario){
        errores.usuario = 'El nombre es obligatorio.';
    } else if(valores.usuario.length > 25){
        errores.usuario = 'El nombre es demasiado largo.';
    }
    //clave
    if(!valores.clave){
        errores.dni = 'La clave es obligatoria.';
    }
    //empleado
    if(valores.empleado == 0){
        errores.empleado = 'Seleccione un empleado.';
    }
    //nivel
    if(valores.nivel == 0){
        errores.nivel = 'Selecione un nivel.';
    }

    return errores;
}
export default function validarEmpleado(valores){
    let errores = {};

    //nombre
    if(!valores.nombre){
        errores.nombre = 'El nombre es obligatorio.';
    } else if(valores.nombre.length > 75){
        errores.nombre = 'El nombre es demasiado largo.';
    }
    //dni
    if(!valores.dni){
        errores.dni = 'El DNI es obligatorio.';
    } else if(valores.dni.length > 8){
        errores.dni = 'El DNI es demasiado largo.';
    }
    //fecha
    if(!valores.fecha){
        errores.fecha = 'La fecha de nacimiento es obligatoria.'
    }
    //email
    if(!valores.email){
        errores.email = 'El email es obligatorio.';
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-0.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.email = 'El email no es valido.';
    } else if(valores.email.length > 150){
        errores.email = 'El email es demasiado largo.';
    }
    //El telefono no es obligatorio
    if(valores.telefono.length > 25){
        errores.telefono = 'El numero de telefónico es demasiado largo.'
    }

    return errores;
}
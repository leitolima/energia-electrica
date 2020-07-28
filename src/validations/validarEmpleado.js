export default function validarEmpleado(valores){
    let errores = [];

    //nombre
    if(!valores.nombre){
        errores.push('El nombre es obligatorio.');
    } else if(valores.nombre.length > 75){
        errores.push('El nombre es demasiado largo.');
    }
    //dni
    if(!valores.dni){
        errores.push('El DNI es obligatorio.');
    } else if(valores.dni.length > 8){
        errores.push('El DNI es demasiado largo.');
    }
    //fecha
    /*
    if(!valores.fecha_nac){
        errores.push('La fecha de nacimiento es obligatoria.');
    }
    */
    //email
    if(!valores.email){
        errores.push('El email es obligatorio.');
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-0.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.push('El email no es valido.');
    } else if(valores.email.length > 150){
        errores.push('El email es demasiado largo.');
    }
    //El telefono no es obligatorio
    if(valores.telefono.length > 25){
        errores.push('El numero de telefónico es demasiado largo.');
    }

    return errores;
}
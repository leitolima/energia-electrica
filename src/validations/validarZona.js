export default function validarZona(valores){
    let errores = [];

    if(!valores.nombre){
        errores.push('El nombre es obligatorio.');
    }else if(valores.nombre.length > 100){
        errores.push('El nombre es demasiado largo.');
    }

    if(!valores.idprovincia){
        errores.push('El código es obligatorio.');
    }else if(valores.idprovincia === 0){
        errores.push('Debe elegir un codigo de provincia.');
    }

    if(valores.particulares === 0){
        errores.push('Ingrese un número de consumidores particulares.');
    }
    if(valores.empresas === 0){
        errores.push('Ingrese un número de empresas.');
    }
    if(valores.instituciones === 0){
        errores.push('Ingrese un número de instituciones.');
    }

    return errores;
}
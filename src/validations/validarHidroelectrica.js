export default function validarHidroelectrica(valores){
    let errores = [];

    if(!valores.nombre){
        errores.push('El nombre es obligatorio.');
    } else if(valores.nombre.length > 100){
        errores.push('El nombre es demasiado largo.');
    }
    if(valores.provincia === 0){
        errores.push('Debe seleccionar una provincia');
    }
    if(!valores.prod_media || valores.prod_media === 0){
        errores.push('La producción media es obligatoria.');
    } else if(valores.prod_media < 0){
        errores.push('La producción media no puede ser un valor negativo.');
    }
    if(!valores.prod_maxima || valores.prod_maxima === 0){
        errores.push('La producción máxima es obligatoria.');
    } else if(valores.prod_maxima < 0){
        errores.push('La producción máxima no puede ser un valor negativo.');
    }
    if(!valores.num_turbinas || valores.num_turbinas === 0){
        errores.push('El numero de turbinas es obligatorio.');
    } else if(valores.num_turbinas < 0){
        errores.push('El numero de turbinas no puede ser un valor negativo.');
    }
    if(!valores.ocupacion || valores.ocupacion === 0){
        errores.push('La ocupación es obligatoria.');
    } else if(valores.vol_plut_consum < 0){
        errores.push('La ocupación no puede ser un valor negativo.');
    }
    if(!valores.capacidad || valores.capacidad === 0){
        errores.push('La capacidad es obligatorio.');
    } else if(valores.vol_residuo < 0){
        errores.push('La capacidad no puede ser un valor negativo.');
    }

    return errores;
}
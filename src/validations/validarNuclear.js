export default function validarSolar(valores){
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
    if(!valores.num_reactores || valores.num_reactores === 0){
        errores.push('El numero de reactores es obligatorio.');
    } else if(valores.num_reactores < 0){
        errores.push('El numero de reactores no puede ser un valor negativo.');
    }
    if(!valores.vol_plut_consum || valores.vol_plut_consum === 0){
        errores.push('El volumen de plutonio es obligatorio.');
    } else if(valores.vol_plut_consum < 0){
        errores.push('El volumen de plutonio no puede ser un valor negativo.');
    }
    if(!valores.vol_residuo || valores.vol_residuo === 0){
        errores.push('El volumen de residuos nucleares es obligatorio.');
    } else if(valores.vol_residuo < 0){
        errores.push('El volumen de residuos no puede ser un valor negativo.');
    }

    return errores;
}
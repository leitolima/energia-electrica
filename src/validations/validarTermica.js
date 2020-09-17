export default function validarTermica(valores){
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
    if(!valores.num_hornos || valores.num_hornos === 0){
        errores.push('El numero de hornos es obligatorio.');
    } else if(valores.num_hornos < 0){
        errores.push('El numero de hornos no puede ser un valor negativo.');
    }
    if(!valores.vol_carbon_consum || valores.vol_carbon_consum === 0){
        errores.push('El volumen de carbon consumido es obligatorio.');
    } else if(valores.vol_carbon_consum < 0){
        errores.push('El volumen de carbon no puede ser un valor negativo.');
    }
    if(!valores.vol_emision_gases || valores.vol_emision_gases === 0){
        errores.push('El volumen de emision de gases es obligatorio.');
    } else if(valores.vol_emision_gases < 0){
        errores.push('El volumen de gases no puede ser un valor negativo.');
    }

    return errores;
}
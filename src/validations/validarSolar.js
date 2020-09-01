export default function validarSolar(valores){
    let errores = [];

    if(!valores.nombre){
        errores.push('El nombre es obligatorio.');
    } else if(valores.nombre.length > 100){
        errores.push('El nombre es demasiado largo.');
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
    if(!valores.sup_paneles || valores.sup_paneles === 0){
        errores.push('La superficie de paneles es obligatoria.');
    } else if(valores.sup_paneles < 0){
        errores.push('La superficie de paneles no puede ser un valor negativo.');
    }
    if(!valores.media_hs_sol || valores.media_hs_sol === 0){
        errores.push('La media de horas de sol es obligatoria.');
    } else if(valores.media_hs_sol < 0){
        errores.push('La media de horas de sol no puede ser un valor negativo.');
    }
    if(valores.tipo_panel === 0){
       errores.push('Debe seleccionar el tipo de central solar.'); 
    }

    return errores;
}
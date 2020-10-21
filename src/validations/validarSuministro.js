export default function validarSuministro(valores){
    let errores = [];

    if(!valores.nombre){
        errores.push('El nombre es obligatorio.');
    }else if(valores.nombre.length > 100){
        errores.push('El nombre es demasiado largo.');
    }
    if(!valores.central){
        errores.push('La central es obligatoria');
    }
    if(!valores.pais){
        errores.push('El nombre del pais es obligatorio');
    }else if(valores.pais.length > 50){
        errores.push('El nombre del país es demasiado largo');
    }
    if(!valores.transportista){
        errores.push('El transportista es obligatorio');
    }
    if(!valores.cant_plutonio){
        errores.push('El volumen del plutonio es obligatorio');
    }else if(valores.cant_plutonio.length > 11){
        errores.push('El volumen del plutonio es demasiado largo');
    }
    return errores;
}
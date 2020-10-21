export default function validarCompra(valores){
    let errores = [];

    if(!valores.central){
        errores.push('La central es obligatoria');
    }
    /*if(!valores.cant_plutonio){
        errores.push('El volumen del plutonio es obligatorio');
    }else if(valores.cant_plutonio.length > 11){
        errores.push('El volumen del plutonio es demasiado largo');
    }*/
    return errores;
}
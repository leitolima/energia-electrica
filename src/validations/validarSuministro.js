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
    return errores;
}
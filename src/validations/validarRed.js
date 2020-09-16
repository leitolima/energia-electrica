export default function validarRed(valores){
    let errores = [];

    if(!valores.idred){
        errores.push('El numero de red es obligatorio.');
    } else if(valores.idred.length > 10){
        errores.push('El numero de red es demasiado largo.');
    }


    return errores;
}
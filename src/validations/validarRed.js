export default function validarRed(valores){
    let errores = [];

    if(!valores.numero){
        errores.push('El número de red es obligatorio.');
    } else if(valores.numero.length > 10){
        errores.push('El número de red es demasiado largo.');
    }


    return errores;
}
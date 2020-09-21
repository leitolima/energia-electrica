export default function validarSubestacion(valores){
    let errores = [];

    if(valores.linea == 0){
        errores.push('Debe seleccionar una línea.');
    }
    if(valores.provincia == 0){
        errores.push('Debe seleccionar una provincia.');
    }

    return errores;
}
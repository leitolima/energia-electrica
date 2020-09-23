export default function validarPropietarioRed(valores){
    let errores = [];

    if(valores.compania === 0){
        errores.push('Debe elegir una compañia.');
    }

    return errores;
}
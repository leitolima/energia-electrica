export default function validarEstacion(valores){
    let errores = [];

    if(!valores.estacion){
        errores.push('Seleccione una estación.');
    }
    if(valores.codigo == ''){
        errores.push('Debe ingresar el codigo.');
    }
    return errores;
}
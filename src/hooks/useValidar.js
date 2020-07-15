import {useState, useEffect} from 'react';

const useValidar = (initialState, validar, fn) => {
    const[valores, setValores] = useState(initialState);
    const[errores, setErrores] = useState({});
    const[submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm){
            if(Object.keys(errores).length == 0){
                fn();
            }
            setSubmitForm(false);
        }
    }, [errores]);

    const handleSubmit = () => {
        const erroresValidacion = validar(valores);
        setSubmitForm(true);
        setErrores(erroresValidacion);
    }

    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.id]: e.target.value
        });
    }

    return{
        handleChange,
        handleSubmit,
        errores, 
        valores,
    }
}
export default useValidar;
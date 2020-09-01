import {useState, useEffect} from 'react';

const useValidar = (initialState, validar, fn) => {
    const[valores, setValores] = useState(initialState);
    const[errores, setErrores] = useState({});
    const[submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm){
            if(Object.keys(errores).length === 0){
                fn();
                setValores(initialState);
            }
            setSubmitForm(false);
        }
        // eslint-disable-next-line
    }, [errores]);

    const handleEditar = valor => {
        setValores(valor);
    }

    const handleSubmit = () => {
        const erroresValidacion = validar(valores);
        setSubmitForm(true);
        setErrores(erroresValidacion);
    }

    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.id]: e.target.type === 'select-one' ? (
                parseInt(e.target.value)) : (
                    e.target.value
                )
        });
    }

    return{
        handleChange,
        handleSubmit,
        errores, 
        valores,
        handleEditar
    }
}
export default useValidar;
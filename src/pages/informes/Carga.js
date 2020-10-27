import React, {useState,useEffect} from 'react';

import {
    buscarTodosLosRegistros,
    cargaDeDatos
} from '../../functions';


const Carga = () => {

    const [centrales,setCentrales] = useState([]);
    const [provincias,setProvincias] = useState([]);
    const [zonas,setZonas] = useState([]);
    const [load,setLoad] = useState(false);
    const [consumidores, setConsumidores] = useState([]);

    //tipo de carga
    const [tipocarga, setTipocarga] = useState(1);
    //States de consumo/produccion
    const[consumida, setConsumida] = useState({
        tipo_carga: 2,
        con_fecha_consumo: '',
        con_provincia: 0,
        con_zona: 0,
        con_vol_energia: 0,
        id_consumidores_fk: 0
    });
    const[producida, setProducida] = useState({
        tipo_carga: 1,
        pro_fecha_consumo:'',
        pro_central: '',
        pro_vol_energia: 0
    })

    const setFechas = () => {
        const date = new Date();
        let dia = date.getDate();
        if (dia < 10) dia = "0" + dia;
        let mes = date.getMonth() + 1;
        if (mes < 10) mes = "0" + mes;
        let anio = date.getFullYear();
        let fecha = anio + '-' + mes + '-' + dia;
        document.getElementById('con_fecha_carga').value = fecha;
        document.getElementById('pro_fecha_carga').value = fecha;
    }

    useEffect(() => {
        if(!load){
            setFechas();
            buscarTodosLosRegistros('/centrales/get/all', setCentrales);
            buscarTodosLosRegistros('/provincias/get/all', setProvincias);
            setLoad(true);
        }
        // eslint-disable-next-line
    }, [load])

    useEffect(() => {
        if(consumidores.length > 0){
            const particulares = document.getElementById('con_particulares');
            const empresas = document.getElementById('con_empresas');
            const instituciones = document.getElementById('con_instituciones');
            particulares.value = consumidores[0].particulares;
            empresas.value = consumidores[0].empresas;
            instituciones.value = consumidores[0].instituciones;
            setConsumida({
                ...consumida,
                id_consumidores_fk: consumidores[0].id
            })
        }
        // eslint-disable-next-line
    }, [consumidores]);


    const changeRadio = (e) => {
        const radio = e.target.dataset.form;
        if(radio === 'producida'){
            setTipocarga(1);
        } else {
            setTipocarga(2);
        }
        const opuesto = e.target.dataset.op;
        const formulario = document.getElementById(radio);
        const formulario2 = document.getElementById(opuesto);
        formulario.classList.toggle("d-none");
        formulario2.classList.toggle("d-none");
    }

    const traerZonas = (e) => {
        const provincia = e.target.value;
        if(provincia === 0){
            setZonas([]);
        }else{
            buscarTodosLosRegistros('/zonas/provincia', setZonas, {id:provincia});
        }
    }

    const traerConsumidores = e => {
        const zona = e.target.value;
        const particulares = document.getElementById('con_particulares');
        const empresas = document.getElementById('con_empresas');
        const instituciones = document.getElementById('con_instituciones');
        if(zona === 0){
            setConsumidores([]);
            particulares.value = 0;
            empresas.value = 0;
            instituciones.value = 0;
        } else {
            buscarTodosLosRegistros('/consumidores/zona', setConsumidores, {id: zona});
        }
    }

    const handleChange = e => {
        if(tipocarga === 1){
            setProducida({
                ...producida,
                [e.target.id]: e.target.value
            })
        } else {
            setConsumida({
                ...consumida,
                [e.target.id]: e.target.value
            })
        }
    }

    const registrarCarga = () => {
        if(tipocarga === 1){
            cargaDeDatos(producida);
        } else {
            cargaDeDatos(consumida);
        }
    }

    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <h1 className="d-block">Carga de datos</h1>
            </div>
            <div className="row mt-2">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" defaultChecked="true" type="radio" name="inlineRadioOptions" id="inlineRadio1" data-op="consumida" onChange={changeRadio} data-form="producida" value="option1"/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Energía Producida</label>
                </div>
                <div className="form-check form-check-inline ml-3">
                    <input className="form-check-input" type="radio" data-form="consumida" onChange={changeRadio} data-op="producida" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                    <label className="form-check-label" htmlFor="inlineRadio2">Energía Consumida</label>
                </div>
            </div>
            {/* ENERGIA PRODUCIDA */}
            <div id="producida" className="row jumbotron mt-3">
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label htmlFor="pro_fecha_carga">Fecha de carga: </label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="pro_fecha_carga"
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label htmlFor="pro_fecha_consumo">Fecha de consumo: </label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="pro_fecha_consumo"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <label htmlFor="pro_central">Central Productora: </label>
                    <select 
                        className="form-control" 
                        id="pro_central"
                        onChange={handleChange}
                    >
                        <option value="0">Seleccione central</option>
                        {
                            centrales.map((e, key) => {
                                return(
                                    <option key={key} value={e.id}>{e.nombre}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label htmlFor="pro_vol_energia">Volumen de energía: </label>
                        <input 
                            type="text"
                            className="form-control" 
                            id="pro_vol_energia"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-md-12 col-lg-12 col-xl-12 my-3 d-flex flex-row justify-content-end">
                    <button className="btn btn-success" onClick={registrarCarga}>Registrar</button>
                </div>
            </div>

            {/* ENERGIA CONSUMIDA */}
            <div id="consumida" className="row jumbotron mt-2 d-none" >
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label htmlFor="con_fecha_carga">Fecha de carga: </label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="con_fecha_carga"
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label htmlFor="con_fecha_consumo">Fecha de consumo: </label>
                        <input 
                            type="date" 
                            className="form-control" 
                            id="con_fecha_consumo"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label htmlFor="con_provincia">Provincia: </label>
                        <select 
                            className="form-control" 
                            id="con_provincia"
                            onChange={e => {
                                traerZonas(e);
                                handleChange(e);
                            }}
                        >
                            <option value="0">Seleccione la provincia</option>
                            {
                            provincias.map((e, key) => {
                                return(
                                    <option key={key} value={e.id}>{e.nombre}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label htmlFor="con_zona">Zona: </label>
                        <select 
                            className="form-control" 
                            id="con_zona"
                            onChange={e => {
                                traerConsumidores(e);
                                handleChange(e);
                            }}
                        >
                            <option value="0">Seleccione la zona</option>
                            {
                            zonas.map((e, key) => {
                                return(
                                    <option key={key} value={e.id}>{e.nombre}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                </div>  
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label htmlFor="con_vol_energia">Volumen de energía: </label>
                        <input 
                            type="text"
                            className="form-control" 
                            id="con_vol_energia"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-md-12 col-lg-12 col-xl-12 my-3">
                    <h3>Consumidores</h3>
                </div>
                <div className="col-md-4 col-lg-4 col-xl-4">
                    <div className="form-group">
                        <label htmlFor="con_particulares">Particulares: </label>
                        <input 
                            type="number"
                            className="form-control text-end" 
                            id="con_particulares"
                            disabled
                            defaultValue="0"
                        />
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 col-xl-4">
                    <div className="form-group">
                        <label htmlFor="con_empresas">Empresas: </label>
                        <input 
                            type="number"
                            className="form-control text-end" 
                            id="con_empresas"
                            disabled
                            defaultValue="0"
                        />
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 col-xl-4">
                    <div className="form-group">
                        <label htmlFor="con_instituciones">Instituciones: </label>
                        <input 
                            type="number"
                            className="form-control text-end" 
                            id="con_instituciones"
                            disabled
                            defaultValue="0"
                        />
                    </div>
                </div>
                <div className="col-md-12 col-lg-12 col-xl-12 my-3 d-flex flex-row justify-content-end">
                    <button className="btn btn-success" onClick={registrarCarga}>Registrar</button>
                </div>
            </div>
        </div>
    )
}

export default Carga

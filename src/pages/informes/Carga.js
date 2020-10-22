import React from 'react';

const Carga = () => {
    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <h1 className="d-block">Carga de datos</h1>
            </div>
            <div className="row mt-2">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" defaultChecked="true" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Energía Producida</label>
                </div>
                <div className="form-check form-check-inline ml-3">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
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
                        />
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <label htmlFor="pro_central">Central Productora: </label>
                    <select 
                        className="form-control" 
                        id="pro_central"
                    >
                        <option value="0">Seleccione central</option>
                    </select>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label htmlFor="pro_vol_energia">Volumen de energía: </label>
                        <input 
                            type="text"
                            className="form-control" 
                            id="pro_vol_energia"
                        />
                    </div>
                </div>
                <div className="col-md-12 col-lg-12 col-xl-12 my-3 d-flex flex-row justify-content-end">
                    <button className="btn btn-success">Registrar</button>
                </div>
            </div>

            {/* ENERGIA CONSUMIDA */}
            <div id="consumida" className="row jumbotron mt-2">
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
                        />
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label htmlFor="con_provincia">Provincia: </label>
                        <select 
                            className="form-control" 
                            id="con_provincia"
                        >
                            <option value="0">Seleccione la provincia</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label htmlFor="con_zona">Zona: </label>
                        <select 
                            className="form-control" 
                            id="con_zona"
                        >
                            <option value="0">Seleccione la zona</option>
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
                            className="form-control" 
                            id="con_particulares"
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 col-xl-4">
                    <div className="form-group">
                        <label htmlFor="con_empresas">Empresas: </label>
                        <input 
                            type="number"
                            className="form-control" 
                            id="con_empresas"
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 col-xl-4">
                    <div className="form-group">
                        <label htmlFor="con_instituciones">Instituciones: </label>
                        <input 
                            type="number"
                            className="form-control" 
                            id="con_instituciones"
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-12 col-lg-12 col-xl-12 my-3 d-flex flex-row justify-content-end">
                    <button className="btn btn-success">Registrar</button>
                </div>
            </div>
        </div>
    )
}

export default Carga

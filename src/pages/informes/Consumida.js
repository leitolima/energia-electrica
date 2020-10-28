import React, {useState,useEffect} from 'react';
import Highcharts from 'highcharts';

//Functions
import {
    buscarTodosLosRegistros
} from '../../functions';

const Consumida = () => {

    const [load, setLoad] = useState(false);
    const [graficar, setGraficar] = useState(false);
    const [reporte, setReporte] = useState([]);
    const [zonas, setZonas] = useState([]);
    const [consum, setConsumidores] = useState({});
    
    useEffect(() => {
        if(!load){
            buscarTodosLosRegistros('/consumidores/sumartodos', setConsumidores);
            
            buscarTodosLosRegistros('/energia/reporte/consumida', setReporte);
            buscarTodosLosRegistros('/zona/get/all', setZonas, {fprovincia: 0});
            setGraficar(true);
        }
    }, [load]);

    useEffect(() => {
        if(graficar && zonas.length > 0){
            dibujarGrafica();
            dibujarGrafica2();
        }
        // eslint-disable-next-line
    }, [graficar, zonas]);

    const dibujarGrafica = () => {
        let arrayData = [];
        for(var i = 0; i < reporte.length; i++){
            const nombrezona = zonas[i].nombre;
            const promedio = reporte[i].promedio;
            let temporal = [nombrezona, promedio];
            arrayData.push(temporal);
        }
        Highcharts.chart('containerConsumoZonas', {
            chart: {
                type: 'column'
            },
            colors: ['#6f42c1'],
            title: {
                text: 'Energía consumida por zona'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Energía consumida',
                data: arrayData,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    }

    const dibujarGrafica2 = () => {
        const {conparticulares, conempresas, coninstituciones} = consum;
        const total = conparticulares + conempresas + coninstituciones;
        const prom1 = (conparticulares*100) / total;
        const prom2 = (conempresas*100) / total;
        const prom3 = (coninstituciones*100) / total;
        const arrayData = [{
            name: 'Particulares',
            y: prom1
        }, {
            name: 'Empresas',
            y: prom2
        }, {
            name: 'Instituciones',
            y: prom3
        }];
        Highcharts.chart('containerConsumidores', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            colors: ['#0d6efd', '#fd7e14', '#dc3545'],
            title: {
                text: 'Tipos de consumidores'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Consumidores',
                colorByPoint: true,
                data: arrayData
            }]
        });        
    }

    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <h1 className="d-block">Informe de energía consumida</h1>
            </div>
            <div className="row mt-2">
                <div className="d-flex align-content-center col-md-6 col-lg-6 col-xl-6">
                    <div id="containerConsumoZonas" className="w-100 mx-auto"></div>
                </div>
                <div className="d-flex align-content-center col-md-6 col-lg-6 col-xl-6">
                    <div id="containerConsumidores" className="w-100 mx-auto"></div>
                </div>
            </div>
        </div>
    )
}

export default Consumida

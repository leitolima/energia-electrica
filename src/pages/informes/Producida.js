import React, {useState,useEffect} from 'react';
import Highcharts from 'highcharts';

//Functions
import {
    buscarTodosLosRegistros
} from '../../functions';

const Producida = () => {
    const [centrales,setCentrales] = useState([]);
    const [load, setLoad] = useState(false);
    const [graficar, setGraficar] = useState(false);
    const [reporte, setReporte] = useState([]);
    
    useEffect(() => {
        if(!load){
            buscarTodosLosRegistros('/centrales/get/all', setCentrales);
            setGraficar(true);
        }
    }, [load]);

    useEffect(() => {
        if(graficar && centrales.length > 0){
            console.log(centrales.length);
            dibujarGrafica();
        }
        // eslint-disable-next-line
    }, [graficar, centrales]);
    
    
    useEffect(() => {
            if(!load){
                buscarTodosLosRegistros('/energia/reporte/producida', setReporte);
                setGraficar(true);
            }
        }, [load]);

    const dibujarGrafica = () => {
        let arrayData = [];
        for(var i = 0; i < reporte.length; i++){
            const nombrecentral = centrales[i].nombre;
            const promedio = reporte[i].promedio;
            let temporal = [nombrecentral, promedio];   
            arrayData.push(temporal);
        }
        Highcharts.chart('containerPorductoresCentrales', {
            chart: {
                type: 'column'
            },
            colors: ['#6f42c1'],
            title: {
                text: 'Energía producida por central'
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
                name: 'Energía producida',
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

    /*const dibujarGrafica2 = () => {
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
    }*/

    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <h1 className="d-block">Informe de energía producida</h1>
            </div>
            <div className="row mt-2">
                <div className="d-flex align-content-center col-md-6 col-lg-6 col-xl-6">
                    <div id="containerPorductoresCentrales" className="w-100 mx-auto"></div>
                </div>
                <div className="d-flex align-content-center col-md-6 col-lg-6 col-xl-6">
                    <div id="containerConsumidores" className="w-100 mx-auto"></div>
                </div>
            </div>
        </div>
    )
}

export default Producida

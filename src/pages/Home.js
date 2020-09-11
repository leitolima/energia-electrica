import React, {useState, useEffect} from 'react';
import Highcharts from 'highcharts';

import clientAxios from '../config/clientAxios';

const Home = () => {

    const [load, setLoad] = useState(false);
    const [graficar, setGraficar] = useState(false);
    const [usuarios, setUsuarios] = useState(null);
    const [centrales, setCentrales] = useState(null);

    useEffect(() => {
        if(!load){
            const token = localStorage.getItem('token');
            clientAxios.get('/home', {headers: {access:token}})
            .then(res => {
                setUsuarios(res.data.usuarios);
                setCentrales(res.data.centrales);
                setLoad(false);
                setGraficar(true);
            })
        }
    }, [load]);

    useEffect(() => {
        if(graficar){
            console.log(usuarios);
            console.log(centrales);
            graficarUsuarios();
            graficarCentrales();
            setGraficar(false);
        }
    }, [graficar])

    const graficarUsuarios = () => {
        Highcharts.chart('containerUsuarios', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {text: 'Usuarios registrados'},
            accessibility: {
                announceNewData: {enabled: true},
                point: {valueSuffix: '%'}
            },
            plotOptions: {
                column: {stacking: 'percent'},
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {enabled: false},
                    showInLegend: true
                }
            },
            tooltip: { 
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
            series: [
                {
                    name: "Administradores",
                    colorByPoint: true,
                    data: [{
                        name: 'Administradores',
                        y: usuarios[0],
                        drilldown: 'Administradores'
                    }, {
                        name: 'Supervisores',
                        y: usuarios[1],
                        drilldown: 'Supervisores'
                    }, {
                        name: 'Empleados',
                        y: usuarios[2],
                        drilldown: 'Empleados'
                    }, {
                        name: 'Inactivos',
                        y: usuarios[3],
                        drilldown: 'Inactivos'
                    },
                ]}
            ]
        });
    }

    const graficarCentrales = () => {
        Highcharts.chart('containerCentrales', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {text: 'Centrales eléctricas'},
            accessibility: {
                announceNewData: {enabled: true},
                point: {valueSuffix: '%'}
            },
            plotOptions: {
                column: {stacking: 'percent'      },
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {enabled: false},
                    showInLegend: true
                }
            },
            tooltip: { 
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
            series: [
                {
                    name: "Centrales",
                    colorByPoint: true,
                    data: [
                        {
                            name: "Solares",
                            y: centrales[0],
                            drilldown: "Solares"
                        },
                        {
                            name: "Termica",
                            y: centrales[1],
                            drilldown: "Termica"
                        },
                        {
                            name: "Nucleares",
                            y: centrales[3],
                            drilldown: "Nucleares"
                        },
                        {
                            name: "Hidroelectrica",
                            y: centrales[4],
                            drilldown: "Hidroelectrica"
                        }
                ]}
            ]
        });
    }

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="d-flex align-content-center col-lg-6 col-xl-6">
                    <div id="containerUsuarios" className="w-100 mx-auto"></div>
                </div>
                <div className="d-flex align-content-center col-lg-6 col-xl-6">
                    <div id="containerCentrales" className="w-100 mx-auto"></div>
                </div>
            </div>
        </div>
    )
}

export default Home

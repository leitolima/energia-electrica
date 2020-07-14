import React, {useEffect} from 'react';
import Highcharts from 'highcharts';

const Pagina2 = () => {

    useEffect(() => {
        //Una vez montado el componente, se dibuja la grafica
        dibujarGrafica();
    })

    const dibujarGrafica = () => {
        /*
        'container' es el id del div en el cual se va a pintar la grafica
        */
        Highcharts.chart('container', {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'Generacion de energía esta semana por AES'
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
            },
            xAxis: {
                categories: [
                    'Lunes',
                    'Martes',
                    'Miercoles',
                    'Jueves',
                    'Viernes',
                    'Sabado',
                    'Domingo'
                ]
            },
            yAxis: {
                title: {
                    text: 'k-Watts'
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' kW'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: 'Formulado',
                color: '#ed8a42',
                data: [3600, 3400, 3750, 3800, 4000, 4200, 5100]
            },{
                name: 'Producido',
                color: '#04d40f',
                data: [3380, 3200, 3600, 3990, 4170, 4630, 3660]
            }]
        });
    }

    return (
        <div className="container">
            <h1>Pagina de pruebas 2</h1>
            <h3>Grafica de ondas</h3>
            <div id="container"></div>
        </div>
    )
}

export default Pagina2
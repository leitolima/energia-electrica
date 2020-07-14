import React, {useEffect} from 'react';
import Highcharts from 'highcharts';

const Pagina1 = () => {

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
                type: 'bar'
            },
            title: {
                text: 'Consumicion de frutas'
            },
            xAxis: {
                categories: ['Manzanas', 'Bananas', 'Naranjas', 'Kiwis']
            },
            yAxis: {
                title: {
                    text: 'Frutas consumidas'
                }
            },
            series: [{
                name: 'Leytho',
                data: [1, 0, 4, 10]
            }, {
                name: 'Enzito',
                data: [5, 7, 3, 6]
            }]
        });
    }

    return (
        <>
            <h1>Pagina de pruebas 1</h1>
            <h3>Grafica de barras horizontales</h3>
            <div id="container"></div>
        </>
    )
}

export default Pagina1

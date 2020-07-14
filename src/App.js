import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

//Pages
import Empleados from './pages/personas/Empleados';
import Usuarios from './pages/personas/Usuarios';
import Accesos from './pages/personas/Accesos';

import Login from './pages/Login';

import Subestaciones from './pages/estaciones/Subestaciones';

import Redes from './pages/Redes';
import Lineas from './pages/Lineas';
import Companias from './pages/Companias';

const App = () => {
    return (
        <Router>
            <Navbar/>
            <Sidebar/>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/" component={Root}/>
                <Route exact path="/personas/empleados" component={Empleados}/> 
                <Route exact path="/personas/usuarios" component={Usuarios}/>
                <Route exact path="/permisos/usuario/:id" component={Accesos}/>

                <Route exact path="/centrales/solares"/>
                <Route exact path="/centrales/hidroelectrica"/>
                <Route exact path="/centrales/termica"/>
                <Route exact path="/centrales/nuclear"/>

                <Route exact path="/estaciones/primarias"/>
                <Route exact path="/estaciones/secundarias" component={Subestaciones}/>

                <Route exact path="/redes" component={Redes}/> 
                <Route exact path="/lineas" component={Lineas}/>
                <Route exact path="/companias" component={Companias}/>
            </Switch>
        </Router>
    )
}

const Root = () => {
    return (
        <div>
            <h1>Sistema de energia electrica</h1>
        </div>
    )
}

export default App

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import withAuth from './withAuth';
//Alertas
import {ToastContainer} from 'react-toastify';

//Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

//Pages
import Empleados from './pages/personas/Empleados';
import Usuarios from './pages/personas/Usuarios';
import Accesos from './pages/personas/Accesos';

import Login from './pages/Login';

import Solar from './pages/centrales/Solar';
import Termica from './pages/centrales/Termica';

import Subestaciones from './pages/estaciones/Subestaciones';

import Redes from './pages/Redes';
import Lineas from './pages/Lineas';
import Companias from './pages/Companias';

const App = () => {
    return (
        <Router>            
            <Switch>
                <Route exact path="/login" component={Login}/>

                <Route path='/'>
                    <Navbar/>
                    <ToastContainer />
                    <Sidebar/>
                
                    <Route exact path="/" component={Root}/>
                    <Route exact path="/personas/empleados" component={Empleados}/> 
                    <Route exact path="/personas/usuarios" component={Usuarios}/>
                    <Route exact path="/permisos/usuario/:id" component={Accesos}/>

                    <Route exact path="/centrales/solares" component={Solar}/>
                    <Route exact path="/centrales/hidroelectrica"/>
                    <Route exact path="/centrales/termica" component={Termica}/>
                    <Route exact path="/centrales/nuclear"/>

                    <Route exact path="/estaciones/primarias"/>
                    <Route exact path="/estaciones/secundarias" component={Subestaciones}/>

                    <Route exact path="/redes" component={Redes}/> 
                    <Route exact path="/lineas" component={Lineas}/>
                    <Route exact path="/companias" component={Companias}/>
                </Route>
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

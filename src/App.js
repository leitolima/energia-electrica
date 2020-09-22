import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {UsuarioProvider} from './context';
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
import Home from './pages/Home';

import Solar from './pages/centrales/Solar';
import Termica from './pages/centrales/Termica';
import Nuclear from './pages/centrales/Nuclear';
import Hidroelectrica from './pages/centrales/Hidroelectrica';

import Estaciones from './pages/estaciones/Estaciones';
import Subestaciones from './pages/estaciones/Subestaciones';

import Redes from './pages/redes/Redes';
import Lineas from './pages/Lineas';
import Transformadores from './pages/Transformadores';
import Companias from './pages/Companias';

import Provincias from './pages/provincias/Provincias';
import Zonas from './pages/provincias/Zonas';

import Borro from './pages/Borro';

const App = () => {
    return (
        <UsuarioProvider>
            <Router>  
                <ToastContainer />          
                <Switch>
                    <Route exact path="/login" component={Login}/>

                    <Route path='/'>
                        <Navbar/>
                        <Sidebar/>
                    
                        <Route exact path="/" component={withAuth(Home)}/>
                        <Route exact path="/personas/empleados" component={withAuth(Empleados)}/> 
                        <Route exact path="/personas/usuarios" component={withAuth(Usuarios)}/>
                        <Route exact path="/permisos/usuario/:id" component={withAuth(Accesos)}/>

                        <Route exact path="/centrales/solares" component={withAuth(Solar)}/>
                        <Route exact path="/centrales/hidroelectrica" component={withAuth(Hidroelectrica)}/>
                        <Route exact path="/centrales/termica" component={withAuth(Termica)}/>
                        <Route exact path="/centrales/nuclear" component={withAuth(Nuclear)}/>

                        <Route exact path="/estaciones/primarias" component={withAuth(Estaciones)}/>
                        <Route exact path="/estaciones/secundarias" component={withAuth(Subestaciones)}/>

                        <Route exact path="/redes" component={withAuth(Redes)}/> 
                        <Route exact path="/lineas" component={withAuth(Lineas)}/>
                        <Route exact path="/transformadores" component={withAuth(Transformadores)}/>
                        <Route exact path="/companias" component={withAuth(Companias)}/>

                        <Route exact path="/provincias" component={withAuth(Provincias)}/>
                        <Route exact path="/zonaservicio" component={withAuth(Zonas)}/>
                        <Route exact path="/historial/borrado" component={withAuth(Borro)}/>
                    </Route>
                </Switch>
            </Router>
        </UsuarioProvider>
    )
}

export default App
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

import Solar from './pages/centrales/Solar';
import Termica from './pages/centrales/Termica';
import Nuclear from './pages/centrales/Nuclear';
import Hidroelectrica from './pages/centrales/Hidroelectrica';

import Estaciones from './pages/estaciones/Estaciones';
import Subestaciones from './pages/estaciones/Subestaciones';

import Redes from './pages/Redes';
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
                    
                        <Route exact path="/" component={withAuth(Root)}/>
                        <Route exact path="/personas/empleados" component={withAuth(Empleados)}/> 
                        <Route exact path="/personas/usuarios" component={withAuth(Usuarios)}/>
                        <Route exact path="/permisos/usuario/:id" component={withAuth(Accesos)}/>

                        <Route exact path="/centrales/solares" component={withAuth(Solar)}/>
                        <Route exact path="/centrales/hidroelectrica" component={withAuth(Hidroelectrica)}/>
                        <Route exact path="/centrales/termica" component={withAuth(Termica)}/>
                        <Route exact path="/centrales/nuclear" component={withAuth(Nuclear)}/>

                        <Route exact path="/estaciones/primarias" component={Estaciones}/>
                        <Route exact path="/estaciones/secundarias" component={Subestaciones}/>

                        <Route exact path="/redes" component={Redes}/> 
                        <Route exact path="/lineas" component={Lineas}/>
                        <Route exact path="/transformadores" component={Transformadores}/>
                        <Route exact path="/companias" component={Companias}/>

                        <Route exact path="/provincias" component={Provincias}/>
                        <Route exact path="/zonaservicio" component={Zonas}/>
                        <Route exact path="/historial/borrado" component={Borro}/>
                    </Route>
                </Switch>
            </Router>
        </UsuarioProvider>
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

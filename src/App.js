import React from 'react';

//Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import Redes from './pages/Redes';
import Lineas from './pages/Lineas';
import Compañias from './pages/Compañias';
import Subestaciones from './pages/Subestaciones';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar/>
                <Sidebar/>
                <Switch>
                        <Router>
                            <Route exact path="/"  component={Root}/>
                            <Route  path="/redes" component={Redes}/> 
                            <Route path="/lineas" component={Lineas}/>
                            <Route path="/compañias" component={Compañias}/>
                            <Route path="/subestaciones" component={Subestaciones}/>
                        </Router>
                </Switch>
            </div>
        </BrowserRouter>
    )
}
const Root = () => (
    <div>
        <h1>Root</h1>
    </div>
);
export default App

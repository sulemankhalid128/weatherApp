import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherIdex from './WeatherIdex';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {ContextPage} from './ContextPage';
import Body from './Body';



function App() {
    return (

        <ContextPage>
            <Router>
                <Route exact path='/' component={WeatherIdex} />
                <Route exact path='/contextPage' component={ContextPage} />
            </Router>
            <Body></Body>
        </ContextPage>
    );
}

export default App;

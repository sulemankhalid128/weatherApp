import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from 'react-bootstrap'
import WeatherIdex from './WeatherIdex';

function App() {
  return (
    <Container>
        <WeatherIdex></WeatherIdex>
    </Container>
  );
}

export default App;

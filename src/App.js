import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from 'react-bootstrap'
import WeatherIdex from './WeatherIdex';

function App() {
  return (
    <Container className=" p-0">
        <WeatherIdex></WeatherIdex>
    </Container>
  );
}

export default App;

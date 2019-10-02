import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from 'react-bootstrap'
import {WeatherIdex} from './WeatherIdex';
import WeatherCard from './WeatherCard';
import WeatherForm from './WeatherForm';

function App() {
  return (
    <Container>
        <WeatherIdex>
            <WeatherCard>
                <WeatherForm></WeatherForm>
            </WeatherCard>
        </WeatherIdex>
    </Container>
  );
}

export default App;

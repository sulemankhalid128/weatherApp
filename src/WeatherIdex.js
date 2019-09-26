import React, { Component } from 'react';
import WeatherCard from './WeatherCard';
import { groupBy } from 'lodash';
import moment from 'moment';

class WeatherIdex extends Component {
    state = {
        country: 'pakistan',
        city: 'Lahore',
        loading: false,
        data: null,
        weather: [],
        main: '',
        forecastGroup: []
    }

    fetchweatherUpdate = async () => {
        try {
            this.setState({ loading: true });
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=c768480df4e7ec64901ea68f0e5fda9c`)
            const data = await res.json();
            this.setState({ loading: false });
            this.setState({ data: data, weather: data.weather, main: data.main });

        } catch (error) {
            this.setState({ loading: false });
            console.log(error)
        }

    }

    forecast = async () => {

        try{
        let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&appid=c768480df4e7ec64901ea68f0e5fda9c`)
        let forecast = await res.json();
        var forecastGroup = groupBy(forecast.list, (li) => {
            return moment(new Date(li.dt * 1000)).startOf('day').format();
        });
        let forecasts = [];
        for (let key in forecastGroup) {
            forecasts.push({ [key]: forecastGroup[key] })
        }
        this.setState({ forecastGroup: forecasts });
        } catch(error){
            debugger
            console.log(error)
        }
        
    }


    componentDidMount = async () => {
        this.fetchweatherUpdate();
        this.forecast();
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value })

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.city && this.state.country) {
            this.fetchweatherUpdate();
            this.forecast();
        }
    }

    render() {
        return (
            <>
                <div className="pt-5 bgImg">
                    <h1 className="text-center mt-3">Weather App</h1>
                    <h5 className="text-center">Search for weather updates</h5>
                    <p className="text-center mb-0 pb-3" style={{ "textTransform": "uppercase" }}>{this.state.city},{this.state.country}</p>
                </div>
                <WeatherCard
                    forecastGroup={this.state.forecastGroup}
                    data={this.state.data}
                    weather={this.state.weather}
                    main={this.state.main}
                    country={this.state.country}
                    loading={this.state.loading}
                    city={this.state.city}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </>
        );
    }
}

export default WeatherIdex;
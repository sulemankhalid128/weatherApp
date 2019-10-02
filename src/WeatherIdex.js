import React, { Component } from 'react';
import WeatherCard from './WeatherCard';
import { groupBy } from 'lodash';
import moment from 'moment';
import {Link} from 'react-router-dom'
import { Container } from 'react-bootstrap'


class WeatherIdex extends Component {
    state = {
        country: 'pakistan (additonal)',
        city: 'Lahore',
        loading: false,
        data: null,
        weather: [],
        main: '',
        forecastGroup: [],
    }

    fetchweatherUpdate = async () => {
        this.setState({ loading: true });
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=c768480df4e7ec64901ea68f0e5fda9c`)
        const data = await res.json();
        this.setState({ loading: false });

        if (res.status !== 200) {
            throw data;
        }

        this.setState({ data: data, weather: data.weather, main: data.main });
    }

    forecast = async () => {
        this.setState({ loading: true })
        let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&appid=c768480df4e7ec64901ea68f0e5fda9c`)
        let forecast = await res.json();
        this.setState({ loading: false })
        if (res.status !== 200) {
            throw forecast;

        }
        var forecastGroup = groupBy(forecast.list, (li) => {
            return moment(new Date(li.dt * 1000)).startOf('day').format();
        });
        let forecasts = [];
        for (let key in forecastGroup) {
            forecasts.push({ [key]: forecastGroup[key] })
        }
        this.setState({ forecastGroup: forecasts });


    }


    componentDidMount = async () => {
        try {
            this.timesloat();
            await this.fetchweatherUpdate();
            await this.forecast();
        }
        catch (err) {
            console.log(err);
            this.setState({ errormsg: err.message, city: 'Lahore', country: 'Pakistan (addition)' })
            this.setState({ loading: false })

        }
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value })

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (this.state.city && this.state.country) {
                await this.fetchweatherUpdate();
                await this.forecast();
                this.setState({ errormsg: '' })
            }
        }
        catch (err) {
            // console.log(err)
            this.setState({ errormsg: err.message, city: 'Lahore', country: 'Pakistan (addition)' })

        }
    }

    timesloat = async () => {
        try {
            console.log('night')
            let hours = new Date().getHours()
            if (hours < 5 || hours >= 18) {
                this.setState({ className: "bgNight", color: 'white' })
            }
            else if (hours >= 5) {
                console.log('day');
                this.setState({ className: "bgImg" })
            }

        } catch (error) {
            console.log(error)
        }
        setInterval(() => {
            this.timesloat()
        }, 60000 * 60 * 5);

    }




    render() {
        let { className, color, city, country, forecastGroup, data, weather, main, loading, errormsg } = this.state
        return (
            <Container>
                <div className={className} id='header' style={{ color: color }}>
                    <h1 className="text-center pt-5 h-color-small" id="heading">Weather App</h1>
                    <h5 className="text-center h-color-small">Search for weather updates</h5>
                    <p className="text-center mb-0 pb-5 h-color-small" style={{ "textTransform": "uppercase" }}>{city}</p>
                    <Link to='/contextPage' className="text-light">Context Page</Link>
                </div>
                <WeatherCard
                    forecastGroup={forecastGroup}
                    data={data}
                    weather={weather}
                    main={main}
                    country={country}
                    loading={loading}
                    city={city}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    error={errormsg}
                />
            </Container>
        );
    }
}

export default WeatherIdex;
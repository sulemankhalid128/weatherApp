import React, { Component } from 'react';
import { Row, Col, Table, Card } from 'react-bootstrap';
import moment from 'moment';


class WeatherCard extends Component {
    render() {

        return (
            <div>
                <Card className="border-0 shadow">
                    <div className="card-body">
                        <Row className="border-bottom mb">
                            <Col md="6">
                                <Row>
                                    {this.props.data && !this.props.loading &&
                                        <>
                                            {this.props.weather && this.props.weather.length ?
                                                <>
                                                    <Col md="3" sm="4" xs="4">
                                                        <img src={`http://openweathermap.org/img/wn/${this.props.weather[0].icon}@2x.png`} alt="" />

                                                    </Col>
                                                    <Col md="9" sm="8" xs="8">
                                                        <div className="mt-3">
                                                            <div>
                                                                <b>{this.props.weather[0].main}</b> &nbsp;
                                                            <sub>{this.props.weather[0].description}</sub>
                                                            </div>
                                                            <div>
                                                                <b>Temprature:</b> {Math.round(this.props.main.temp - 273.15)}&#8451;
                                                        </div>
                                                            <p>{new Date().toLocaleString()}</p>
                                                        </div>
                                                    </Col>
                                                </>
                                                : 'Loading'

                                            }
                                            <Col md="12">
                                                <Table className="table-responsive">
                                                    <thead>
                                                        <tr>
                                                            <th>Wind</th>
                                                            <th>Humidity</th>
                                                            <th>High Temp</th>
                                                            <th>Low Temp</th>
                                                            <th>Lon</th>
                                                            <th>Lat</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{this.props.data.wind.speed}</td>
                                                            <td>{this.props.main.humidity}</td>
                                                            <td>{Math.round(this.props.main.temp_max - 273.15)}&#8451;</td>
                                                            <td>{Math.round(this.props.main.temp_min - 273.15)}&#8451;</td>
                                                            <td>{this.props.data.coord.lon}</td>
                                                            <td>{this.props.data.coord.lat}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </>



                                    }
                                    <>
                                        {this.props.loading ?

                                            <div className="d-flex justify-content-center aligh-item-center w-100 mt-5 pt-5">
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div> : ''
                                        }
                                    </>

                                </Row>
                            </Col>
                            <Col md="6  border-left">
                                <form>
                                    <label htmlFor="" className="form-group">Country</label>
                                    <input type="text"
                                        name="country"
                                        value={this.props.country}

                                        placeholder="Enter Country Name"
                                        className="form-control"
                                        onChange={this.props.handleChange}

                                    />
                                    <label htmlFor="" className="form-group mt-3">City</label>
                                    <input type="text"
                                        name="city"
                                        value={this.props.city}
                                        placeholder="Enter city Name"
                                        className="form-control"
                                        onChange={this.props.handleChange}
                                    />
                                    <small className="text-danger" style={{"textTransform": "uppercase"}}>{this.props.error}</small>
                                    {
                                        this.props.country && this.props.city ?
                                            <button className="btn btn-success mt-3 float-right mb-4" id="updateCheck" onClick={this.props.handleSubmit}>
                                                {
                                                    this.props.loading ? 'Fetching...' :
                                                        'Update Weather'
                                                }
                                            </button> :
                                            <button className="btn btn-success mt-3 float-right mb-4" id="updateCheck" disabled={true} >Update Weather</button>
                                    }
                                </form>

                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md="12">
                                <h4 className="mb-4">Forecast</h4>
                                <div className="scroller">
                                    <div className="force-overflow">
                                        <Table className="table-responsive w-100">
                                            {
                                                this.props.forecastGroup.length ?

                                                    this.props.forecastGroup.map((forcast, index) => {
                                                        let keys = Object.keys(forcast);
                                                        return <tbody key={index}>
                                                            <tr >
                                                                <th className="border-0">
                                                                    <h6 className="my-3 dateforcast"> {new Date(keys[0]).toDateString()} </h6>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th>Time</th>
                                                                <th>Wind</th>
                                                                <th>Humidity</th>
                                                                <th>Weather</th>
                                                                <th>Description</th>
                                                                <th>Icon</th>
                                                                <th>Max Temp</th>
                                                                <th>Min Temp</th>
                                                                <th>Pressure</th>
                                                                <th>Temp KF</th>
                                                                <th>Clouds</th>
                                                            </tr>
                                                            {
                                                                forcast[keys[0]].map((v, index) => {
                                                                    return <tr key={index}>
                                                                        {
                                                                            <>
                                                                                <td>{moment(v.dt * 1000).format('hh:mm A')}</td>
                                                                                <td>{v.wind.speed}</td>
                                                                                <td className="text-center">{v.main.humidity}</td>
                                                                                <td>{v.weather[0].main}</td>
                                                                                <td>{v.weather[0].description}</td>
                                                                                <td><img src={`http://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`} width="40px" alt="" /> </td>
                                                                                <td className="text-center">{Math.round(v.main.temp_max - 273.15)} &#8451;</td>
                                                                                <td className="text-center">{Math.round(v.main.temp_min - 273.15)} &#8451;</td>
                                                                                <td className="text-center">{Math.round(v.main.pressure)}</td>
                                                                                <td className="text-center">{v.main.temp_kf}</td>
                                                                                <td className="text-center">{v.clouds.all}</td>


                                                                            </>
                                                                        }
                                                                    </tr>
                                                                })
                                                            }
                                                        </tbody>
                                                    })

                                                    :
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                'Loading...'
                                                    </td>
                                                        </tr>
                                                    </tbody>
                                            }
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </div>
                </Card>
            </div>
        );
    }
}

export default WeatherCard;
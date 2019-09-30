import React, { Component } from 'react';
import { Row, Col, Table, Card } from 'react-bootstrap';
import moment from 'moment';
import WeatherForm from './WeatherForm';
import emptyImg from './assests/Error-b.png'
import emptyCloud from './assests/empty-cloud.svg'


class WeatherCard extends Component {
    render() {
        let { data, loading, weather, main, forecastGroup } = this.props
        return (
            <div>
                <Card className="border-0 shadow-sm">
                    <div className="card-body">
                        <Row className="border-bottom mb">
                            <Col md="6">
                                <Row>
                                    {data && !loading &&
                                        <>
                                            {weather && weather.length ?
                                                <>
                                                    <Col md="3" sm="4" xs="4">
                                                        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
                                                    </Col>
                                                    <Col md="9" sm="8" xs="8">
                                                        <div className="mt-3">
                                                            <div>
                                                                <b>{weather[0].main}</b> &nbsp;
                                                            <sub>{weather[0].description}</sub>
                                                            </div>
                                                            <div>
                                                                <b>Temprature:</b> {Math.round(main.temp - 273.15)}&#8451;
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
                                                            <td className="text-center">{data.wind.speed}</td>
                                                            <td className="text-center">{main.humidity}</td>
                                                            <td className="text-center">{Math.round(main.temp_max - 273.15)}&#8451;</td>
                                                            <td className="text-center">{Math.round(main.temp_min - 273.15)}&#8451;</td>
                                                            <td>{data.coord.lon}</td>
                                                            <td>{data.coord.lat}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </>



                                    }
                                    <>
                                        {loading ?
                                            <>
                                                <div className="d-flex justify-content-center aligh-item-center w-100 mt-5 pt-5">
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div>
                                            </>
                                            : ''

                                        }
                                    </>
                                    {!data && !loading?
                                        <>
                                            <div className="justify-content-center d-flex"><img src={emptyImg} alt="" style={{ "width": "50%" }} /></div>
                                            <div className="justify-content-center d-flex w-100"><h5>Check Your Conction and Try Again</h5></div>
                                        </>
                                        : ''}
                                </Row>
                            </Col>
                            <Col md="6  border-left">
                                <WeatherForm props={this.props} />
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md="12">
                                <h4 className="mb-4">Forecast</h4>
                                <div className="scroller">
                                    <div className="force-overflow">
                                        <Table className="table-responsive w-100">
                                            {
                                                forecastGroup.length ?

                                                    forecastGroup.map((forcast, index) => {
                                                        let keys = Object.keys(forcast);
                                                        return <tbody key={index}>
                                                            <tr >
                                                                <th className="border-0">
                                                                    <h6 className="my-3 dateforcast"> {new Date(keys[0]).toDateString()} </h6>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th>Weather</th>
                                                                <th>Description</th>
                                                                <th>Icon</th>
                                                                <th>Time</th>
                                                                <th>Wind</th>
                                                                <th>Humidity</th>
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
                                                                                <td>{v.weather[0].main}</td>
                                                                                <td>{v.weather[0].description}</td>
                                                                                <td><img src={`http://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`} width="40px" alt="" /> </td>
                                                                                <td>{moment(v.dt * 1000).format('hh:mm A')}</td>
                                                                                <td>{v.wind.speed}</td>
                                                                                <td className="text-center">{v.main.humidity}</td>
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
                                                                <img src={emptyCloud} alt="" style={{ 'width': '80%' }} />
                                                                <h6>There is no any forcast</h6>

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
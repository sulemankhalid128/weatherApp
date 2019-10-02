import React, { Component } from 'react';
import { Row, Col, Table, Card } from 'react-bootstrap';
import moment from 'moment';
import WeatherForm from './WeatherForm';
import emptyImg from './assests/Error-b.png'
// import emptyCloud from './assests/empty-cloud.svg'
import ContentLoader, { Facebook } from 'react-content-loader'

import {WeatherContext} from './WeatherIdex'

const MyFacebookLoader = () => <Facebook />

const Loader = props => {
    const random = Math.random() * (1 - 0.7) + 0.7;
    return (
        <ContentLoader
            height={40}
            width={1060}
            speed={1}
            primaryColor="#d9d9d9"
            secondaryColor="#ecebeb"
            {...props}
        >
            <rect x="30" y="15" rx="4" ry="4" width="6" height="6.4" />
            <rect x="64" y="13" rx="6" ry="6" width={200 * random} height="12" />
            <rect x="643" y="13" rx="6" ry="6" width={23 * random} height="12" />
            <rect x="683" y="13" rx="6" ry="6" width={78 * random} height="12" />
            <rect x="785" y="13" rx="6" ry="6" width={117 * random} height="12" />
            <rect x="968" y="13" rx="6" ry="6" width={83 * random} height="12" />

            <rect x="0" y="39" rx="6" ry="6" width="1060" height=".3" />
        </ContentLoader>
    );
};

const LoaderList = ['a', 'b', 'c', 'd', 'e', 'f', 2].map((item, index) => <div key={index}> < Loader /> </div>);




class WeatherCard extends Component {
    static contextType = WeatherContext;
    render() {
        let { data, loading, weather, main, forecastGroup } = this.context.state
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
                                                <div className="w-100 ml-3 mt-5">
                                                    <MyFacebookLoader />
                                                </div>
                                                {/* <div className="d-flex justify-content-center aligh-item-center w-100 mt-5 pt-5">
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div> */}
                                            </>
                                            : ''

                                        }
                                    </>
                                    {!data && !loading ?
                                        <>
                                            <div className="justify-content-center d-flex"><img src={emptyImg} alt="" style={{ "width": "50%" }} /></div>
                                            <div className="justify-content-center d-flex w-100"><h5>Check Your Conction and Try Again</h5></div>
                                        </>
                                        : ''}
                                </Row>
                            </Col>
                            <Col md="6  border-left">
                                <WeatherForm/>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md="12">
                                <h4 className="mb-4">Forecast</h4>
                                <div className="scroller">
                                    <div className="force-overflow">
                                        <Table className="table-responsive w-100 ">
                                            {
                                                forecastGroup && forecastGroup.length && !loading ?
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
                                                                <th className="iconsTr">Icon</th>
                                                                <th>Time</th>
                                                                <th>Wind</th>
                                                                <th>Humidity</th>
                                                                <th>Max Temp</th>
                                                                <th>Min Temp</th>
                                                                <th>Pressure</th>
                                                                {/* <th>Temp KF</th> */}
                                                                <th>Clouds</th>
                                                            </tr>
                                                            {
                                                                forcast[keys[0]].map((v, index) => {
                                                                    return <tr key={index}>
                                                                        {
                                                                            <>
                                                                                <td>{v.weather[0].main}</td>
                                                                                <td>{v.weather[0].description}</td>
                                                                                <td className="content-center"><img src={`http://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`} width="40px" alt="" /> </td>
                                                                                <td>{moment(v.dt * 1000).format('hh:mm A')}</td>
                                                                                <td className="text-center">{v.wind.speed}</td>
                                                                                <td className="text-center">{v.main.humidity}</td>
                                                                                <td className="text-center">{Math.round(v.main.temp_max - 273.15)}&#8451;</td>
                                                                                <td className="text-center">{Math.round(v.main.temp_min - 273.15)}&#8451;</td>
                                                                                <td className="text-center">{Math.round(v.main.pressure)}</td>
                                                                                {/* <td className="text-center">{v.main.temp_kf}</td> */}
                                                                                <td className="text-center">{v.clouds.all}</td>


                                                                            </>
                                                                        }
                                                                    </tr>
                                                                })
                                                            }
                                                        </tbody>
                                                    })
                                                    : <tbody><tr><td></td></tr></tbody>
                                            }
                                        </Table>
                                        {
                                            loading &&
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            {/* <img src={emptyCloud} alt="" style={{ 'width': '80%' }} />
                                                            <h6>There is no any forcast</h6> */}
                                                            <div className="w-100 mt-5">
                                                                {LoaderList}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        }

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
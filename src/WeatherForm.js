import React, { Component } from 'react';
import {WeatherContext} from './WeatherIdex'

class WeatherForm extends Component {
    static contextType = WeatherContext;
    render() {

        let { country, city, error, loading } = this.context.state
        return (
            <form>
                <label htmlFor="" className="form-group">City</label>
                <input type="text"
                    name="city"
                    value={city}
                    placeholder="Enter city Name"
                    className="form-control"
                    autoFocus="autofocus"
                    onChange={this.context.handleChange}
                />
                <small className="text-danger" style={{ "textTransform": "uppercase" }}>{error}</small><br/>
                <label htmlFor="" className="form-group mt-3">Country</label>
                <input type="text"
                    name="country"
                    value={country}

                    placeholder="Enter Country Name"
                    className="form-control"
                    onChange={this.context.handleChange}

                />
                {
                    country && city ?
                        <>
                            {
                                loading ? 
                                <button className="btn btn-success mt-3 float-right mb-4" disabled>Fetching..</button> :
                                <button className="btn btn-success mt-3 float-right mb-4" onClick={this.context.handleSubmit}>Update Weather</button> 
                                   
                            }
                        </> :
                        <button className="btn btn-primary mt-3 float-right mb-4" disabled={true} >Update Weather</button>
                }
            </form>

        );
    }
}

export default WeatherForm;
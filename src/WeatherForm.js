import React, { Component } from 'react';

class WeatherForm extends Component {
    render() {

        let { country, city, handleChange, handleSubmit, error, loading } = this.props.props
        return (
            <form>
                <label htmlFor="" className="form-group">City</label>
                <input type="text"
                    name="city"
                    value={city}
                    placeholder="Enter city Name"
                    className="form-control"
                    autofocus="autofocus"
                    onChange={handleChange}
                />
                <small className="text-danger" style={{ "textTransform": "uppercase" }}>{error}</small><br/>
                <label htmlFor="" className="form-group mt-3">Country</label>
                <input type="text"
                    name="country"
                    value={country}

                    placeholder="Enter Country Name"
                    className="form-control"
                    onChange={handleChange}

                />
                {
                    country && city ?
                        <button className="btn btn-success mt-3 float-right mb-4" onClick={handleSubmit}>
                            {
                                loading ? 'Fetching...' :
                                    'Update Weather'
                            }
                        </button> :
                        <button className="btn btn-primary mt-3 float-right mb-4" disabled={true} >Update Weather</button>
                }
            </form>

        );
    }
}

export default WeatherForm;
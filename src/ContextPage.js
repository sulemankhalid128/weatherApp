import React, { Component } from 'react';
// import Body from './Body';
// import {WeatherProvider} from './WeatherContext'
const WeatherContext = React.createContext({})

 class ContextPage extends Component {
    state = {
        name: 'sulli',
        lastName: 'ranja',
        age: 21
    }

    changeName = () => this.setState({name:'suleman khalid'})

    render() {
        return (
            <WeatherContext.Provider value={{
                state:this.state,
                changeName : this.changeName
                }}>
                {this.props.children}
            </WeatherContext.Provider>

        );
    }
}


export {ContextPage, WeatherContext} ; 

// export { ContextPage, ThemeContext };
import React, { Component } from 'react';
// import InnerBody from './InnerBody';
// import { ThemeContext } from './ContextPage'
// const ThemeContext = React.createContext({});
import { WeatherContext } from './ContextPage'
class Body extends Component {
    static contextType = WeatherContext;
    render() {
        let data = this.context;
        debugger
        return (
            <div>
                <button onClick={this.context.changeName}>Change</button>

                <h4>{this.context.state.name}</h4>
            </div>
            // <ThemeContext.Provider value={{name:"suleman"}}>
            //     <InnerBody />
            // </ThemeContext.Provider>
        );
    }
}

export default Body;

// export { ThemeContext };
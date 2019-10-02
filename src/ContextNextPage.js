import React, { Component } from 'react';

import AppContextPage from './ContextPage'

class ContextNextPage extends Component {
    static contextType = AppContextPage;
    state ={
        name: ''
    }
    componentDidMount(){
        this.changeName();
        debugger
    }
    changeName = () => this.setState({name: this.context.name})
    render() {
        return (
           <div>

               <Body />
           </div>
        );
    }
}

export default ContextNextPage;
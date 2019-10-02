import React, { Component } from 'react';
import ContextPage from './ContextPage'
import ContextNextPage from './ContextNextPage'

class UserContext extends Component {
    render() {
        return (
            <ContextPage>
                <ContextNextPage/>
            </ContextPage>
        );
    }
}

export default UserContext;
import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <div>toolbar</div>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Toolbar/Toolbar';

class Layout extends Component {
    render() {
        const buttons = [{id: 'toolbar-button-main-page', label: 'Main page'},{id: 'toolbar-button-archive', label: 'Archive'},{id: 'toolbar-button-logout', label: 'Logout'}]
        return (
            <Aux>
                <Toolbar buttons={buttons}/>
                <main >
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
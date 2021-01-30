import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Toolbar/Toolbar';
import {Route} from 'react-router-dom';
import MainPage from '../../containers/MainPage';
import Archive from '../../containers/Archive';

class Layout extends Component {
    render() {
        const buttons = [{id: 'toolbar-button-archive', label: 'Archive', link:'/archive'},{id: 'toolbar-button-logout', label: 'Logout', link:'/logout'}]
        return (
            <Aux>
                <Toolbar buttons={buttons}/>
                <main >
                    <Route path="/mainPage" exact component={MainPage}/>
                    <Route path="/archive" exact component={Archive}/>
                </main>
            </Aux>
        );
    }
}

export default Layout;
import React, { Component } from 'react'
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Toolbar from '../../components/Toolbar/Toolbar';
import {Route} from 'react-router-dom';
import MainPage from '../MainPage';
import Archive from '../Archive';
import Auth from '../Auth/Auth';

class Layout extends Component {
    
    render() {
        console.log('Layout props:', this.props)
        const buttons = [
            {id: 'toolbar-button-archive', label: 'Archive', link:'/archive'},
            {id: 'toolbar-button-logout', label: 'Logout', link:'/auth'},
        ]

        let routes = <Aux>
                    <Route path="/auth" exact component={Auth}/>
        </Aux>

        // if(this.props.isAuthenticated) {
            routes = <Aux>
                    <Route path="/mainPage" exact component={MainPage}/>
                    <Route path="/archive" exact component={Archive}/>
                    <Route path="/auth" exact component={Auth}/>
            </Aux>
        // }
        return (
            <Aux>
                <Toolbar buttons={buttons}/>
                <main >
                    {routes}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
        authToken: state.authToken
    };
};

export default connect(mapStateToProps)(Layout);
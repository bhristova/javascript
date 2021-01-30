import React, { Component } from 'react';

import Backdrop from '../Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary'

import classes from './UniversalContainer.css';

class UniversalContainer extends Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== this.props.show;
    // }

    render() {
        return <div className={classes.UniversalContainer}>
                <p className={classes.Heading}>{this.props.heading}</p>
                {this.props.children}
            </div>;
    }
}

export default UniversalContainer;
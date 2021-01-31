import React, { Component } from 'react';

import classes from './UniversalContainer.css';

class UniversalContainer extends Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== this.props.show;
    // }

    render() {
        return <div className={classes.UniversalContainer}>
                <div className={classes.Heading}>{this.props.heading}</div>
                {this.props.children}
            </div>;
    }
}

export default UniversalContainer;
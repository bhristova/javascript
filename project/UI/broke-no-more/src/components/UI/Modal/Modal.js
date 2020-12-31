import React, { Component } from 'react';

import Backdrop from '../Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary'

import classes from './Modal.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log("Modal update");
        // console.log("old: " +  this.props.show + "  new: " + nextProps.show);
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
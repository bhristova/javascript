import React, { Component } from 'react';

import classes from './AmountControl.css';
import Icon from '../../../Icons/Icons';
import HoverButton from '../../../UI/HoverButton/HoverButton';
import Dropdown from '../../../UI/Dropdown/Dropdown';

class AmountControl extends Component {
    state = {
        hovered: false,
        clicked: false
    }

    setHoverState = () => {
        const prevState = this.state.hovered;
        this.setState({ hovered: !prevState });
    }

    hoverButtonHandler = () => {
        const prevState = this.state.clicked;
        this.setState({ clicked: !prevState });
    }

    prettifyAmount = (amount) => {
        let prettifiedAmount = amount.toString();
        if (prettifiedAmount.length > 6) {
            prettifiedAmount = prettifiedAmount.substring(0, 4);
            prettifiedAmount = prettifiedAmount.concat('...');
        }

        return prettifiedAmount;
    };

    render() {
        const buttons = [
            {type:'button', id:'button1', label: 'Edit', handler: () => console.log('clicked button 1'), disabled: !this.props.isToday},
            {type:'button', id:'button2', label: 'Delete', handler: () => console.log('clicked button 2'), disabled: !this.props.isToday},
        ];

        let iter = 0;
        return (
            <div className={classes.AmountControl}
                onMouseEnter={this.setHoverState}
                onMouseLeave={this.setHoverState}>
                <Icon type={this.props.icon} />
                <div className={classes.Subject}>
                    <p>
                        {this.props.subject}
                    </p>
                </div>
                <div className={classes.Amount} title={this.props.amount}>
                    <p>
                        {this.prettifyAmount(this.props.amount)}
                    </p>
                </div>
                {this.state.hovered ? <HoverButton hoverButtonHandler={this.hoverButtonHandler} hoveredButton={true}>
                    {/* <Dropdown/> */}
                    {this.state.clicked ? 
                    <Dropdown buttons={buttons}/> : null}
                </HoverButton> : null}

            </div>
        );
    }
}


export default AmountControl;
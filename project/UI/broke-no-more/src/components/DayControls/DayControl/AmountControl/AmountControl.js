import React, { Component } from 'react';

import classes from './AmountControl.css';
import Icon from '../../../Icons/Icons';
import HoverButton from '../../../UI/HoverButton/HoverButton';
import Dropdown from '../../../UI/Dropdown/Dropdown';
import EditForm from './EditForm/EditForm';
import DeleteForm from './DeleteForm/DeleteForm';

class AmountControl extends Component {
    state = {
        hovered: false,
        clicked: false,
        editFormShow: false,
        deleteFormShow: false,
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return this.props.id !== nextProps.id || this.props.icon !== nextProps.icon || this.props.category !== nextProps.category || this.props.subject !== nextProps.subject || this.props.amount !== nextProps.amount || 
        this.state.hovered !== nextState.hovered || this.state.clicked !== nextState.clicked || this.state.editFormShow !== nextState.editFormShow || this.state.deleteFormShow !== nextState.deleteFormShow;
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
        if(!amount) {
            return;
        }
        let prettifiedAmount = amount.toString();
        if (prettifiedAmount.length > 6) {
            prettifiedAmount = prettifiedAmount.substring(0, 4);
            prettifiedAmount = prettifiedAmount.concat('...');
        }

        return prettifiedAmount;
    };

    render() {
        const buttons = [
            { type: 'button', id: 'button1', label: 'Edit', handler: () => { this.setState({ editFormShow: true }) }, disabled: !this.props.isToday },
            { type: 'button', id: 'button2', label: 'Delete', handler: () => { this.setState({ deleteFormShow: true }) }, disabled: !this.props.isToday },
        ];

        return <div className={classes.AmountControl}
                onMouseEnter={this.setHoverState}
                onMouseLeave={this.setHoverState}
                >
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
                {this.state.hovered && 
                    <HoverButton hoverButtonHandler={this.hoverButtonHandler} hoveredButton={true}>
                        {this.state.clicked && <Dropdown buttons={buttons} /> }
                    </HoverButton>}
                {this.state.editFormShow && <EditForm editFormShow={this.state.editFormShow}
                    cancelClicked={() => { this.setState({ editFormShow: false }) }}
                    addClicked={(fields) => { this.props.editClicked(fields); this.setState({ editFormShow: false }); }}
                    values={this.props}
                />}
                {this.state.deleteFormShow && <DeleteForm deleteFormShow={this.state.deleteFormShow}
                    cancelClicked={() => { this.setState({ deleteFormShow: false }) }}
                    deleteClicked={() => { this.props.deleteClicked(); this.setState({ deleteFormShow: false }); }}
                />}
            </div>;
    }
}


export default AmountControl;
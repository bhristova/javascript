import React from 'react'

import Aux from '../../../hoc/Auxiliary';

import classes from './HoverButton.css';

const hoverButton = (props) => {
    return (
        <Aux>
            <div className={classes.Button} 
            onClick={props.hoverButtonHandler} 
            onMouseOver={props.onMouseOverHandler}
            onMouseOut={props.onMouseOut}
            style={{opacity: props.hoveredButton ? 1 : 0.5}}
            >
                ...
            </div>
            {props.children }
        </Aux>
    );
}

export default hoverButton;
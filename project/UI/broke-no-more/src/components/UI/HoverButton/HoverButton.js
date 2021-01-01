import React from 'react'

import classes from './HoverButton.css';

const hoverButton = (props) => {
    return (
        <div className={classes.Button}
            onClick={props.hoverButtonHandler}
            onMouseOver={props.onMouseOverHandler}
            onMouseOut={props.onMouseOut}
            style={{ opacity: props.hoveredButton ? 1 : 0.5 }}>
            ...
            {props.children}
        </div>
    );
}

export default hoverButton;
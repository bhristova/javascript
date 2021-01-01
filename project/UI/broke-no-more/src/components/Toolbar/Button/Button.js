import React from 'react';

import classes from './Button.css';

const button = (props) => (
    <button
        onClick={props.buttonHandler}
        className={classes.Button}>
        {props.label.toUpperCase()}
    </button>
);

export default button;
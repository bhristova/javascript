import React from 'react';

import classes from './Button.css';

const addButton = (props) => (
    <button
        onClick={props.buttonHandler}
        className={classes.Button}>
        {props.label}
    </button>
);

export default addButton;
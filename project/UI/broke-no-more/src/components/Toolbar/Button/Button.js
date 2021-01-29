import React from 'react';

import classes from './Button.css';
import {Link} from 'react-router-dom';

const button = (props) => (
    <Link
        to={props.link}
        className={classes.Button}>
        {props.label.toUpperCase()}
    </Link>
);

export default button;
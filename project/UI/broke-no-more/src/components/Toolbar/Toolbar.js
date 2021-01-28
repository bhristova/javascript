import React from 'react';

import Icon from '../Icons/Icons';
import Button from './Button/Button';

import classes from './Toolbar.css';

const toolbar = (props) => {
    return <div className={classes.Toolbar}>
        <Icon className={classes.Logo} type="30844110-46c4-45ce-90f8-504fddd10615" />
        <div className={classes.Buttons}>
            {props.buttons.map(button => (
                <Button key={button.id} label={button.label} />
            ))}
        </div>
    </div>;
}

export default toolbar;
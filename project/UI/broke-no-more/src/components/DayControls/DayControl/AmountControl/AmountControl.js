import React from 'react';

import classes from './AmountControl.css';
import Icon from '../../../Icons/Icons';

const amountControl = (props) => (

    <div className={classes.AmountControl}>
        <Icon type={props.icon} />
        <div className={classes.Subject}>
            <p>
                {props.subject}
            </p>
        </div>
        <div className={classes.Amount} title={props.amount}>
            <p>
                {prettifyAmount(props.amount)}
            </p>
        </div>
    </div>
);

const prettifyAmount = (amount) => {
    let prettifiedAmount = amount.toString();
    if (prettifiedAmount.length > 6) {
        prettifiedAmount = prettifiedAmount.substring(0, 4);
        prettifiedAmount = prettifiedAmount.concat('...');
    }

    return prettifiedAmount;
};

export default amountControl;
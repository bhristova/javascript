import React from 'react';

import AmountControl from './AmountControl/AmountControl';
import Button from '../../UI/Button/Button';

import classes from './DayControl.css';

const dayControl = (props) => {
    const date = props.dayData[0].date;
    return (
        <div className={classes.DayControl}>
            <p className={classes.Date}>{getProperDate(date)}</p>
            {props.dayData.map(elem => (<AmountControl
                key={elem.key}
                icon={elem.icon}
                subject={elem.subject}
                amount={elem.amount}
            ></AmountControl>))}
            {isToday(date) ? <Button buttonHandler={props.addButtonHandler} label='Add'/> : null}
        </div>
    )
};

const isToday = (date) => {
    const currentDate = new Date();
    const parsedDate = new Date(date);
    return currentDate.getDate() === parsedDate.getDate()
        && currentDate.getMonth() === parsedDate.getMonth()
        && currentDate.getUTCFullYear() === parsedDate.getUTCFullYear();
}

const getProperDate = (date) => {
    if (isToday(date)) {
        return 'Today';
    }
    return date;
}

export default dayControl;
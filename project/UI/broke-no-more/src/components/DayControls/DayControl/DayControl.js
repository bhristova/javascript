import React, { Component } from 'react';

import AmountControl from './AmountControl/AmountControl';
import Button from '../../UI/Button/Button';

import classes from './DayControl.css';

class DayControl extends Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.dayData !== this.props.dayData;
    }

    isToday = (date) => {
        const parsedDate = new Date(date);
        const currentDate = new Date();

        return currentDate.getDate() === parsedDate.getDate()
            && currentDate.getMonth() === parsedDate.getMonth()
            && currentDate.getFullYear() === parsedDate.getFullYear();
    }
    
    getProperDate = (date) => {
        if (this.isToday(date)) {
            return 'Today';
        }

        return new Intl.DateTimeFormat('en', {year: 'numeric', month: 'long', day: '2-digit'}).format(new Date(date));
    }

    render() {
        const date = this.props.dayData[0].date;
        const logsCount = this.props.dayData.filter(elem => elem.icon).length;
        console.log("DayControl update");
        const isToday = this.isToday(date);
        return (
            <div className={classes.DayControl}>
                <p className={classes.Date}>{this.getProperDate(date)}</p>
                {logsCount ? this.props.dayData.map(elem => (<AmountControl
                    key={elem.id}
                    id={elem.id}
                    icon={elem.icon}
                    subject={elem.subject}
                    amount={elem.amount}
                    isToday={isToday}
                    deleteClicked={() => this.props.deleteClicked(elem.id, date)}
                    editClicked={(fields) => this.props.editClicked(elem.id, date, fields)}
                ></AmountControl>)) : null}
                {isToday ? <Button buttonHandler={this.props.addButtonHandler} label='Add' /> : null}
            </div>
        )
    }
};

export default DayControl;
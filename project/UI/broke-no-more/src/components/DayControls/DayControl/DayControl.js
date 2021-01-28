import React, { Component } from 'react';

import AmountControl from './AmountControl/AmountControl';
import Button from '../../UI/Button/Button';
import { updateAmountLog} from '../../../api/AmountLog';

import classes from './DayControl.css';

class DayControl extends Component {
    
    state = {
        data: []
    }

    componentDidMount() {
        this.setState({data: this.props.dayData});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data !== nextState.data || nextProps.dayData !== this.props.dayData;
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
    
    editClicked = async (id, date, fields) => {
        try {
            await updateAmountLog(fields, id);
            this.props.refreshChartData();

            this.setState(state => {
                const newData = [...this.props.dayData];
                const elementIndex = newData.findIndex(elem => elem.id === id);
                const newElement = newData[elementIndex];

                Object.keys(fields).forEach(key => newElement[key] = fields[key]);

                newData[elementIndex] = newElement;

                return {data:newData};
              });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const date = this.props.dayData[0].date;
        const logsCount = this.props.dayData.filter(elem => elem.icon).length;
        console.log("DayControl update");
        const isToday = this.isToday(date);
        return (
            <div className={classes.DayControl}>
                <p className={classes.Date}>{this.getProperDate(date)}</p>
                {logsCount ? this.props.dayData
                    .filter(elem => elem.subject)
                    .map(elem => (<AmountControl
                        key={elem.id || elem.date}
                        id={elem.id}
                        icon={elem.icon}
                        category={elem.category}
                        subject={elem.subject}
                        amount={elem.amount}
                        isToday={isToday}
                        deleteClicked={() => this.props.deleteClicked(elem.id, date)}
                        editClicked={(fields) => this.editClicked(elem.id, date, fields)}
                    ></AmountControl>)) : null}
                {isToday ? <Button buttonHandler={this.props.addButtonHandler} label='Add' /> : null}
            </div>
        )
    }
};

export default DayControl;
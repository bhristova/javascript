import React, { Component } from 'react';

import DayControl from './DayControl/DayControl'
import {getAmountLogs, deleteAmountLog, updateAmountLog} from '../../api/AmountLog';

class DayControls extends Component {
    state = {
        data: []
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState != this.state;
    // }

    async componentDidMount() {
        const data = await getAmountLogs();
        this.setState({data: this.filterByDay(data)})
    }

    filterByDay(data) {
        const dates = [...new Set(data.map(elem => elem.date))];
        return dates.map(date => data.filter(elem => elem.date === date));
    }

    deleteClicked = async (id, date) => {
        try {
            await deleteAmountLog(id);

            const newData = [...this.state.data];
            const index = newData.findIndex(elem => elem[0].date === date);
            const data = newData.find(elem => elem[0].date === date).filter(elem => elem.id !== id);
            newData[index] = data;

            this.setState({data: newData});
        } catch (err) {
            console.error(err);
        }
    }

    editClicked = async (id, date, fields) => {
        try {
            await updateAmountLog(fields, id);

            const newData = [...this.state.data];
            const dateIndex = newData.findIndex(elem => elem[0].date === date)
            const dateArray = newData[dateIndex];

            const elementIndex = dateArray.findIndex(elem => elem.id === id);
            const newElement = dateArray[elementIndex];

            Object.keys(fields).forEach(key => newElement[key] = fields[key]);

            newData[dateIndex][elementIndex] = newElement;

            this.setState({data: newData});
        } catch (err) {
            console.error(err);
        }
    }

    render () {
        return (
            this.state.data.map(elem =>
                <DayControl
                    key={elem[0].date}
                    dayData={elem}
                    addButtonHandler={this.props.addButtonHandler}
                    deleteClicked={(id, date) => this.deleteClicked(id, date)}
                    editClicked={(id, date, fields) => this.editClicked(id, date, fields)}/>)
        );
    }
}

export default DayControls;
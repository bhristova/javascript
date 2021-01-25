import React, { Component } from 'react';

import Aux from '../hoc/Auxiliary';
import DayControls from '../components/DayControls/DayControls';
import AddForm from '../components/AddForm/AddForm';
import Modal from '../components/UI/Modal/Modal';
import PieChart from '../components/UI/PieChart/PieChart';
import NewPeriodForm from '../components/NewPeriodForm/NewPeriodForm';

//TODO: make functional
class MainPage extends Component {
    //sort them!
    getData = () => [{id:'9', value: 1},{id:'8', value: 1},{id:'7', value: 1},{id:'6', value: 1}, {id:'0', value: 3}, {id:'1', value: 3} , {id:'2', value: 20}, {id:'3', value: 45}, {id:'4', value: 5}, {id:'5', value: 20}];

    render() {
        return (
            <Aux>
                <DayControls/>
                <PieChart data={this.getData()}/>
            </Aux>
        );
    }
}

export default MainPage;
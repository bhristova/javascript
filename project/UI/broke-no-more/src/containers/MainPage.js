import React, { Component } from 'react';

import Aux from '../hoc/Auxiliary';
import DayControls from '../components/DayControls/DayControls';
import AddForm from '../components/AddForm/AddForm';
import Modal from '../components/UI/Modal/Modal';
// import PieChart from '../components/UI/PieChart/PieChart';
import NewPeriodForm from '../components/NewPeriodForm/NewPeriodForm';
import BarChart from '../components/UI/PieChart/BarChart';

//TODO: make functional
class MainPage extends Component {
    //sort them!

    render() {
        return (
            <Aux>
                <DayControls/>
                <BarChart/>
            </Aux>
        );
    }
}

export default MainPage;
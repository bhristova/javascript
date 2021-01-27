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
        const periodId = 'af460eec-6c18-4f66-a438-38ef4c1f4134';
        return (
            <Aux>
                <DayControls periodId={periodId}/>
                <BarChart periodId={periodId}/>
            </Aux>
        );
    }
}

export default MainPage;
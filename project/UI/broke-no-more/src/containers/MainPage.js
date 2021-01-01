import React, { Component } from 'react';

import Aux from '../hoc/Auxiliary';
import DayControls from '../components/DayControls/DayControls';
import AddForm from '../components/AddForm/AddForm';
import Modal from '../components/UI/Modal/Modal';
import PieChart from '../components/UI/PieChart/PieChart';
import NewPeriodForm from '../components/NewPeriodForm/NewPeriodForm';

class MainPage extends Component {
    state = {
        showModal: false
    }
    //sort them!
    getData = () => [{id:'9', value: 1},{id:'8', value: 1},{id:'7', value: 1},{id:'6', value: 1}, {id:'0', value: 3}, {id:'1', value: 3} , {id:'2', value: 20}, {id:'3', value: 45}, {id:'4', value: 5}, {id:'5', value: 20}];

    addButtonHandler = () => {
        this.setState({showModal: true});
    };

    removeModal = () => {
        console.log('removemodal!')
        this.setState({showModal: false});
    }

    render() {
        return (
            <Aux>
                <Modal show={this.state.showModal}>
                    {/* <AddForm
                        cancelClicked={this.removeModal}
                        addClicked={() => console.log('add clicked')}
                    /> */}
                    <NewPeriodForm />

                </Modal>
                <DayControls addButtonHandler={() => this.addButtonHandler()}/>

                <PieChart data={this.getData()}/>
            </Aux>
        );
    }
}

export default MainPage;
import React, { Component } from 'react';

import Aux from '../hoc/Auxiliary';
import DayControls from '../components/DayControls/DayControls';
import AddForm from '../components/AddForm/AddForm';
import Modal from '../components/UI/Modal/Modal';

class MainPage extends Component {
    state = {
        showModal: false
    }

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
                    <AddForm
                        cancelClicked={this.removeModal}
                        addClicked={() => console.log('add clicked')}
                    />
                </Modal>
                <DayControls addButtonHandler={() => this.addButtonHandler()}/>

                <div> pie chart</div>
            </Aux>
        );
    }
}

export default MainPage;
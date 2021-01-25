import React, { Component } from 'react';

import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';

class AddForm extends Component {
    
    state = {
        fields: {}
    }

    addToState = (fieldName, value) => {
        const newState = Object.assign({}, this.state.fields);
        newState[fieldName] = value;
        this.setState({fields: newState});
    }

    getCategories = () => {
        return {food: 'food', clothes: 'clothes', etc:'etc'};
    }

    getAddFormFields = () => [
        { id: 'fieldAddFormType', name: 'Type', type: 'select', availableValues: { 'false': 0, 'true': 1 }, required: true, handlerInput: (value) => this.addToState('icon', value)  },
        { id: 'fieldAddFormCategory', name: 'Category', type: 'select', availableValues: this.getCategories(), required: true, handlerInput: (value) => this.addToState('category', value)  },
        { id: 'fieldAddFormSubject', name: 'Subject', type: 'input', inputType: 'text', min: 10, max: 200, required: true, handlerInput: (value) => this.addToState('subject', value)  },
        { id: 'fieldAddFormAmount', name: 'Amount', type: 'input', inputType: 'number', max: 200, validation: 'number', required: true, handlerInput: (value) => this.addToState('amount', value)  },
    ];

    getAddFormButtons = () => [
        { id: 'buttonCancel', handler: this.props.cancelClicked, label: 'Cancel' },
        { id: 'buttonAdd', handler: () => this.props.addClicked(this.state.fields), label: 'Add' }
    ];

    render() {
        return <Modal show={this.props.addFormShow}>
            <Form
                key='formAddNewLog'
                title="Add new log"
                fields={this.getAddFormFields()}
                buttons={this.getAddFormButtons()}
            >
            </Form>
        </Modal>;
    };
}

export default AddForm;
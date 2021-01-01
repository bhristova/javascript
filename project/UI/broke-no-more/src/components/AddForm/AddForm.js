import React, { Component } from 'react';

import Form from '../UI/Form/Form';

class AddForm extends Component {

    getCategories = () => {
        return {food: 'food', clothes: 'clothes', etc:'etc'};
    }

    getAddFormFields = () => [
        { id: 'fieldAddFormType', name: 'Type', type: 'select', availableValues: { 'false': 0, 'true': 1 }, required: true },
        { id: 'fieldAddFormCategory', name: 'Category', type: 'select', availableValues: this.getCategories(), required: true },
        { id: 'fieldAddFormSubject', name: 'Subject', type: 'input', inputType: 'text', min: 10, max: 200, required: true },
        { id: 'fieldAddFormAmount', name: 'Amount', type: 'input', inputType: 'number', max: 200, validation: 'number', required: true },
    ];

    getAddFormButtons = () => [
        { id: 'buttonCancel', handler: this.props.cancelClicked, label: 'Cancel' },
        { id: 'buttonAdd', handler: this.props.addClicked, label: 'Add' }
    ];

    render() {
        return <Form
                key='formAddNewLog'
                title="Add new log"
                fields={this.getAddFormFields()}
                buttons={this.getAddFormButtons()}
            >
            </Form>;
    };
}

export default AddForm;
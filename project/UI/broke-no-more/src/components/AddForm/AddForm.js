import React, { Component } from 'react';

import Form from '../UI/Form/Form';

class AddForm extends Component {
    getAddFormFields = () => [
        { id: 'fieldAddFormType', name: 'Type', type: 'select', availableValues: { 'false': 0, 'true': 1 }, required: true },
        { id: 'fieldAddFormSubject', name: 'Subject', type: 'input', inputType: 'text', min: 10, max: 200, required: true },
        { id: 'fieldAddFormAmount', name: 'Amount', type: 'input', inputType: 'number', max: 200, validation: 'number', required: true },
    ];

    getAddFormButtons = () => [
        { handler: this.props.cancelClicked, label: 'Cancel' },
        { handler: this.props.addClicked, label: 'Add' }
    ];

    render() {
        console.log('form3');
        return (
            <Form
                key='formAddNewLog'
                title="Add new log"
                fields={this.getAddFormFields()}
                buttons={this.getAddFormButtons()}
            >
            </Form>
        );
    }
}

export default AddForm;
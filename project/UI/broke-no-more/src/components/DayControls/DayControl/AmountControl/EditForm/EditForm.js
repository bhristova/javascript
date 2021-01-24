import React, { Component } from 'react';

import Form from '../../../../UI/Form/Form';
import Modal from '../../../../UI/Modal/Modal';

import classes from './EditForm.css';

class EditForm extends Component {

    state = {
        fields: {}
    }

    addToState = (fieldName, value) => {
        const newState = Object.assign({}, this.state.fields);
        newState[fieldName] = value;
        this.setState({fields: newState});
    }
        
    getEditFormFields = () => {
        return [
            { id: 'fieldEditFormType', name: 'Type', type: 'select', availableValues: { 'false': 0, 'true': 1 }, required: true, propertyName: 'icon', handlerInput: (value) => this.addToState('icon', value) },
            { id: 'fieldEditFormCategory', name: 'Category', type: 'select', availableValues: this.getCategories(), required: true, propertyName: 'category', handlerInput: (value) => this.addToState('category', value) },
            { id: 'fieldEditFormSubject', name: 'Subject', type: 'input', inputType: 'text', min: 10, max: 200, required: true, propertyName: 'subject', handlerInput: (value) => this.addToState('subject', value) },
            { id: 'fieldEditFormAmount', name: 'Amount', type: 'input', inputType: 'number', max: 200, validation: 'number', required: true, propertyName: 'amount', handlerInput: (value) => this.addToState('amount', value) },
        ]
    }

    getEditFormButtons = () => {
        return [
            { id: 'buttonCancel', handler:  this.props.cancelClicked, label: 'Cancel' },
            { id: 'buttonAdd', handler: () => this.props.addClicked(this.state.fields), label: 'Add' }
        ];
    }

    getCategories = () => {
        return { food: 'food', clothes: 'clothes', etc: 'etc' };
    }

    render() {
        return <Modal show={this.props.editFormShow}>
            <Form
                key='formEditLog'
                title="Edit log"
                fields={this.getEditFormFields()}
                buttons={this.getEditFormButtons()}
                values={this.props.values}
            >
            </Form>
        </Modal>
    }
}

export default EditForm;
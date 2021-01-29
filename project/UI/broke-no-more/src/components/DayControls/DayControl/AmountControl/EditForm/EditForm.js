import React, { Component } from 'react';

import Form from '../../../../UI/Form/Form';
import Modal from '../../../../UI/Modal/Modal';
import Consts from '../../../../../utils/Consts';
import {getCategories} from '../../../../../api/Category';

import classes from './EditForm.css';

class EditForm extends Component {

    state = {
        fields: {},
        categories: []
    }

    async componentDidMount() {
        try {
            this._isMounted = true;
            const result = await getCategories();
            const categories = result.reduce((acc, category) => {return {...acc, [category.id]: category.Name}}, {})
            this.setState({categories: categories});
            return result;
        } catch(err) {
            console.error(err);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    addToState = (fieldName, value) => {
        const newState = Object.assign({}, this.state.fields);
        newState[fieldName] = value;
        this.setState({fields: newState});
    }
        
    getEditFormFields = () => {
        return [
            { id: 'fieldEditFormType', name: 'Type', type: 'select', availableValues: { [Consts.icons.minus]: 'Expense', [Consts.icons.plus] : 'Income' }, required: true, propertyName: 'icon', handlerInput: (value) => this.addToState('icon', value) },
            { id: 'fieldEditFormCategory', name: 'Category', type: 'select', availableValues: this.state.categories, required: true, propertyName: 'category', handlerInput: (value) => this.addToState('category', value) },
            { id: 'fieldEditFormSubject', name: 'Subject', type: 'input', inputType: 'text', minLength: 10, maxLength: 200, required: true, propertyName: 'subject', handlerInput: (value) => this.addToState('subject', value) },
            { id: 'fieldEditFormAmount', name: 'Amount', type: 'input', inputType: 'number', maxLength: 200, validation: 'number', required: true, propertyName: 'amount', handlerInput: (value) => this.addToState('amount', value) },
        ]
    }

    getEditFormButtons = () => {
        return [
            { id: 'buttonCancel', handler:  this.props.cancelClicked, label: 'Cancel' },
            { id: 'buttonAdd', handler: () => this.props.addClicked(this.state.fields), label: 'Add' }
        ];
    }

    render() {
        if (this.state.categories.length === 0) {
            return null;
        }
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
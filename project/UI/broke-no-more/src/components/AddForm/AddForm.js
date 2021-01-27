import React, { Component } from 'react';

import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';
import Consts from '../../utils/Consts';
import {getCategories} from '../../api/Category';

class AddForm extends Component {
    
    state = {
        fields: {
            icon: Consts.icons.minus,
            category: 'food'
        },
        categories: []
    }

    async componentDidMount() {
        try {
            const result = await getCategories();
            const categories = result.reduce((acc, category) => {return {...acc, [category.id]: category.Name}}, {})
            this.setState({categories: categories});
            return result;
        } catch(err) {
            console.error(err);
            debugger
        }
    }

    addToState = (fieldName, value) => {
        const newState = Object.assign({}, this.state.fields);
        newState[fieldName] = value;
        this.setState({fields: newState});
    }

    getAddFormFields = () => [
        { id: 'fieldAddFormType', name: 'Type', type: 'select', availableValues: {  [Consts.icons.minus]: 'Expense', [Consts.icons.plus] : 'Income'}, required: true, handlerInput: (value) => this.addToState('icon', value)  },
        { id: 'fieldAddFormCategory', name: 'Category', type: 'select', availableValues: this.state.categories, required: true, handlerInput: (value) => this.addToState('category', value)  },
        { id: 'fieldAddFormSubject', name: 'Subject', type: 'input', inputType: 'text', minLength: 10, maxLength: 200, required: true, handlerInput: (value) => this.addToState('subject', value)  },
        { id: 'fieldAddFormAmount', name: 'Amount', type: 'input', inputType: 'number', maxLength: 200, validation: 'number', required: true, handlerInput: (value) => this.addToState('amount', value)  },
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
import React, { Component } from 'react';

import Form from '../UI/Form/Form';

class NewPeriodForm extends Component {

    state = {
        budget: 0,
        currentSum: 0,
        oldInput: 0
    }

    handlerBudgetInput = (value) => {
        if (Number.isNaN(value)) {
            return;
        }

        const newBudget = value - this.state.currentSum;
        this.setState({ budget: newBudget });
    };

    handlerEnterInput = (previousValue) => {
        console.log('arrive');
        if (Number.isNaN(previousValue)) {
            return;
        }

        const newCurrentSum = this.state.currentSum - previousValue;
        this.setState({ oldInput: previousValue, currentSum: newCurrentSum });
    };

    handlerLeaveInput = (newValue) => {
        console.log('leave');
        let val = newValue;
        if (Number.isNaN(newValue)) {
            val = 0;
        }

        const newBudget = this.state.budget + this.state.oldInput - val;
        const newCurrentSum = this.state.currentSum + val;

        this.setState({ budget: newBudget, oldInput: 0, currentSum: newCurrentSum });
    }

    getNewPeriodFormFields = () => [
        { id: 'fieldNewPeriodFormBudget', name: 'Budget', type: 'input', inputType: 'number', required: true, handlerInput: (value) => this.handlerBudgetInput(value) },
        { id: 'fieldNewPeriodFormLabel', name: 'Categories distribution:', type: 'text', },
        {
            id: 'fieldNewPeriodFormCategories', type: 'multifield', fields: [
                { id: 'multifield-clothes', type: 'field', fieldLabel: 'clothes' },
                { id: 'multifield-food', type: 'field', fieldLabel: 'food' },
                { id: 'multifield-traveling', type: 'field', fieldLabel: 'traveling' },
                { id: 'multifield-etc', type: 'field', fieldLabel: 'etc' },
                { id: 'multifield-test1', type: 'field', fieldLabel: 'test1' },
                { id: 'multifield-test2', type: 'field', fieldLabel: 'test2' },
                { id: 'multifield-addCategoryButton', type: 'button', fieldLabel: 'Add category' }
            ],
            enterInputHandler: (value) => this.handlerEnterInput(value), leaveInputHandler: (value) => this.handlerLeaveInput(value)
        },
        { id: 'fieldNewPeriodFormLeft', type: 'calculated', fieldLabel: 'Left', value: this.state.budget }
    ];

    getNewPeriodFormButtons = () => [
        { id: 'buttonCancel', handler: this.props.cancelClicked, label: 'Cancel' },
        { id: 'buttonAdd', handler: this.props.addClicked, label: 'Save' }
    ];

    render() {

        return (
            <Form
                key='formNewPeriod'
                title="New period"
                fields={this.getNewPeriodFormFields()}
                buttons={this.getNewPeriodFormButtons()}>
            </Form>
        )
    };
}


export default NewPeriodForm;

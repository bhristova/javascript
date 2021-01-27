import React, { Component } from 'react';

import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';
import { v4 as uuidv4 } from 'uuid';

import {createCategory, getCategories, deleteCategory} from '../../api/Category';
import {createPeriod} from '../../api/Period';

class NewPeriodForm extends Component {

    state = {
        budget: 0,
        currentSum: 0,
        oldInput: 0,
        addCategoryShow: false,
        categoryFields: [
        ],
        categoryFieldsNames: [],
        startDate: '',
        endDate: ''
    }

    async componentDidMount() {
        const categories = await this.getCategories();
        const startDate = '2021-01-14';
        const endDate = '2021-01-14';
        this.setState({categoryFields: categories, startDate: startDate, endDate: endDate});
    }

    componentDidUpdate() {
        console.log(`component did update! budget is: ${this.state.budget}`)
    }

    handlerBudgetInput = (value) => {
        if (Number.isNaN(value)) {
            return;
        }

        const newBudget = value - this.state.currentSum;
        this.setState({ budget: newBudget });
    };

    handlerEnterInput = (previousValue) => {
        if (Number.isNaN(previousValue)) {
            return;
        }

        const newCurrentSum = this.state.currentSum - previousValue;
        this.setState({ oldInput: previousValue, currentSum: newCurrentSum });
    };

    handlerLeaveInput = (newValue, id) => {
        let val = newValue;
        if (Number.isNaN(newValue)) {
            val = 0;
        }

        const existingCategories = [...this.state.categoryFields];
        const categoryIndex = existingCategories.findIndex(category => category.id === id);
        existingCategories[categoryIndex].Value = newValue;

        const newBudget = this.state.budget + this.state.oldInput - val;
        const newCurrentSum = this.state.currentSum + val;

        this.setState({ budget: newBudget, oldInput: 0, currentSum: newCurrentSum, categoryFields: existingCategories });
    }

    getCategories = async () => {
        const result = await getCategories();
        return result.map(category =>
            ({id: category.id, type: 'input',deleteButton: {value: 'X', deleteHandler: () => this.deleteCategory(category.id)},  labelsClassesNames:'FieldLabel', inputClassesNames:'FieldInput', inputType: 'number', name: category.Name, enterInputHandler: (value) => this.handlerEnterInput(value), leaveInputHandler: (value) => this.handlerLeaveInput(value, category.id) })
        )
    }

    addClicked = async () => {
        try {
            const newCategories = this.state.categoryFields.filter(field => field.contenteditable).map(field => ({id: field.id, name: field.name}));
            if (newCategories.length) {
                await createCategory(newCategories);
            }
            
            const periodCategoriesDistribution = this.state.categoryFields.map(field => ({id: field.id, value: field.Value}));
            const newPeriodData = {id: uuidv4(), budget: this.state.budget, startDate: this.state.startDate, endDate: this.state.endDate, categories: periodCategoriesDistribution};

            await createPeriod(newPeriodData);
            if (newCategories.length) {
                const categories = await this.getCategories();
                this.setState({categoryFields: []});
                this.setState({categoryFields: categories});
            }
        } catch (err) {
            console.error(err);
        }
    }

    addNewCategory = () => {
        const id = uuidv4();
        const newCategory = { id: id, contenteditable: 'true', type: 'labelInput', labelsClassesNames:'InputFieldLabel', inputClassesNames:'FieldInput', inputType: 'number', handlerLabelInput: (evt) => this.onNewCategoryRename(evt, id), enterInputHandler: (value) => this.handlerEnterInput(value), leaveInputHandler: (value) => this.handlerLeaveInput(value, id) };
        const existingCategories = [...this.state.categoryFields];
        existingCategories.push(newCategory);
        this.setState({categoryFields: existingCategories});
    }

    deleteCategory = async (id) => {
        try {
            const result = await deleteCategory(id);

            if(result.message) {
                console.error(result.message);
                return;
            }

            const existingCategories = [...this.state.categoryFields].filter(category => category.id !== id);
            this.setState({categoryFields: existingCategories});
        } catch (err) {
            console.error(err);
        }
    }

    onNewCategoryRename = (evt, id) => {
        const existingCategories = [...this.state.categoryFields];
        const categoryIndex = existingCategories.findIndex(category => category.id === id);
        existingCategories[categoryIndex].name = evt.target.innerHTML;
        this.setState({categoryFields: existingCategories});
    }

    inputDate = (dateType, value) => {
        this.setState({[dateType] : value});
    }

    getNewPeriodFormFields = () => [
        { id: 'fieldNewPeriodFormBudget', name: 'Budget', type: 'input', inputType: 'number', required: true, propertyName: 'bugetAmount', handlerInput: (value) => this.handlerBudgetInput(value) },
        { id: 'fieldNewPeriodFormStartDate', name: 'Start date', type: 'input', inputType: 'date', required: true, propertyName: 'startDate', min: this.state.startDate, handlerInput: (value) => this.inputDate('startDate', value) },
        { id: 'fieldNewPeriodFormEndDate', name: 'End date', type: 'input', inputType: 'date', required: true, propertyName: 'endDate', min: this.state.startDate, handlerInput: (value) => this.inputDate('endDate', value) },
        { id: 'fieldNewPeriodFormLabel', name: 'Categories distribution:', type: 'text'},
        {
            id: 'fieldNewPeriodFormCategories', type: 'multifield', fields: [
                ...this.state.categoryFields,
                { id: 'multifield-addCategoryButton', type: 'button', name: 'Add category', handler: () => this.addNewCategory() },
            ],
        },
        { id: 'fieldNewPeriodFormLeft', type: 'calculated', fieldLabel: 'Left', value: this.state.budget }
    ];

    getNewPeriodFormButtons = () => [
        { id: 'buttonCancel', handler: this.props.cancelClicked, label: 'Cancel' },
        { id: 'buttonAdd', handler: this.addClicked, label: 'Save' } ///TODO: handler: this.props.addClicked
    ];

    getValues = () => {return {
        startDate: this.state.startDate,
        endDate: this.state.endDate
    }};

    getNewCategoryFormFields = () => [
        { id: 'fieldNewCategoryFormName', name: 'Name', type: 'input', inputType: 'text', required: true, propertyName: 'categoryName' },
    ];

    getNewCategoryFormButtons = () => [
        { id: 'buttonCancel', handler: this.props.newcancelClicked, label: 'Cancel' },
        { id: 'buttonAdd', handler: this.props.newaddClicked, label: 'Save' }
    ];

    render() {

        return <Modal show={this.props.newPeriodFormShow}>
                    <Form
                        key='formNewPeriod'
                        title="New period"
                        fields={this.getNewPeriodFormFields()}
                        buttons={this.getNewPeriodFormButtons()}
                        values={this.getValues()}>
                    </Form>
                </Modal>
    };
}


export default NewPeriodForm;

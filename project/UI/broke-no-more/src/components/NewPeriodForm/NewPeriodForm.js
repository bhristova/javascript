import React, { Component } from 'react';

import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';

import {createPeriod} from '../../api/Period';
import * as actionCreators from '../../store/actions';

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
        this._isMounted = true;
        ///TODO: fix these dates
        await this.props.getAllCategories();
        let startDate = '2021-01-14';
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate() + 1);
        const startDateParsed = Intl.DateTimeFormat('ko', {year: 'numeric', month: 'numeric', day: '2-digit'}).format(new Date(startDate)).replaceAll('.', '-').replaceAll(' ', '');


        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);
        const endDateParsed = Intl.DateTimeFormat('ko', {year: 'numeric', month: 'numeric', day: '2-digit'}).format(new Date(endDate)).replaceAll('.', '-').replaceAll(' ', '');

        this.setState({ startDate: startDateParsed, endDate: endDateParsed});
    }

    componentWillUnmount() {
        this._isMounted = false;
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

        const existingCategories = [...this.props.allCategories];
        const categoryIndex = existingCategories.findIndex(category => category.id === id);
        existingCategories[categoryIndex].Value = newValue;

        const newBudget = this.state.budget + this.state.oldInput - val;
        const newCurrentSum = this.state.currentSum + val;

        this.setState({ budget: newBudget, oldInput: 0, currentSum: newCurrentSum, categoryFields: existingCategories });
    }

    getCategories = () => {
        return this.props.allCategories.map(category => 
            ({id: category.id, contenteditable: category.contenteditable, type: 'input', deleteButton: {value: 'X', deleteHandler: () => this.deleteCategory(category.id)},  labelsClassesNames:'FieldLabel', inputClassesNames:'FieldInput', inputType: 'number', name: category.Name, handlerLabelInput: (evt) => this.onNewCategoryRename(evt, category.id), enterInputHandler: (value) => this.handlerEnterInput(value), leaveInputHandler: (value) => this.handlerLeaveInput(value, category.id) })
            )
    }

    addClicked = async () => {
        try {
            const newCategories = this.props.allCategories.filter(field => field.contenteditable);
            if (newCategories.length) {
                await this.props.createCategory(newCategories);
            }
            const periodCategoriesDistribution = this.props.allCategories.map(field => ({id: field.id, value: field.Value}));
            const newPeriodData = {id: uuidv4(), budget: this.state.budget, startDate: this.state.startDate, endDate: this.state.endDate, categories: periodCategoriesDistribution};

            await createPeriod(newPeriodData);
            if (newCategories.length) {
                const categories = this.getCategories();
                this.setState({categoryFields: []});
                this.setState({categoryFields: categories});
            }
            this.props.addClicked();
        } catch (err) {
            console.error(err);
        }
    }

    addNewCategory = () => {
        const id = uuidv4();
        const newCategory = { id: id, contenteditable: 'true', type: 'labelInput', labelsClassesNames:'InputFieldLabel', inputClassesNames:'FieldInput', inputType: 'number', handlerLabelInput: (evt) => this.onNewCategoryRename(evt, id), enterInputHandler: (value) => this.handlerEnterInput(value), leaveInputHandler: (value) => this.handlerLeaveInput(value, id) };
        this.props.newCategoryInput(newCategory);
    }

    deleteCategory = async (id) => {
        try {
            const result = await this.props.removeCategory(id);

            if(result.message) {
                console.error(result.message);
                return;
            }
        } catch (err) {
            console.error(err);
        }
    }

    onNewCategoryRename = (evt, id) => {
        this.props.editCategory({id: id, name: evt.target.innerHTML});
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
                ...this.getCategories(),
                { id: 'multifield-addCategoryButton', type: 'button', name: 'Add category', handler: () => this.addNewCategory() },
            ],
        },
        { id: 'fieldNewPeriodFormLeft', type: 'calculated', fieldLabel: 'Left', value: this.state.budget }
    ];

    getNewPeriodFormButtons = () => [
        { id: 'buttonCancel', handler: this.props.cancelClicked, label: 'Cancel' },
        { id: 'buttonAdd', handler: this.addClicked, label: 'Save' }
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

const mapDispatchToProps = dispatch => {
    return {
        getAllCategories: () => dispatch(actionCreators.getAllCategories()),
        createCategory: (newCategories) => dispatch(actionCreators.createCategory(newCategories)),
        newCategoryInput: (newCategory) => dispatch(actionCreators.newCategoryInput(newCategory)),
        removeCategory: (id) => dispatch(actionCreators.removeCategory(id)),
        editCategory: (updated) => dispatch(actionCreators.editCategory(updated))
    }
}

const mapStateToProps = state => {
    return {
        allCategories: state.allCategories
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPeriodForm);

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
        endDate: '',
        startDateOriginal: '',
        endDateOriginal: ''
    }

    async componentDidMount() {
        this._isMounted = true;
        await this.props.getAllCategories(this.props.periodId);
        if(!this.allPeriods) {
            await this.props.onGetAllPeriods();
        }
        const sortedDates = this.props.allPeriods
            .map(period => period.endDate)
            .filter(date => date)
            .sort();
        let startDate = sortedDates[sortedDates.length - 1].substring(0, 10);
        this.setState({ startDateOriginal: startDate, startDate: startDate, endDate: startDate});
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
            const periodCategoriesDistribution = this.props.allCategories.filter(field => field.Value).map(field => ({id: field.id, value: field.Value}));
            if(this.state.budget > 0) {
                periodCategoriesDistribution.push({id: 'a7c89f82-67bf-44ae-b182-77c9138b9a58', value: this.state.budget});
            }
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
        { id: 'fieldNewPeriodFormStartDate', name: 'Start date', type: 'input', inputType: 'date', required: true, propertyName: 'startDate', min: this.state.startDateOriginal, handlerInput: (value) => this.inputDate('startDate', value) },
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
        getAllCategories: (periodId) => dispatch(actionCreators.getAllCategories(periodId)),
        createCategory: (newCategories) => dispatch(actionCreators.createCategory(newCategories)),
        newCategoryInput: (newCategory) => dispatch(actionCreators.newCategoryInput(newCategory)),
        removeCategory: (id) => dispatch(actionCreators.removeCategory(id)),
        editCategory: (updated) => dispatch(actionCreators.editCategory(updated)),
        onGetAllPeriods: () => dispatch(actionCreators.getAllPeriods()),
    }
}

const mapStateToProps = state => {
    return {
        allCategories: state.allCategories,
        periodId: state.periodId,
        allPeriods: state.allPeriods
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPeriodForm);

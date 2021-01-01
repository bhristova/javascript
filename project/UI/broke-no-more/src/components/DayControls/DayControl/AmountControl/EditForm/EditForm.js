import React from 'react';

import Form from '../../../../UI/Form/Form';
import Modal from '../../../../UI/Modal/Modal';

import classes from './EditForm.css';

const editForm = (props) => {
    return <Modal show={props.editFormShow}>
    <Form
        key='formEditLog'
        title="Edit log"
        fields={getEditFormFields()}
        buttons={getEditFormButtons(props)}
        values={props.values}
    >
    </Form>
</Modal>
}

const getEditFormFields = () => {
    return [
        { id: 'fieldEditFormType', name: 'Type', type: 'select', availableValues: { 'false': 0, 'true': 1 }, required: true, propertyName: 'icon' },
        { id: 'fieldEditFormCategory', name: 'Category', type: 'select', availableValues: getCategories(), required: true, propertyName: 'category' },
        { id: 'fieldEditFormSubject', name: 'Subject', type: 'input', inputType: 'text', min: 10, max: 200, required: true, propertyName: 'subject' },
        { id: 'fieldEditFormAmount', name: 'Amount', type: 'input', inputType: 'number', max: 200, validation: 'number', required: true, propertyName: 'amount' },
    ]
}

const getEditFormButtons = (props) => {
    return [
        { id: 'buttonCancel', handler:  props.cancelClicked, label: 'Cancel' },
        { id: 'buttonAdd', handler: props.addClicked, label: 'Add' }
    ];
}

const getCategories = () => {
    return { food: 'food', clothes: 'clothes', etc: 'etc' };
}

export default editForm;
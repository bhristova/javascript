import React from 'react';

import Form from '../../../../UI/Form/Form';
import Modal from '../../../../UI/Modal/Modal';

import classes from './DeleteForm.css';

const deleteForm = (props) => {
    return <Modal show={props.deleteFormShow}>
    <Form
        key='formDeleteLog'
        title="Delete log"
        fields={getDeleteFormFields()}
        buttons={getDeleteFormButtons(props)}
    >
    </Form>
</Modal>
}

const getDeleteFormFields = () => {
    return [
        { id: 'fieldDeleteFormQuestion', name: 'Are you sure you want to delete this log?', type: 'text' },
    ]
}

const getDeleteFormButtons = (props) => {
    return [
        { id: 'buttonCancel', handler:  props.cancelClicked, label: 'Cancel' },
        { id: 'buttonAdd', handler: props.deleteClicked, label: 'Delete' }
    ];
}

export default deleteForm;
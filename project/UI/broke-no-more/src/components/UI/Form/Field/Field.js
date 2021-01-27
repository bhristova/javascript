import React from 'react';

import Aux from '../../../../hoc/Auxiliary';

import classes from './Field.css';

const typesMap = ['select', 'input', 'text', 'multifield', 'calculated', 'button'];
const validatorsMap = [
    { 'number': 'validateNumber' },
    { 'password': 'validatePassword' },
    { 'email': 'validateEmail' }
]

const field = (props) => {
    switch (getType(props.properties.type)) {
        case 'input':
            return <div className={props.properties.labelsClassesNames ? classes.Field : classes.NormalField} key={`multifield-${props.properties.id}`}>
                <div contentEditable={props.properties.contenteditable} className={classes[props.properties.labelsClassesNames] || classes.Label} //TODO: react doesn't like contentEditable, fix this and pls refactor this file :)))
                    htmlFor={props.properties.id}
                    onBlur={props.properties.handlerLabelInput ? (evt) => props.properties.handlerLabelInput(evt) : null}
                    key={`input-label-${props.properties.id}`}>
                    {props.properties.name}
                </div>
                <input className={classes[props.properties.inputClassesNames] || classes.Input}
                    key={`input-${props.properties.id}`}
                    id={props.properties.id}
                    name={props.properties.name}
                    type={props.properties.inputType}
                    required={props.properties.required}
                    placeholder={props.properties.placeholder}
                    maxLength={props.properties.maxLength}
                    minLength={props.properties.minLength}
                    disabled={props.properties.disabled}
                    pattern={getValidator(props.properties.validation)}
                    min={props.properties.min}
                    disabled={props.properties.disabled}
                    defaultValue={props.value || null}
                    // value={props.value || null}
                    onInput={props.properties.handlerInput ? (evt) => props.properties.handlerInput(evt.target.value) : null}
                    onFocus={props.properties.enterInputHandler ? (evt) => props.properties.enterInputHandler(Number.parseFloat(evt.target.value)) : null}
                    onBlur={props.properties.leaveInputHandler ? (evt) => props.properties.leaveInputHandler(Number.parseFloat(evt.target.value)) : null}
                    >
                </input>
                {props.properties.deleteButton && <button onClick={props.properties.deleteButton.deleteHandler} className={classes.DeleteButton}>{props.properties.deleteButton.value}</button>}
            </div>;
        case 'select':
            return <div className={ classes.NormalField}>
                <label className={classes.Label}
                    htmlFor={props.properties.id}
                    key={`select-label-${props.properties.id}`}>
                    {props.properties.name}
                </label>
                <select
                    key={`select-${props.properties.id}`}
                    id={props.properties.id}
                    name={props.properties.name}
                    required={props.properties.required}
                    placeholder={props.properties.placeholder}
                    disabled={props.properties.disabled}
                    defaultValue={props.value || null}
                    onInput={props.properties.handlerInput ? (evt) => props.properties.handlerInput(evt.target.value) : null}>
                    {Object.keys(props.properties.availableValues)
                        .map(key =>
                            <option value={key} key={key}>
                                {props.properties.availableValues[key]}
                            </option>
                        )}
                </select>
            </div>;
        case 'text':
            return <p className={classes.Text} key={`text-${props.properties.id}`}>
                {props.properties.name}
            </p>;
        case 'multifield':
            return <div className={classes.Multifield}>
                    {props.children}
            </div>;
        case 'calculated':
            return <div className={classes.Calculated} key={props.properties.id}>
                    {props.properties.fieldLabel}: {props.properties.value}
                </div>;
        case 'button':
            return <div className={classes.Field} key={props.properties.id}>
                        <button onClick={props.properties.handler} className={classes.FieldButton}>{props.properties.name}</button>
                    </div>
        default:
            return null;
    }
}

const getType = (type) => {
    let typeProcesses = type;
    if (!typeProcesses || !typesMap.includes(typeProcesses)) {
        typeProcesses = 'input';
    }
    return typeProcesses;
}

const getValidator = (validation) => {
    // const validator = validatorsMap.find(v => v[validation]);
    // if(validator) {
    //     return validator[validation];
    // }
    // return null;
    //TODO: pattern="[Bb]anana|[Cc]herry|[Aa]pple|[Ss]trawberry|[Ll]emon|[Oo]range">
}

export default field;
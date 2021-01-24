import React from 'react';

import Aux from '../../../../hoc/Auxiliary';

import classes from './Field.css';

const typesMap = ['select', 'input', 'text', 'multifield', 'calculated'];
const validatorsMap = [
    { 'number': 'validateNumber' },
    { 'password': 'validatePassword' },
    { 'email': 'validateEmail' }
]

const field = (props) => {
    switch (getType(props.properties.type)) {
        case 'input':
            return <Aux>
                <label className={classes.Label}
                    htmlFor={props.properties.id}
                    key={`input-label-${props.properties.id}`}>
                    {props.properties.name}
                </label>
                <input className={classes.Input}
                    key={`input-${props.properties.id}`}
                    id={props.properties.id}
                    name={props.properties.name}
                    type={props.properties.inputType}
                    required={props.properties.required}
                    placeholder={props.properties.placeholder}
                    maxLength={props.properties.max}
                    minLength={props.properties.min}
                    disabled={props.properties.disabled}
                    pattern={getValidator(props.properties.validation)}
                    defaultValue={props.value || null}
                    onInput={props.properties.handlerInput ? (evt) => props.properties.handlerInput(evt.target.value) : null}>
                </input>
            </Aux>;
        case 'select':
            return <Aux>
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
            </Aux>;
        case 'text':
            return <p className={classes.Text} key={`text-${props.properties.id}`}>
                {props.properties.name}
            </p>;
        case 'multifield':
            return <div className={classes.Multifield}>
                {props.properties.fields.map(field => {
                    if (field.type === 'field') {
                        return <div className={classes.Field} key={`multifield-${field.id}`}>
                            <div className={classes.FieldLabel}>{field.fieldLabel}</div>
                            <input className={classes.FieldInput}
                                type='number'
                                onFocus={(evt) => props.properties.enterInputHandler(Number.parseFloat(evt.target.value))}
                                onBlur={(evt) => props.properties.leaveInputHandler(Number.parseFloat(evt.target.value))}
                                onInput={props.properties.handlerInput ? (evt) => props.properties.handlerInput(evt.target.value) : null}>
                            </input>
                        </div>
                    } else if (field.type === 'button') {
                        return <div className={classes.Field} key={field.id}>
                            <button className={classes.FieldButton}>{field.fieldLabel}</button>
                        </div>
                    }
                })}
            </div>;
        case 'calculated':
            return <div className={classes.Calculated} key={props.properties.id}>
                    {props.properties.fieldLabel}: {props.properties.value}
                </div>;
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
import React from 'react';

import Aux from '../../../../hoc/Auxiliary';

import classes from './Field.css';

const typesMap = ['select', 'input'];
const validatorsMap = [
    { 'number': 'validateNumber' },
    { 'password': 'validatePassword' },
    { 'email': 'validateEmail' }
]

const field = (props) => {
    switch (getType(props.properties.type)) {
        case 'input':
            return (
                <Aux>
                    <label className={classes.Label} 
                            htmlFor={props.properties.id}
                            key={`input-label-${props.properties.id}`}
                            >{props.properties.name}</label>
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
                    ></input>
                </Aux>
            );
        case 'select':
            return (
                <Aux>
                    <label className={classes.Label} 
                            htmlFor={props.properties.id}
                            key={`select-label-${props.properties.id}`}
                            >{props.properties.name}</label>
                    <select
                        key={`select-${props.properties.id}`}
                        id={props.properties.id}
                        name={props.properties.name}
                        required={props.properties.required}
                        placeholder={props.properties.placeholder}
                        disabled={props.properties.disabled}>
                        {Object.keys(props.properties.availableValues)
                            .map(key => (<option value={key} key={key}>
                                            {props.properties.availableValues[key]}
                                        </option>))}
                    </select>
                </Aux>
            );
        default:
            return null;
    }
}

const getType = (type) => {
    let typeProcesses = type;
    if(!typeProcesses || !typesMap.includes(typeProcesses)) {
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
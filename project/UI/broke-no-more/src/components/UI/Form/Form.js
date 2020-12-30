import React, { Component } from 'react';

import Field from './Field/Field';
import Button from '../Button/Button';

import classes from './Form.css';

class Form extends Component {
    render() {
        
        return (
            <div className={classes.Form}>
                <div className={classes.Heading}>
                    <p>{this.props.title}</p>
                </div>
                {this.props.fields.map(field =>
                    <div className={classes.Field} >
                        <Field
                            key={field.id}
                            properties={field}>
                        </Field>
                    </div>
                )}
                <div className={classes.Buttons}>
                {this.props.buttons.map(button =>
                    <Button buttonHandler={button.handler} label={button.label}/>
                )}
                </div>
            </div>
        );
    }
}

export default Form;
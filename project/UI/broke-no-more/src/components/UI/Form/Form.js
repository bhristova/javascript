import React, { Component } from 'react';

import Field from './Field/Field';
import Button from '../Button/Button';

import classes from './Form.css';

class Form extends Component {
    render() {
        let iter = 0;
        return <div className={classes.Form} key={iter++}>
            <div className={classes.Heading}>
                <p>{this.props.title}</p>
            </div>
            {this.props.fields.map(field =>
                <div className={classes.Field} key={field.id} >
                    <Field
                        properties={field}
                        value={this.props.values ? this.props.values[field.propertyName] : null}
                    >
                    </Field>
                </div>
            )}
            <div className={classes.Buttons}>
                {this.props.buttons.map(button =>
                    <Button buttonHandler={button.handler} label={button.label} key={button.id} />
                )}
            </div>
        </div>;
    }
}

export default Form;
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
            {this.props.fields && this.props.fields.map(field =>
                    <Field
                        properties={field}
                        value={this.props.values ? this.props.values[field.propertyName] : null}
                        key={field.id}>
                        {field.type === 'multifield' ? field.fields.map(f => <Field properties={f} key={f.id}></Field>) : null}
                    </Field>
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
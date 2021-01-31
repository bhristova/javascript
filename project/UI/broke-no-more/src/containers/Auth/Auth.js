import React, {Component} from 'react';
import { connect } from 'react-redux';

import Form from '../../components/UI/Form/Form';
import Modal from '../../components/UI/Modal/Modal';
import * as actionTypes from '../../store/actions';

class Auth extends Component {
    state = {
        login: true
    }

    onLogin = () => {

    }

    getFormFields = () => {
        if (this.state.login) {
            return [
                { id: 'fieldAuthEmail', name: 'Email', type: 'input', inputType: 'email', required: true, propertyName: 'email'},
                { id: 'fieldAuthPassword', name: 'Password', type: 'input', inputType: 'password', required: true, propertyName: 'password' },
            ];
        }

        return [
            { id: 'fieldAuthEmail', name: 'Email', type: 'input', inputType: 'email', required: true, propertyName: 'email'},
            { id: 'fieldUserName', name: 'UserName', type: 'input', inputType: 'text', required: true, propertyName: 'username' },
            { id: 'fieldAuthPassword', name: 'Password', type: 'input', inputType: 'password', required: true, propertyName: 'password' },
        ];
    }

    getFormButtons = () => [
                { id: 'buttonLogin', handler: () => this.props.onAuth('token4e'), label: 'Login' },
                { id: 'buttonRegister', handler: this.props.onNoAuth, label: 'Register' } 
            ];

    getFormTitle = () => this.state.login ? 'Login' : 'Register';

    render () {
        console.log(this.props);
        return <Modal show={true}><Form
                        key='formNewPeriod'
                        title={this.getFormTitle()}
                        fields={this.getFormFields()}
                        buttons={this.getFormButtons()}>
                    </Form>
                </Modal>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (authToken) => dispatch({type: actionTypes.AUTH, authToken: authToken, isAuthenticated: true}),
        onNoAuth: () => dispatch({type: actionTypes.AUTH, authToken: null, isAuthenticated: false}),
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
        authToken: state.authToken
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
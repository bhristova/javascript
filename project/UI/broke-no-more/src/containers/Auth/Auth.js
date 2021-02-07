import React, {Component} from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Form from '../../components/UI/Form/Form';
import Modal from '../../components/UI/Modal/Modal';
import * as actionCreators from '../../store/actions';

class Auth extends Component {
    state = {
        login: true,
        data: [],
        showLoginRegisterForm: true
    }

    componentDidMount() {
        this.props.logout();
        sessionStorage.clear();
    }

    onLogin = async () => {
        try {
            if (!this.state.login) {
                return this.setState({login: true});
            }

            const result = await this.props.loginUser(this.state.data);
            if(result.message === 'OK') {
                this.setState({showLoginRegisterForm: false});
            }
        } catch (err) {

        }
    }

    onRegister = async () => {
        try {
            if (this.state.login) {
                return this.setState({login: false});
            }
            await this.props.registerUser({id: uuidv4(),...this.state.data});
            return this.setState({login: true});
        } catch (err) {

        }
    }

    addToState = (fieldName, value) => {
        const newState = Object.assign({}, this.state.data);
        newState[fieldName] = value;
        this.setState({data: newState});
    }

    getFormFields = () => {
        if (this.state.login) {
            return [
                { id: 'fieldAuthEmail', name: 'Email', type: 'input', inputType: 'email', required: true, propertyName: 'email', handlerInput: (value) => this.addToState('email', value) },
                { id: 'fieldAuthPassword', name: 'Password', type: 'input', inputType: 'password', required: true, propertyName: 'password', handlerInput: (value) => this.addToState('password', value) },
            ];
        }

        return [
            { id: 'fieldAuthEmail', name: 'Email', type: 'input', inputType: 'email', required: true, propertyName: 'email', handlerInput: (value) => this.addToState('email', value)},
            { id: 'fieldUserName', name: 'UserName', type: 'input', inputType: 'text', required: true, propertyName: 'username', handlerInput: (value) => this.addToState('username', value) },
            { id: 'fieldFirstName', name: 'FirstName', type: 'input', inputType: 'text', required: true, propertyName: 'firstName', handlerInput: (value) => this.addToState('firstName', value) },
            { id: 'fieldLastName', name: 'LastName', type: 'input', inputType: 'text', required: true, propertyName: 'lastName', handlerInput: (value) => this.addToState('lastName', value) },
            { id: 'fieldAuthPassword', name: 'Password', type: 'input', inputType: 'password', required: true, propertyName: 'password', handlerInput: (value) => this.addToState('password', value) },
        ];
    }

    getFormButtons = () => [
                { id: 'buttonLogin', handler: () => this.onLogin(), label: 'Login' },
                { id: 'buttonRegister', handler: () => this.onRegister(), label: 'Register' } 
            ];

    getFormTitle = () => this.state.login ? 'Login' : 'Register';

    render () {
        console.log(this.props);
        return <Modal show={this.state.showLoginRegisterForm}><Form
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
        registerUser: (data) => dispatch(actionCreators.registerUser(data)),
        loginUser: (data) => dispatch(actionCreators.loginUser(data)),
        logout: () => dispatch(actionCreators.logout())
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
        authToken: state.authToken
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
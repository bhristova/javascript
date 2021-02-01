import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../hoc/Auxiliary';
import DayControls from '../components/DayControls/DayControls';
import {getPeriods} from '../api/Period';
import * as actionCreators from '../store/actions';


class MainPage extends Component {

    async componentDidMount() {
        if(this.props.location.search) {
            const queryParams = new URLSearchParams(this.props.location.search);
            const periodId = queryParams.get('periodId');
            const startDate = queryParams.get('startDate');
            const endDate = queryParams.get('endDate');
            await this.props.getPeriodAmountLogs(periodId, endDate, startDate);
            return;
        }
    }

    render() {
        return (
            <Aux>
                <div onClick={this.props.onAuth}></div>
                {this.props.periodId && <DayControls periodId={this.props.periodId} startDate={this.props.periodData.startDate} endDate={this.props.periodData.endDate}/>}
            </Aux> 
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onAuth: (authToken) => dispatch({type: actionTypes.AUTH, authToken: authToken, isAuthenticated: true}),
        // onNoAuth: () => dispatch({type: actionTypes.AUTH, authToken: null, isAuthenticated: false}),
        getPeriodAmountLogs: (periodId, endDate, startDate) => dispatch(actionCreators.getPeriodAmountLogs(periodId, endDate, startDate)),
    }
}
const mapStateToProps = state => {
    return {
        periodId: state.periodId,
        periodData: state.periodData,
        isAuthenticated: state.isAuthenticated,
        authToken: state.authToken
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
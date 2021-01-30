import React, { Component } from 'react';

import Aux from '../hoc/Auxiliary';
import DayControls from '../components/DayControls/DayControls';
import {getPeriods} from '../api/Period';

class MainPage extends Component {

    state = {periodId: '', startDate: '', endDate: ''};

    getLastPeriod = async () => {
        const result = await getPeriods(true);
        if(result) {
            const data = result[0];
            return {periodId: data.id, startDate: data.startDate, endDate: data.endDate};
        }
        return;
    }

    async componentDidMount() {
        if(this.props.location.search) {
            const queryParams = new URLSearchParams(this.props.location.search);
            const periodId = queryParams.get('periodId');
            const startDate = queryParams.get('startDate');
            const endDate = queryParams.get('endDate');
            this.setState({periodId: periodId, startDate: startDate, endDate: endDate});
            return;
        }

        const {periodId, startDate, endDate} = await this.getLastPeriod();
        this.setState({periodId: periodId, startDate: startDate, endDate: endDate});
    }

    render() {
        return (
            <Aux>
                {this.state.periodId && <DayControls periodId={this.state.periodId} startDate={this.state.startDate} endDate={this.state.endDate}/>}
            </Aux>
        );
    }
}

export default MainPage;
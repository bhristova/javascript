import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from'react-redux';

import DayControl from './DayControl/DayControl'
import AddForm from '../AddForm/AddForm';
import BarChart from '../UI/BarChart/BarChart';
import * as actionCreators from '../../store/actions';
import {isDateEarlierOrEqual} from '../../utils/Date';

class DayControls extends Component {
    state = {
        page: 0,
        prevY: 0,
        addFormShow: false
    }

    async componentDidMount() {
        this._isMounted = true;
        await this.props.getChartData(this.props.periodId);

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        
        this.observer = new IntersectionObserver(await this.handleObserver.bind(this), options);
        this.observer.observe(this.loadingRef);
        this.setState({loading: false});
    }

    componentWillUnmount() {
        this.observer.disconnect();
        this._isMounted = false;
    }

    handleObserver = async (entities, observer) => {
        try {
            const y = entities[0].boundingClientRect.y;
            if (this.state.prevY > y) {
                const lastLog = this.props.periodData[this.props.periodData.length - 1];
                const endDate = lastLog[0].date;
                if(!isDateEarlierOrEqual(endDate, this.props.startDate)) {
                    await this.props.getPeriodAmountLogs(this.props.periodId, endDate, this.props.startDate);
                }
                this.setState({ page: endDate });
            }
            this.setState({ prevY: y, loading: false });
        } catch (err) {
            console.error(err);
        }
    }
    
    deleteClicked = async (id) => {
        try {
            await this.props.removeAmountLog(id);
            await this.props.getChartData(this.props.periodId);
        } catch (err) {
            console.error(err);
        }
    }

    addButtonClicked = async (fields) => {
        try {
            fields.id = uuidv4();
            const date = new Date();
            fields.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            fields.forPeriod = this.props.periodId;

            await this.props.createAmountLog(fields);
            await this.props.getChartData(this.props.periodId);
        } catch (err) {
            console.error(err);
        }
    }

    
    editClicked = async (id, date, fields) => {
        try {
            await this.props.editAmountLog(fields, date, id)
            await this.props.getChartData(this.props.periodId)
        } catch (err) {
            console.error(err);
        }
    }

    render () {
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };
    
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
          
        return <div className="container">
            {this.state.addFormShow && <AddForm
                cancelClicked={() => {this.setState({addFormShow: false})}}
                addClicked={(fields) => {this.addButtonClicked(fields); this.setState({addFormShow: false})}}
                addFormShow={this.state.addFormShow}
            />}
            <div style={{ minHeight: "800px" }}>
                {this.props.periodData.map(elem => (
                    <DayControl
                                key={elem[0].date}
                                dayData={elem}
                                addButtonHandler={() => {this.setState({addFormShow: true})}}
                                deleteClicked={(id, date) => this.deleteClicked(id, date)}
                                editClicked={(id, date, fields) => this.editClicked(id, date, fields)}
                                refreshChartData={async () => await this.props.getChartData(this.props.periodId)}/>
                ))}
            </div>
            <div
                ref={loadingRef => (this.loadingRef = loadingRef)}
                style={loadingCSS}>
                    <span style={loadingTextCSS}>Loading...</span>
            </div>
            <BarChart 
                periodId={this.props.periodId} 
                data={this.props.chartData}
                amountLeft={this.props.amountLeft}
                amountUsed={this.props.amountUsed}/>
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPeriodAmountLogs: (periodId, endDate, startDate) => dispatch(actionCreators.getPeriodAmountLogs(periodId, endDate, startDate)),
        createAmountLog: (fields) => dispatch(actionCreators.createAmountLog(fields)),
        removeAmountLog: (id) => dispatch(actionCreators.removeAmountLog(id)),
        editAmountLog: (fields, date, periodId) => dispatch(actionCreators.editAmountLog(fields, date, periodId)),
        getChartData: (periodId) => dispatch(actionCreators.getChartData(periodId)),
    }
}

const mapStateToProps = state => {
    return {
        amountUsed: state.amountUsed,
        amountLeft: state.amountLeft,
        chartData: state.chartData,
        startDate: state.startDate,
        endDate: state.endDate,
        periodId: state.periodId,
        periodData: state.periodData,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayControls);
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DayControl from './DayControl/DayControl'
import AddForm from '../AddForm/AddForm';
import {getAmountLogs, deleteAmountLog, createAmountLog} from '../../api/AmountLog';
import {getPeriodStatistics} from '../../api/Period';
import BarChart from '../UI/BarChart/BarChart';

import NewPeriodForm from '../NewPeriodForm/NewPeriodForm';

class DayControls extends Component {
    state = {
        data: [],
        page: 0,
        prevY: 0,
        addFormShow: false,
        chartData: [],
        amountLeft: 0,
        amountUsed: 0
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState != this.state;
    // }

    getData = async (endDate) => {
        const endDateParam = endDate || this.props.endDate;
        const startDateParam = this.props.startDate;
        if(new Date(endDateParam) < new Date(startDateParam)) {
            return;
        }

        this.setState({loading: true});
        const newData = await getAmountLogs(this.props.periodId, endDateParam, startDateParam);
        this.setState((state) => {
            return {data: [...state.data, ...newData], loading: true};
        });
        return;
    }

    getChartData = async () => {
        try {
            const result = await getPeriodStatistics(this.props.periodId);
            const amountUsed = result.reduce((acc, cur) => acc + cur.actualAmount, 0)
            const amountLeft = result.reduce((acc, cur) => acc + cur.expectedAmount, 0) - amountUsed;
            this.setState({chartData: []});
            this.setState({chartData: result, amountLeft: amountLeft, amountUsed: amountUsed});
        } catch (err) {
            console.error(err);
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        const date = new Date();
        date.setDate(date.getDate() + 1);
        await this.getData();
        await this.getChartData();

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        
        this.observer = new IntersectionObserver(
            await this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
        this.setState({loading: false});
    }

    componentWillUnmount() {
        this.observer.disconnect();
        this._isMounted = false;
    }

    handleObserver = async (entities, observer) => {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
          const lastLog = this.state.data[this.state.data.length - 1];
          const endDate = lastLog[0].date;
          await this.getData(endDate);
          this.setState({ page: endDate });
        }
        this.setState({ prevY: y, loading: false });
    }
    
    deleteClicked = async (id, date) => {
        try {
            await deleteAmountLog(id);
            await this.getChartData();

            this.setState(state => {
                const newData = [...state.data];
                const index = newData.findIndex(elem => elem[0].date === date);
                const data = newData.find(elem => elem[0].date === date).filter(elem => elem.id !== id);
                if(data.length) {
                    newData[index] = data;
                } else {
                    newData[0] = {date: date};
                }
                return {data: newData};
            });
        } catch (err) {
            console.error(err);
        }
    }
    
    compareDates = (log1, log2) => {
        const date1 = new Date(log1);
        const date2 = new Date(log2);

        return date1.getDate()     === date2.getDate()
            && date1.getMonth()    === date2.getMonth()
            && date1.getFullYear() === date2.getFullYear();
    }

    addButtonClicked = async (fields) => {
        try {
            fields.id = uuidv4();
            const date = new Date();
            fields.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            fields.forPeriod = this.props.periodId;

            await createAmountLog(fields);
            await this.getChartData();

            this.setState(state => {
                let newData = [...state.data];
                let dataIndex = newData.findIndex(elem => this.compareDates(elem[0].date, fields.date));
                if(dataIndex < 0) {
                    const newLogData = [fields];
                    newData = [...newData, newLogData];
                } else {
                    newData[dataIndex] = [...newData[dataIndex], fields];
                }

                return {data: newData};
            });
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
            <AddForm
                cancelClicked={() => {this.setState({addFormShow: false})}}
                addClicked={(fields) => {this.addButtonClicked(fields); this.setState({addFormShow: false})}}
                addFormShow={this.state.addFormShow}
            />
            {/* <NewPeriodForm 
                cancelClicked={() => {this.setState({addFormShow: false})}}
                addClicked={() => {this.setState({addFormShow: false})}}
                newPeriodFormShow={this.state.addFormShow}
                /> */}
            <div style={{ minHeight: "800px" }}>
                {this.state.data.map(elem => (
                    <DayControl
                                key={elem[0].date}
                                dayData={elem}
                                addButtonHandler={() => {this.setState({addFormShow: true})}}
                                deleteClicked={(id, date) => this.deleteClicked(id, date)}
                                refreshChartData={() => this.getChartData()}/>
                ))}
            </div>
            <div
                ref={loadingRef => (this.loadingRef = loadingRef)}
                style={loadingCSS}>
                    <span style={loadingTextCSS}>Loading...</span>
            </div>
            {this.state.chartData && <BarChart 
                periodId={this.props.periodId} 
                data={this.state.chartData}
                amountLeft={this.state.amountLeft}
                amountUsed={this.state.amountUsed}/>}
        </div>
    }
}

export default DayControls;
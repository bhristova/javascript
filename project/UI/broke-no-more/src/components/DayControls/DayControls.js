import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DayControl from './DayControl/DayControl'
import AddForm from '../AddForm/AddForm';
import {getAmountLogs, deleteAmountLog, createAmountLog} from '../../api/AmountLog';

class DayControls extends Component {
    state = {
        data: [],
        loading: false,
        page: 0,
        prevY: 0,
        addFormShow: false
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState != this.state;
    // }

    getData = async (lastDate) => {
        this.setState({loading: true});
        const newData = await getAmountLogs(lastDate);
        this.setState((state) => {
            return {data: [...state.data, ...newData], loading: true};
        });
        return;
    }

    async componentDidMount() {
        await this.getData();

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    handleObserver = (entities, observer) => {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
          const lastLog = this.state.data[this.state.data.length - 1];
          const lastDate = lastLog[0].date;
          this.getData(lastDate);
          this.setState({ page: lastDate });
        }
        this.setState({ prevY: y });
    }
    
    deleteClicked = async (id, date) => {
        try {
            await deleteAmountLog(id);

            this.setState(state => {
                const newData = [...state.data];
                const index = newData.findIndex(elem => elem[0].date === date);
                const data = newData.find(elem => elem[0].date === date).filter(elem => elem.id !== id);
                newData[index] = data;
    
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

            await createAmountLog(fields);

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
            {/* <NewPeriodForm /> */}
            <div style={{ minHeight: "800px" }}>
                {this.state.data.map(elem => (
                    <DayControl
                                key={elem[0].date}
                                dayData={elem}
                                addButtonHandler={() => {this.setState({addFormShow: true})}}
                                deleteClicked={(id, date) => this.deleteClicked(id, date)}/>
                ))}
            </div>
            <div
                ref={loadingRef => (this.loadingRef = loadingRef)}
                style={loadingCSS}>
                    <span style={loadingTextCSS}>Loading...</span>
            </div>
        </div>
    }
}

export default DayControls;
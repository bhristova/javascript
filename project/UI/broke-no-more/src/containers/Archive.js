import React, { Component } from 'react';
import { connect } from 'react-redux';

import UniversalContainer from '../components/UI/UniversalContainer/UniversalContainer';
import {Link} from 'react-router-dom';
import classes from './Archive.css';
import NewPeriodForm from '../components/NewPeriodForm/NewPeriodForm';
import * as actionCreators from '../store/actions';


class Archive extends Component {

    state = {
        showNewPeriodForm: false
    }

    getData = async() => {
        try {
            await this.props.onGetAllPeriods();
        } catch (err) {
            console.error(err);
        }
    }

    async componentDidMount() {
        await this.getData();
    }
    
    onAddNewPeriod = async () => {
        await this.getData();
        this.setState({showNewPeriodForm: false});
    }

    render() {
        return (
            <div>
                {this.props.allPeriods.map(elem => (
                    <UniversalContainer
                                key={elem.id}
                                heading={
                                    elem.link ? <Link className={classes.Link} to={{pathname: '/mainPage', search: `periodId=${elem.id}&endDate=${elem.endDate}&startDate=${elem.startDate}`}}>{elem.dateHeading}</Link>    
                                              : <div className={classes.Link}  onClick={() => this.setState({showNewPeriodForm: true})}>{elem.dateHeading}</div>
                                }
                                />
                    
                ))}
                {this.state.showNewPeriodForm && <NewPeriodForm
                    cancelClicked={() => this.setState({showNewPeriodForm: false})}
                    addClicked={() => this.onAddNewPeriod()}
                    newPeriodFormShow={this.state.showNewPeriodForm}
                />}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllPeriods: () => dispatch(actionCreators.getAllPeriods()),
        onAddNewPeriod: () => dispatch(actionCreators.getAllPeriods()),
    }
}
const mapStateToProps = state => {
    return {
        allPeriods: state.allPeriods,
        showNewPeriodForm: state.uiState.showNewPeriodForm
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
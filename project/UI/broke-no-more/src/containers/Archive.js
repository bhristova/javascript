import React, { Component } from 'react';

import Aux from '../hoc/Auxiliary';
import UniversalContainer from '../components/UI/UniversalContainer/UniversalContainer';
import {getPeriods} from '../api/Period';
import {Link} from 'react-router-dom';
import classes from './Archive.css';

class Archive extends Component {

    state = {
        data: []
    }

    prettifyDate = (date) => {
        return new Intl.DateTimeFormat('en', {year: 'numeric', month: 'long', day: '2-digit'}).format(new Date(date));
    }

    getData = async() => {
        try {
            const result = await getPeriods();

            const data = result.map(elem => ({
                id: elem.id,
                budget: elem.budget,
                startDate: elem.startDate,
                endDate: elem.endDate,
                dateHeading: `${this.prettifyDate(elem.startDate)} - ${this.prettifyDate(elem.endDate)}`
            }));

            this.setState({data: data});

        } catch (err) {
            console.error(err);
        }
    }

    async componentDidMount() {
        await this.getData();
    }

    render() {
        return (
            <div>
                {this.state.data.map(elem => (
                    <UniversalContainer
                                key={elem.id}
                                heading={<Link className={classes.Link} to={{pathname: '/mainPage', search: `periodId=${elem.id}&endDate=${elem.endDate}&startDate=${elem.startDate}`}}>{elem.dateHeading}</Link>}
                                />
                ))}
            </div>
        );
    }
}

export default Archive;
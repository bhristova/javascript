import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Aux from '../../../hoc/Auxiliary';
import Dropdown from '../Dropdown/Dropdown';
import HoverButton from '../HoverButton/HoverButton';
import Bar from './Bar/Bar';

import classes from './BarChart.css';

class BarChart extends Component {

    getData = () => [{id:'1', value: 10, expected: 20} , {id:'2', value: 20, expected: 10}, {id:'3', value: 45, expected: 30}, {id:'4', value: 5, expected: 20}, {id:'5', value: 20, expected: 20}];

    getColors = () => [
        {actual: '#42253B', actualHover: '#834975', expected: '#4C2C69', expectedHover: '#7C48AD'},
        {actual: '#82D173', actualHover: '#BBE6B2', expected: '#ABFAA9', expectedHover: '#ECFEEC'},
        {actual: '#FCD757', actualHover: '#FDECAF', expected: '#EEFC57', expectedHover: '#F7FDAF'},
        {actual: '#D87CAC', actualHover: '#ECC0D7', expected: '#F47C8E', expectedHover: '#F9B9C3'},
        {actual: '#3066BE', actualHover: '#6C96DA', expected: '#60AFFF', expectedHover: '#C2E0FF'},
        {actual: '#702632', actualHover: '#B63E52', expected: '#912F40', expectedHover: '#C85669'},
        {actual: '#677DB7', actualHover: '#ACB8D8', expected: '#9CA3DB', expectedHover: '#E1E3F4'},
        {actual: '#D5AC4E', actualHover: '#E8D19C', expected: '#EECF6D', expectedHover: '#F8EDC9'},
    ];

    render() {
        return (
            <Aux>
                <div className={classes.BarChart}>
                    {this.getData().map((sector, index) => <Bar sector={sector} index={index} key={index} colors={this.getColors()[index]}></Bar>)}
                </div>
            </Aux>
        );
    }
}

export default BarChart;
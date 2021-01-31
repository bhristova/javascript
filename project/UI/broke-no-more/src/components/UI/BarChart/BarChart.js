import React from 'react';

import Bar from './Bar/Bar';

import classes from './BarChart.css';

const barChart = (props) => {

    const getColorsExpected = () => [
        {expected: '#ED9907', expectedHover: '#F29E08'},
        {expected: '#F29E08', expectedHover: '#F8A312'},
        {expected: '#F8A312', expectedHover: '#F8AB25'},
        {expected: '#F8AB25', expectedHover: '#F9B339'},
        {expected: '#F9B339', expectedHover: '#F9BA4D'},
        {expected: '#F9BA4D', expectedHover: '#F9C262'},
        {expected: '#F9C262', expectedHover: '#FAC975'},
        {expected: '#FAC975', expectedHover: '#FBD189'},
        {expected: '#FBD189', expectedHover: '#FBD99D'},
        {expected: '#FBD99D', expectedHover: '#FCE0B1'}
    ];

    const getColorsActual = () => [
        {actual: '#369674', actualHover: '#3BA580'},
        {actual: '#3BA580', actualHover: '#41B48C'},
        {actual: '#41B48C', actualHover: '#4BBE96'},
        {actual: '#4BBE96', actualHover: '#5AC49F'},
        {actual: '#5AC49F', actualHover: '#69C9A7'},
        {actual: '#69C9A7', actualHover: '#78CEB0'},
        {actual: '#78CEB0', actualHover: '#87D4B9'},
        {actual: '#87D4B9', actualHover: '#96D9C2'},
        {actual: '#96D9C2', actualHover: '#A5DFCA'},
        {actual: '#A5DFCA', actualHover: '#B4E4D3'}
    ];

    return <div className={classes.BarChart}>
                {props.data && props.data.map((sector, index) => <Bar sector={sector} index={index} key={index} colorsExpected={getColorsExpected()[index]} colorsActual={getColorsActual()[index]}></Bar>)}
                <div className={[classes.AmountLabel, classes.Minus].join(' ')}>
                    used: {props.amountLeft.toFixed(2)}
                </div>
                <div className={[classes.AmountLabel, classes.Plus].join(' ')}>
                    left: {props.amountUsed.toFixed(2)}
                </div>
            </div>;
}

export default barChart;
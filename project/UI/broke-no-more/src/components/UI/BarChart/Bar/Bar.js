import React, { Component } from 'react';

import classes from './Bar.css';

class Bar extends Component {

    componentDidMount() {
        this.setState({actualColor: this.props.colorsActual.actual, expectedColor: this.props.colorsExpected.expected})
    }
    state = {
        expectedColor: this.props.colorsExpected.expected,
        actualColor: this.props.colorsActual.actual
    }

    onExpectedHover = (color) => {
        this.setState({expectedColor: color});
    }

    onActualHover = (color) => {
        this.setState({actualColor: color});
    }

    render () {
        return <div 
                    className={classes.ExpectedBar}
                    style={{width: this.props.sector.expectedAmountPercent * 5, backgroundColor: this.state.expectedColor}}
                    onMouseOver={() => this.onExpectedHover(this.props.colorsExpected.expectedHover)} 
                    onMouseOut={() => this.onExpectedHover(this.props.colorsExpected.expected)}   
                    key={`expected-${this.props.sector.categoryId}`}>
                    <div 
                        className={classes.ActualBar}
                        onMouseOver={() => this.onActualHover(this.props.colorsActual.actualHover)} 
                        onMouseOut={() => this.onActualHover(this.props.colorsActual.actual)}  
                        style={{width: this.props.sector.actualAmountPercent * 5, backgroundColor: this.state.actualColor}} 
                        key={this.props.sector.categoryId}>
                        <span className={classes.Tooltip}>Actual: {this.props.sector.actualAmount.toFixed(2)}</span>
                    </div>
                            <span className={classes.Label}>{this.props.sector.categoryName}</span>
                </div>
    }
}

export default Bar;
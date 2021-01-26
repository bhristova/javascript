import React, { Component } from 'react';

import classes from './Bar.css';

class Bar extends Component {

    componentDidMount() {
        this.setState({actualColor: this.props.colors.actual, expectedColor: this.props.colors.expected})
    }
    state = {
        expectedColor: this.props.colors.expected,
        actualColor: this.props.colors.actual
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
                    style={{width: this.props.sector.expected * 5, backgroundColor: this.state.expectedColor}}
                    onMouseOver={() => this.onExpectedHover(this.props.colors.expectedHover)} 
                    onMouseOut={() => this.onExpectedHover(this.props.colors.expected)}   
                    key={`expected-${this.props.sector.id}`}>
                    <div 
                        className={classes.ActualBar}
                        onMouseOver={() => this.onActualHover(this.props.colors.actualHover)} 
                        onMouseOut={() => this.onActualHover(this.props.colors.actual)}  
                        style={{width: this.props.sector.value * 5, backgroundColor: this.state.actualColor}} 
                        key={this.props.sector.id}>
                        <span className={classes.Tooltip}>Actual: {this.props.sector.value}</span>
                    </div>
                </div>
    }
}

export default Bar;
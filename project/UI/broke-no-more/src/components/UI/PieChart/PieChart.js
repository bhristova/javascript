import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Aux from '../../../hoc/Auxiliary';
import Dropdown from '../Dropdown/Dropdown';
import HoverButton from '../HoverButton/HoverButton';

import classes from './PieChart.css';

class PieChart extends Component {

    state = {
        paths: [],
        hovered: false,
        pageX: 100,
        pageY: 200,
        clickedKey: -1,
        pieSectorsCoords: [],
    }

    static defaultProps = {
        colors: ['#042a2b', '#5eb1bf', '#ef7b45', '#d84727', "#0B5563", "#FFD166", "#EF476F", "#06D6A0"],
        size: 250,
        lineWidth: 25
    };

    componentDidMount() {
        this.draw();
    }

    draw() {
        const canvas = ReactDOM.findDOMNode(this);
        const ctx = canvas.lastChild.getContext('2d')
        const rect = canvas.getBoundingClientRect();

        const hwidth = ctx.canvas.width / 2;
        const hheight = ctx.canvas.height / 2;

        let lastEnd = 0;

        const newCoords = [];

        let index = 0;
        let colorIndex = 0;
        const dataTotal = this.props.data.reduce((r, dataPoint) => r + dataPoint.value, 0);
        this.props.data.forEach((dataPoint, i) => {
            const color = this.props.colors[colorIndex++];
            if (colorIndex >= this.props.colors.length) {
                colorIndex = 0;
            }

            const delta = dataPoint.value / dataTotal;

            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(hwidth, hheight);

            ctx.arc(hwidth, hheight, hheight, lastEnd, lastEnd + (Math.PI * 2 * delta), false);

            ctx.lineTo(hwidth, hheight);
            ctx.fill();

            const radds = hheight *20;
            const endAngle2 = lastEnd + (Math.PI * delta);

            const setX = hwidth + Math.cos(endAngle2) * radds;
            const setY = hheight + Math.sin(endAngle2) * radds;

            const xCoord = setX - 250;
            const yCoord = - setY - 25;
            // const xCoord = rect.right - 250 + setX;
            // const yCoord = rect.top + setY;
            const sectorCoords = { id: dataPoint.id, x: xCoord, y: yCoord };

            newCoords.push(sectorCoords);

            if (delta > 0.05) {
                ctx.fillStyle = "black";
                ctx.font = '14px Calibri';
                ctx.fillText(`${dataPoint.value}%`, setX, setY);
            }
            lastEnd += Math.PI * 2 * delta;


            let lineCoordX = setX;
            let lineCoordY = setY;

            let centerX = hwidth;
            let centerY = hheight;

            // if(lineCoordX > hwidth) {
            //     lineCoordX += 300;
            //     centerX += 5;
            // } else if(lineCoordY > hheight) {
            //     lineCoordY += 300;
            //     centerY += 5;
            // }else if(lineCoordX < hwidth){
            //     lineCoordX -=300;
            //     centerX -= 5;
            // } else if(lineCoordY < hheight){
            //     lineCoordY -=300;
            //     centerY -= 5;
            // }

                ctx.strokeStyle = "black";
                ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(lineCoordX, lineCoordY);
            ctx.stroke(); 
        });
        this.setState({ pieSectorsCoords: newCoords });
    };

    hoverButtonHandler = (key) => {
        let newClickedKey = key;
        if (newClickedKey === this.state.clickedKey) {
            newClickedKey = -1;
        }
        this.setState({ clickedKey: newClickedKey });
    }

    onMouseOverHandler = (key) => {
        this.setState({ hoveredButton: key });
    }

    onMouseOut = () => {
        this.setState({ hoveredButton: -1 });
    }

    render() {

        const buttons = [
            { type: 'text', id: 'label1', label: 'alibaliasd sdfh sjhdfgs lsde', handler: () => console.log('clicked button 1') },
            { type: 'button', id: 'button1', label: 'Edit', handler: () => console.log('clicked button 1') },
        ]
        return (
            <Aux>
                <div className={classes.PieChart}>
                    <canvas onMouseMove={this.chartHover} onMouseOut={this.mouseOut}
                        height={this.props.size}
                        width={this.props.size}
                    />
                    {this.state.pieSectorsCoords.map(sector => (
                        <div style={{ left: sector.x, top: sector.y, position: 'relative' }} key={sector.id}>
                            <HoverButton hoverButtonHandler={() => this.hoverButtonHandler(sector.id)}
                                onMouseOverHandler={() => this.onMouseOverHandler(sector.id)}
                                onMouseOut={this.onMouseOut}
                                hoveredButton={this.state.hoveredButton === sector.id
                                }
                            >
                                {this.state.clickedKey === sector.id ? <Dropdown buttons={buttons} /> : null}
                            </HoverButton>
                        </div>
                    ))}

                </div>

            </Aux>
        );
    }
}

export default PieChart;
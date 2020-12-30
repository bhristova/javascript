import React from 'react';

import iconMinus from '../../assets/bnm-icon-minus.png'
import iconPlus from '../../assets/bnm-icon-plus.png'
import classes from './Icons.css';

// const iconMinus = (props) => (
//     // <div className={classes.Logo} style={{height: props.height}}>
//     <div>
//         <img src={iconMinus} alt="Subtract from whole amount"/>
//     </div>
// );

// const iconPlus = (props) => (
//     <div>
//         <img src={iconPlus} alt="Add to whole amount"/>
//     </div>
// );

const icon = (props) => {
    if (props.type === 1) {
        return (<div className={classes.Icons}>
            <img src={iconPlus} alt="Add to whole amount" />
        </div>)
    }
    return (<div className={classes.Icons}>
        <img src={iconMinus} alt="Subtract from whole amount"/>
    </div>);
}

export default icon;
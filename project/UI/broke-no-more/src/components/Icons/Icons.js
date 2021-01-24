import React from 'react';

import iconMinus from '../../assets/bnm-icon-minus.png';
import iconPlus from '../../assets/bnm-icon-plus.png';
import logo from '../../assets/broke-no-more-logo-5.png';
import classes from './Icons.css';
import consts from '../../utils/Consts';

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
    if (consts.icons.plus === props.type) {
        return (<div className={classes.Icons}>
            <img src={iconPlus} alt="Add to whole amount" />
        </div>)
    } else if (consts.icons.minus === props.type) {
    return (<div className={classes.Icons}>
        <img src={iconMinus} alt="Subtract from whole amount"/>
    </div>)
    } else if ( consts.icons.logo === props.type) {
        return (<div className={classes.Logo}>
            <img src={logo} alt="Broke No More"/>
        </div>)
    } else return null;
}

export default icon;
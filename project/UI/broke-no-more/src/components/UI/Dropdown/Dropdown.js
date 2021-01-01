import React from 'react';

import classes from './Dropdown.css';

const dropdown = (props) => {
    
    return <div className={classes.Dropdown}>
        {props.buttons.map(button => {
            if(button.type === 'button') {
                return (<button className={classes.Button} 
                                key={button.id}
                                onClick={button.handler}
                                disabled={button.disabled}>
                                    {button.label}
                        </button>);
            } else { //text
                return <p className={classes.Label} key={button.id}>{button.label}</p>
            }
        }
        )}
    </div>
}

export default dropdown;
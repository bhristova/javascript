import React from 'react';

import AmountControl from './AmountControl/AmountControl';
import Button from '../../UI/Button/Button';
import UniversalContainer from '../../UI/UniversalContainer/UniversalContainer';

import classes from './DayControl.css';

const dayControl = (props) => {
    
    const isToday = (date) => {
        const parsedDate = new Date(date);
        const currentDate = new Date();

        return currentDate.getDate() === parsedDate.getDate()
            && currentDate.getMonth() === parsedDate.getMonth()
            && currentDate.getFullYear() === parsedDate.getFullYear();
    }
    
    const prettifyDate = (date) => {
        if (isToday(date)) {
            return 'Today';
        }

        return new Intl.DateTimeFormat('en', {year: 'numeric', month: 'long', day: '2-digit'}).format(new Date(date));
    }
    

    const date = props.dayData[0].date;
    const logsCount = props.dayData.filter(elem => elem.icon).length;
    return <UniversalContainer heading={prettifyDate(date)}>
            {logsCount ? props.dayData
                .filter(elem => elem.subject)
                .map(elem => (<AmountControl
                    key={elem.id || elem.date}
                    id={elem.id}
                    icon={elem.icon}
                    category={elem.category}
                    subject={elem.subject}
                    amount={elem.amount}
                    isToday={isToday(date)}
                    deleteClicked={() => props.deleteClicked(elem.id, date)}
                    editClicked={(fields) => props.editClicked(elem.id, date, fields)}
                ></AmountControl>)) : null}
            {isToday(date) ? <Button buttonHandler={props.addButtonHandler} label='Add' /> : null}
        </UniversalContainer>
};

export default dayControl;
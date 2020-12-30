import React from 'react';

import DayControl from './DayControl/DayControl'

const dayControls = (props) => {
    const data = [
        [
            { date: '27 December 2020', key: "afkhwsg", icon: 0, subject: "bought apples", amount: 234435.34 },
            { date: '27 December 2020', key: "asddsfa", icon: 1, subject: "found 5 leva", amount: 5 },
            { date: '27 December 2020', key: "adflkel", icon: 0, subject: "bought dog food", amount: 12.99 }
        ],
        [
            { date: '28 December 2020', key: "afkhwsg", icon: 1, subject: "bought apples", amount: 234435.34 },
            { date: '28 December 2020', key: "asddsfa", icon: 1, subject: "found 5 leva", amount: 5 },
            { date: '28 December 2020', key: "adflkel", icon: 0, subject: "bought dog food", amount: 12.99 }
        ],
        [
            { date: '29 December 2020', key: "afkhwsg", icon: 0, subject: "bought apples", amount: 234435.34 },
            { date: '29 December 2020', key: "asddsfa", icon: 1, subject: "found 5 leva", amount: 5 },
            { date: '29 December 2020', key: "adflkel", icon: 0, subject: "bought dog food", amount: 12.99 }
        ],
        [
            { date: '30 December 2020', key: "sdgehrj", icon: 0, subject: "lost 5 leva", amount: 5 },
            { date: '30 December 2020', key: "rtyukyh", icon: 0, subject: "bought flower", amount: 25.22 },
            { date: '30 December 2020', key: "dfgdghj", icon: 0, subject: "charity", amount: 25 },
            { date: '30 December 2020', key: "dsfdfsg", icon: 1, subject: "What else can I say? Today was a good day! Yes, yes, it was! hehe... Went to the bar and had a martini; afterwards decided to go home, but stopped at the market, where I saw Baileys was on sale, so how could I miss such an opportunity?", amount: 68 }
        ]
    ];
    let iter = 0;

    return (
        data.map(elem => <DayControl key={iter++} dayData={elem} addButtonHandler={props.addButtonHandler}/>)
    );
};
export default dayControls;
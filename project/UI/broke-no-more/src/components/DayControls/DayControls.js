import React from 'react';

import DayControl from './DayControl/DayControl'

const dayControls = (props) => {
    const data = [
        [
            { date: '27 December 2020', key: "afkhwsg", icon: 'minus', subject: "bought apples", amount: 234435.34, category: 'food'},
            { date: '27 December 2020', key: "asddsfa", icon: 'plus', subject: "found 5 leva", amount: 5, category: 'etc' },
            { date: '27 December 2020', key: "adflkel", icon: 'minus', subject: "bought dog food", amount: 12.99, category: 'food' }
        ],
        [
            { date: '28 December 2020', key: "afkhwsg", icon: 'plus', subject: "bought apples", amount: 234435.34 , category: 'food'},
            { date: '28 December 2020', key: "asddsfa", icon: 'plus', subject: "found 5 leva", amount: 5, category: 'food' },
            { date: '28 December 2020', key: "adflkel", icon: 'minus', subject: "bought dog food", amount: 12.99, category: 'food' }
        ],
        [
            { date: '29 December 2020', key: "afkhwsg", icon: 'minus', subject: "bought apples", amount: 234435.34, category: 'food' },
            { date: '29 December 2020', key: "asddsfa", icon: 'plus', subject: "found 5 leva", amount: 5, category: 'food' },
            { date: '29 December 2020', key: "adflkel", icon: 'minus', subject: "bought dog food", amount: 12.99, category: 'food' }
        ],
        [
            { date: '30 December 2020', key: "sdgehrj", icon: 'minus', subject: "lost 5 leva", amount: 5, category: 'food' },
            { date: '30 December 2020', key: "rtyukyh", icon: 'minus', subject: "bought flower", amount: 25.22 , category: 'food'},
            { date: '30 December 2020', key: "dfgdghj", icon: 'minus', subject: "charity", amount: 25, category: 'food' },
            { date: '30 December 2020', key: "dsfdfsg", icon: 'plus', subject: "What else can I say? Today was a good day! Yes, yes, it was! hehe... Went to the bar and had a martini; afterwards decided to go home, but stopped at the market, where I saw Baileys was on sale, so how could I miss such an opportunity?", amount: 68 }
        ],
        [
            { date: '31 December 2020', key: "dgfdfsg", icon: 'plus', subject: "Yes, yes, it was! hehe... Went to the bar and had a martini; afterwards decided to go home, but stopped at the market, where I saw Baileys was on sale, so how could I miss such an opportunity?", amount: 68 }
        ],
        [
            { date: '2 January 2021', key: "dgfdfsg", icon: 'plus', subject: "Yes, yes, it was! hehe... Went to the bar and had a martini; afterwards decided to go home, but stopped at the market, where I saw Baileys was on sale, so how could I miss such an opportunity?", amount: 68 }
            ,{ date: '2 January 2021', key: "afkhwsg", icon: 'plus', subject: "bought apples", amount: 234435.34 , category: 'food'},
            { date: '2 January 2021', key: "asddsfa", icon: 'plus', subject: "found 5 leva", amount: 5, category: 'food' },
            { date: '2 January 2021', key: "adflkel", icon: 'minus', subject: "bought dog food", amount: 12.99, category: 'food' }
        ]
    ];
    let iter = 0;

    return (
        data.map(elem => <DayControl key={iter++} dayData={elem} addButtonHandler={props.addButtonHandler}/>)
    );
};
export default dayControls;
import React, { Component } from 'react';

import Aux from '../hoc/Auxiliary';
import DayControls from '../components/DayControls/DayControls';

///I don't really need this component though...
//TODO: make functional
class MainPage extends Component {

    render() {
        const periodId = '19c13295-dfc9-4c0f-aced-914e42efd0ac';
        return (
            <Aux>
                <DayControls periodId={periodId}/>
            </Aux>
        );
    }
}

export default MainPage;
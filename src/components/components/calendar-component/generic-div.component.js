import React from 'react';
import Calendar from './calendar.component';

export default class CalendarDiv extends React.Component {
    constructor(props) {
        super(props);
        this.stateCheck = this.stateCheck.bind(this);
        this.receiveStartDate = this.receiveStartDate.bind(this);
        this.receiveEndDate = this.receiveEndDate.bind(this);

        this.state = {
            disabled: false,
            start_date: '',
            end_date: '',
            my_state: false
        };
    }


    stateCheck = () => {
        let startState = this.state.start_date ? this.state.start_date : 'Start Date Not Set';
        let endState = this.state.end_date ? this.state.end_date : 'End Date Not Set';
        console.log('{Start date in parent state}: ' + startState + '\n' + '\n' + "{End date in parent state}: " + endState);
    }

    receiveStartDate = (startDate) => {
        this.setState({
            start_date: startDate
        });
        return startDate;
    }

    receiveEndDate = (endDate) => {
        this.setState({
            end_date: endDate
        });
        return endDate;
    }

    render() {
        return (
            <div>
                <h2>QA Calendar Component</h2>
                <Calendar
                    start_date_title={'Start Date'}
                    end_date_title={'End Date'}
                    default_end_date={1}
                    receive_start_date={this.receiveStartDate}
                    receive_end_date={this.receiveEndDate}
                /><br />
                <button onClick={this.stateCheck}>Check Date States</button>
            </div>
        );
    };
};

import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import momentBusinessDays from 'moment-business-days';
import MomentLocaleUtils, { formatDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);

        this.state = {
            start_date: '',
            end_date: '',
            start_date_title: this.props.start_date_title,
            end_date_title: this.props.end_date_title,
            default_end_date: this.props.default_end_date,
            send_start_date: this.props.receive_start_date,
            send_end_date: this.props.receive_end_date

        };
    }

    onChangeStartDate = (startDate) => {
        this.setState({
            start_date: startDate,
            end_date: momentBusinessDays(startDate, 'DD-MM-YYYY').businessAdd(this.state.default_end_date ? this.state.default_end_date : 59)._d
        });
        this.state.send_start_date(startDate);
        this.state.send_end_date(momentBusinessDays(startDate, 'DD-MM-YYYY').businessAdd(this.state.default_end_date ? this.state.default_end_date : 59)._d);
    }

    onChangeEndDate = (endDate) => {
        var alertDeterminer;
        this.state.end_date = endDate;

        if (this.state.start_date === '') {
            alertDeterminer = "blankdates";
        }
        else if (moment(this.state.end_date).isBefore(this.state.start_date)) {
            alertDeterminer = 'dateswrongorder';
        }

        switch (alertDeterminer) {
            case "blankdates":
                alert('Please select a start date');
                break;
            case "dateswrongorder":
                alert('The end date must be after the start date');
                break;
            default:

                this.setState({
                    end_date: endDate
                });
                this.state.send_end_date(endDate);
        }
    }

    render() {
        return (
            <div>
                <label>{this.state.start_date_title ? this.state.start_date_title : 'Start Date'}</label>
                <div>
                    <DayPickerInput
                        placeholder="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                        formatDate={formatDate}
                        value={this.state.start_date}
                        onDayChange={this.onChangeStartDate}
                        dayPickerProps={{
                            month: this.state.start_date,
                            selectedDays: this.state.start_date,
                            disabledDays: {
                                daysOfWeek: [0, 6],
                            },
                        }}
                    />
                </div><br />
                <label> {this.state.end_date_title ? this.state.end_date_title : 'End Date'}</label>
                <div >
                    <DayPickerInput
                        placeholder="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                        formatDate={formatDate}
                        value={this.state.end_date}
                        onDayChange={this.onChangeEndDate}
                        dayPickerProps={{
                            month: this.state.end_date,
                            selectedDays: this.state.end_date,
                            disabledDays: {
                                daysOfWeek: [0, 6],
                            },
                        }}
                    />
                </div>
            </div>
        );
    };
};


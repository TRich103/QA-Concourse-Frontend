import React, { Component } from 'react';
import axios from 'axios';
import AccessDenied from './modules/AccessDenied';
import { authService } from './modules/authService';
import '../css/GlobalCss.css';
import "react-datepicker/dist/react-datepicker.css";
import momentBusinessDays from 'moment-business-days';
import moment from 'moment';
import Collapse from 'react-bootstrap/Collapse'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import {
    formatDate,
} from 'react-day-picker/moment';
import { normalize } from 'path';

export default class EditDates extends Component {

    constructor(props) {
        super(props);

        // this.onChangeTraineeFname = this.onChangeTraineeFname.bind(this);
        // this.onChangeTraineeLname = this.onChangeTraineeLname.bind(this);
        // this.onChangeTraineeEmail = this.onChangeTraineeEmail.bind(this);

        this.state = {
            fontsize:"medium",
            theme:"normal",
            user_fname: '',
            user_lname: '',
            user_email: '',
            currentUser: authService.currentUserValue,
            bankHolidays: 'True',
        }
    }

    componentDidMount() {
        axios.get('http://' + process.env.REACT_APP_AWS_IP + ':4000/trainee/' + this.props.match.params.id)
            .then(response => {
                console.log(response);

                this.setState({
                    trainee_fname: response.data.trainee_fname,
                    trainee_lname: response.data.trainee_lname,
                    trainee_email: response.data.trainee_email,
                    trainee_start_date: new Date(response.data.trainee_start_date),
                    trainee_end_date: new Date(response.data.trainee_end_date),
                    trainee_bench_start_date: new Date(response.data.trainee_bench_start_date),
                    trainee_bench_end_date: new Date(response.data.trainee_bench_end_date),
                    trainee_days_worked: response.data.trainee_days_worked,
                    trainee_bursary: response.data.bursary,
                    bursary_amount: response.data.bursary_amount
                })

                if (response.data.bursary === 'True') {
                    console.log(response.data.bursary);
                    this.setState({
                        bursary: "True",
                        open: true
                    })
                }
                else if (response.data.bursary === 'False') {
                    console.log(response.data.bursary);
                    this.setState({
                        bursary: "False",
                        open: false
                    })
                }
                console.log(this.state.trainee_start_date);
                console.log(this.state.trainee_end_date);
                console.log(this.state.trainee_bench_start_date);
                console.log(this.state.trainee_bench_end_date);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTraineeFname(e) {
        this.setState({
            trainee_fname: e.target.value
        });
    }

    onChangeTraineeLname(e) {
        this.setState({
            trainee_lname: e.target.value
        });
    }

    onChangeTraineeEmail(e) {
        this.setState({
            trainee_email: e.target.value
        });
    }

    render() {
        console.log(this.state.bursary)
        const { bursary } = this.state;
        if (this.state.currentUser.token.role === 'admin' || this.state.currentUser.token.role === 'recruiter') {
            this.setState ={
                trainee_fname:"Jeff",
            }
            return (
                <div className="QATable">
                    <form className="edit-form" onSubmit={this.onSubmit}>
                        <div className="all-edit-box">
                        <h2>User Settings</h2>
                            <center><button id="cancelBtn">  <NavLink to="/">Cancel </NavLink>  </button></center>
                            <div className="form-group">
                                <label>Welcome User: </label>
                                <input type="text"
                                    className="form-control"
                                    value= {this.state.trainee_fname + " " + this.state.trainee_lname + " " +  this.state.staff_fname + " " + this.state.staff_lname}
                                    disabled
                                />
                            </div>
                            <select id="dropdown" className="qabtn" value={this.state.value} onChange={this.setFontSize}>
                                <option hidden value="Medium" selected> TextSize</option>
                                <option value="small" > Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                            <br /><br />
                            <select id="dropdown" className="qabtn" value={this.state.value} onChange={this.setTheme}>
                                <option hidden value="Theme" selected> Theme</option>
                                <option value="normal" > Normal</option>
                                <option value="dark"> Dark Mode</option>
                                <option value="colorblind">Color Blind</option>
                            </select>
                            <br /><br />
                            <div className="form-group">
                                <input id="updateBtn" type="submit" value="Update" className="btn btn-primary" /> &nbsp;
                    </div>
                        </div>
                    </form>
                </div>
            )
        }
        else {
            return (
                <AccessDenied />
            );
        }
    }
}
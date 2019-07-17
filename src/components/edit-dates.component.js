import React, { Component } from 'react';
import axios from 'axios';
import AccessDenied from './modules/AccessDenied';
import { authService } from './modules/authService';
import "react-datepicker/dist/react-datepicker.css";
import '../css/add-trainee.css';
import momentBusinessDays from 'moment-business-days';
import moment from 'moment';
import Collapse from 'react-bootstrap/Collapse'

import CreatableSelect from 'react-select/creatable';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import ListTrainee from './list-trainee.component';

import {
    formatDate,
  } from 'react-day-picker/moment';

export default class EditDates extends Component {
    
    constructor(props) {
        super(props);
        
        this.onChangeTraineeFname = this.onChangeTraineeFname.bind(this);
        this.onChangeTraineeLname = this.onChangeTraineeLname.bind(this);
        this.onChangeTraineeEmail = this.onChangeTraineeEmail.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
		this.onChangeBenchStartDate = this.onChangeBenchStartDate.bind(this);
        this.onChangeBenchEndDate = this.onChangeBenchEndDate.bind(this);
		this.onChangeWorkingDays = this.onChangeWorkingDays.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
		this.onSelectGender = this.onSelectGender.bind(this);
        this.onChangeBursaryAmount = this.onChangeBursaryAmount.bind(this);
        this.onClickBursary = this.onClickBursary.bind(this);
		
        this.state = {
            trainee_fname: '',
            trainee_lname: '',
            trainee_email: '',
			trainee_gender: '',
			trainee_uniName:'',
			trainee_phone:'',
			trainee_degree:'',
            trainee_start_date: '',
			intakes:[],
			intake:'',
			trainee_chosenTech:'',
            trainee_end_date: '',
			trainee_intake:'',
			trainee_geo:'',
			trainee_clearance:'',
			trainee_bench_start_date: '',
			trainee_bench_end_date: '',
			trainee_days_worked: '',
            currentUser: authService.currentUserValue,
            bankHolidays: 'True',
        }
    }
	
	//Working day
	onChangeWorkingDays(e) {
		this.setState({
			trainee_days_worked: e.target.value
		})
	}
	
	onChangeBenchStartDate(benchStartDate) {
		this.setState({
			trainee_bench_start_date: benchStartDate,
			trainee_bench_end_date: momentBusinessDays(benchStartDate, 'DD-MM-YYYY').businessAdd(60)._d ,
		})
	}
	
	onChangeBenchEndDate(benchEndDate) {
		this.setState({
			trainee_bench_end_date: benchEndDate
		})	
	}
	
	onSelectGender = (e) =>{
        this.setState({
            trainee_gender: e.target.value
        })
    }

    onChangeStartDate = (startDate) =>{
        this.setState({
            trainee_start_date: startDate,
			trainee_end_date: momentBusinessDays(startDate, 'DD-MM-YYYY').businessAdd(59)._d ,
			trainee_bench_start_date: momentBusinessDays(startDate, 'DD-MM-YYYY').businessAdd(60)._d ,
			trainee_bench_end_date: momentBusinessDays(startDate, 'DD-MM-YYYY').businessAdd(119)._d ,
        })
        console.log(startDate);
        console.log(this.state.trainee_start_date);
    }

     onChangeEndDate = (endDate) =>{
        this.setState({
            trainee_end_date: endDate,
			trainee_bench_start_date: momentBusinessDays(endDate, 'DD-MM-YYYY').businessAdd(1)._d ,
			trainee_bench_end_date: momentBusinessDays(endDate, 'DD-MM-YYYY').businessAdd(60)._d ,
        })
    }

    onClickBursary(e){
        if(this.state.bursary==="False"){
            this.setState({
                bursary: "True",
                bursary_amount: 30,
                open: true
            });
        }
        else{
            this.setState({
                bursary: "False",
                bursary_amount: 0,
                open: false
            });
        }
    }

    onChangeBursaryAmount(e){
        this.setState({
                bursary_amount: e.target.value
        });
    }
	
    componentDidMount() {
        axios.get('http://'+process.env.REACT_APP_AWS_IP+':4000/trainee/'+this.props.id)
            .then(response => {
                console.log(response);
                
                this.setState({
                    trainee_fname: response.data.trainee_fname,
                    trainee_lname: response.data.trainee_lname,
                    trainee_email: response.data.trainee_email,
                    trainee_start_date: new Date (response.data.trainee_start_date),
                    trainee_end_date: new Date (response.data.trainee_end_date),
					trainee_bench_start_date: new Date (response.data.trainee_bench_start_date),
					trainee_bench_end_date: new Date(response.data.trainee_bench_end_date),
                    trainee_days_worked: response.data.trainee_days_worked,
                    trainee_bursary: response.data.bursary,
                    bursary_amount: response.data.bursary_amount,
					trainee_intake: response.data.trainee_intake,
					trainee_gender:response.data.trainee_gender
					
                })

                if(response.data.bursary === 'True'){
                    console.log(response.data.bursary);
                    this.setState({
                        bursary: "True",
                        open: true
                    })
                }
                else if(response.data.bursary === 'False'){
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
	 handleCohort = (newValue) => {
        if(newValue === null){
            this.setState({
                intake: 'empty'
            })
        }else{
            this.setState({
                intake: newValue.value
            }, ()=>{
                console.log('INPUT INTAKE')
                console.log(this.state.intake);  
            });
            this.checkIfIntake();
        }
        console.log(this.state.currentUser);
        console.log(this.state.recruiterName)
    }
	
    checkIfIntake(){
        let intake = this.state.intake;
        let intakes = this.state.intakes;
        //checks to see if intake value exists
        for(var i = 0; i < intakes.length; i++){
            if(intakes[i].value === intake){
                this.setState({
                    addIntake: false
                })
                console.log('set as false');
            }
            else{
                this.setState({
                    addIntake: true
                });
                console.log('set as true');
                break;
            }
        }
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
    
    onSubmit(e) {
	  e.preventDefault();
		if(this.state.trainee_start_date === '' || this.state.trainee_end_date === ''){
            alert('Please select the training start/end dates');
        }
        else if(moment(this.state.trainee_end_date).isBefore(this.state.trainee_start_date)){
            alert('The end date is before the start date, please resolve this before creating the trainee');
        }
		else if(this.state.trainee_bench_start_date === '' || this.state.trainee_bench_end_date === ''){
			alert('Please Enter the trainee bench start/end dates');
		}
		else if (moment(this.state.trainee_bench_end_date).isBefore(this.state.trainee_bench_start_date)){
			alert('The end date is before the start date, please resolve this before finish editing');
		}
		else if(this.state.trainee_days_worked > 31 ){
            alertDeterminer = "HighWorkingDays";
        }
		var alertDeterminer;
		 switch (alertDeterminer){
            case "HighWorkingDays":
                var dateWarning = window.confirm("The Amount of working days to be paid for is higher than the amount of working days within the Month. Are you sure you want to proceed?");
                
				if (dateWarning == false){
                break;
                }
			default:

        const obj = {
            trainee_start_date: this.state.trainee_start_date,
            trainee_end_date: this.state.trainee_end_date,
			trainee_bench_start_date:this.state.trainee_bench_start_date,
            trainee_bench_end_date:this.state.trainee_bench_end_date,
            addedBy: this.state.currentUser.token._id
		}
		const workingDays = {
            trainee_days_worked: this.state.trainee_days_worked,
            addedBy: this.state.currentUser.token._id
        }
        const bursary = {
            trainee_bursary: this.state.bursary,
            trainee_bursary_amount: this.state.bursary_amount,
            addedBy: this.state.currentUser.token._id
        }
		const updated_trainee = {
			trainee_gender:this.state.trainee_gender,
			trainee_intake:this.state.intake
		}
		
        console.log(obj);
        console.log(bursary);
		console.log(updated_trainee);
		axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/trainee/update/'+this.props.id, updated_trainee)
                .then(res => {
					this.props.content(<ListTrainee/>);
				});
        axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/trainee/editDates/'+this.props.id, obj)
            .then(res => {console.log(res.data);
                          this.props.content(<ListTrainee/>);
                         });
		axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/trainee/daysToWork/'+this.props.id, workingDays)
            .then(res => {console.log(res.data);
                          this.props.content(<ListTrainee/>);
						  });
        axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/trainee/editBursary/'+this.props.id, bursary)
                .then(res => {console.log(res.data);
                             this.props.content(<ListTrainee/>);
							 });                 
    }
	
}


    render() {
        console.log(this.state.bursary)
        const {bursary} = this.state;
		if(this.state.currentUser.token.role === 'admin' || this.state.currentUser.token.role === 'recruiter'){
        return (
            <div className="createTrainee">
                <form className="createTraineeForm" onSubmit={this.onSubmit}>
				<h3 className="update-title">Update Trainee</h3>
                    <div className="update-cancel-btn"><center><button type="button" id="cancelBtn" onClick={() => {this.state.form_cancel = true; this.props.content(this.state.back);;}}>Cancel</button></center></div>
                    <div className="grid-container">
					<div className="grid-item-name"> 
                        <label>First Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.trainee_fname}
                                onChange={this.onChangeTraineeFname}
                                disabled
                                />
                    </div>
                     <div className="gird-item"> 
                        <label>Last Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.trainee_lname}
                                onChange={this.onChangeTraineeLname}
                                disabled
                                />
                    </div>           
					<div className="gird-item">
                            <label>Gender: </label>
                            <select value={this.state.trainee_gender} className="form-control" onChange={this.onSelectGender} required>
                                <option selected value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Prefer Not to Say">Prefer not to say</option>
                            </select>
                        </div>
					</div>
					<div className="grid-container">
                    <div className="gird-item-email">
                        <label>Email: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.trainee_email}
                                onChange={this.onChangeTraineeEmail}
                                disabled
                                />
                    </div>
					<div className="grid-item-intake">
						<div className="intake-item-change">
                            <label>Cohort / Intake: </label>
                            <CreatableSelect
                            placeholder="Select or Create a new Intake"
                            onChange={this.handleCohort}
                            options={this.state.intakes}
							/>
							</div>
                        </div>
					</div>
					<div className="grid-container">
                    <div className="gird-item-bursary-title">
                        <label>Bursary: </label>    
                        &nbsp;&nbsp;
                        <input type="checkbox" id="bursaryValue" checked={this.state.open} onClick={this.onClickBursary}/>
                    </div>
                    <Collapse in={this.state.open}>
                    <div className="gird-item-bursary-change">
                        <label>Bursary Amount:</label>
                        <br />
						&nbsp;&nbsp;
                                <input 
									step="0.01"
									min="0"
                                    type="number"
                                    value={this.state.bursary_amount}
                                    onChange={this.onChangeBursaryAmount}
                                    required/>
                    </div>
                    </Collapse>
					</div>
                    <div className="grid-wrapper-dates">                
					<div className="grid-dates" >
                    <label> Training Start Date : </label>
                    <br></br>
                        <DayPickerInput
                            value={this.state.trainee_start_date}
                            format="DD/MM/YYYY"
                            formatDate={formatDate}
                            onDayChange={this.onChangeStartDate}
                            dayPickerProps={{
								month:this.state.trainee_start_date,
                                selectedDays: this.state.trainee_start_date,
                                disabledDays: {
                                daysOfWeek: [0, 6],
                                },
                            }}
                        />
                    </div>
                    <div className="grid-dates" >
                        <label> Training End Date : </label>
                        <br></br>
                            <DayPickerInput
                                value={this.state.trainee_end_date}
                                format="DD/MM/YYYY"
                                formatDate={formatDate}
                                onDayChange={this.onChangeEndDate}
                                dayPickerProps={{
									month:this.state.trainee_end_date,
                                    selectedDays: this.state.trainee_end_date,
                                    disabledDays: {
                                    daysOfWeek: [0, 6],
                                    },
                                }}
                            />
							
                    </div>
					 <div className="grid-dates" >
                        <label> Bench start Date : </label>
                        <br></br>
                            <DayPickerInput
                                placeholder="DD/MM/YYYY"
                                format="DD/MM/YYYY"
                                formatDate={formatDate}
                                value={this.state.trainee_bench_start_date}
                                onDayChange={this.onChangeBenchStartDate}
                                dayPickerProps={{
									month:this.state.trainee_bench_start_date,
                                    selectedDays: this.state.trainee_bench_start_date,
                                    disabledDays: {
                                    daysOfWeek: [0, 6],
                                    },
                                }}
                            />
							
                    </div>
					<div className="grid-dates">
                        <label> Bench End Date : </label>
                        <br></br>
                            <DayPickerInput
                                placeholder="DD/MM/YYYY"
                                format="DD/MM/YYYY"
                                formatDate={formatDate}
                                value={this.state.trainee_bench_end_date}
                                onDayChange={this.onChangeBenchEndDate}
                                dayPickerProps={{
									month:this.state.trainee_bench_end_date,
                                    selectedDays: this.state.trainee_bench_end_date,
                                    disabledDays: {
                                    daysOfWeek: [0, 6],
                                    },
                                }}
                            />
                    </div>
				</div>
				<div>
                    {bursary ?
                        <div className="grid-item-days-working">
                        <label>Amount of working days to be paid this month:</label>
						<br></br>
                        <input 
                                type="number" 
                                className="workingDays"
                                value={this.state.trainee_days_worked}
                                onChange={this.onChangeWorkingDays}
								required/>
                    </div>
                    : ""}
                    <br />
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
        <AccessDenied/>
    );
    }
  }
}
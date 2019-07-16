import React, { Component } from 'react';
import axios from 'axios';
import { CSVLink } from "react-csv";
import AccessDenied from './modules/AccessDenied';
import { authService } from './modules/authService';
import moment from 'moment';
import EditTrainee from './edit-trainee.component.js';
import '../css/trainee-details.css';


export default class TraineeDetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
			id: '',
			trainee_fname: '',
            trainee_lname: '',
            trainee_email: '',
			trainee_bank_name: '', 
            trainee_account_no: '',
			trainee_phone:'',
			trainee_degree:'',
			trainee_uniName:'',
            trainee_sort_code: '',
            trainee_approved: false,
			currentUser: authService.currentUserValue,
            trainee_start_date: '',
            trainee_end_date: '',
            csv: []
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://'+process.env.REACT_APP_AWS_IP+':4000/trainee/'+this.state.currentUser.token._id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    trainee_fname: response.data.trainee_fname,
                    trainee_lname: response.data.trainee_lname,
                    trainee_email: response.data.trainee_email,
                    trainee_start_date: response.data.trainee_start_date,
                    trainee_end_date: response.data.trainee_end_date,
					trainee_uniName:response.data.trainee_uniName,
					trainee_degree:response.data.trainee_degree,
					trainee_phone:response.data.trainee_phone,
                    trainee_bank_name: response.data.trainee_bank_name,
                    trainee_sort_code: response.data.trainee_sort_code,
                    trainee_account_no: response.data.trainee_account_no,
                    trainee_bursary: response.data.bursary,
                    csv: [["Trainee/Payee Name", "Account Number", "Sort Code", "Total Value", "DecimalPlace", "Append", "Data to Copy to Notepad"],[response.data.trainee_fname +" "+ response.data.trainee_lname, response.data.trainee_account_no, response.data.trainee_sort_code, "0.00", "2","000",response.data.trainee_sort_code+','+response.data.trainee_fname+' '+response.data.trainee_lname+','+response.data.trainee_account_no+','+"0"+".00"+','+"BURSARY"+','+"99"]]
                });
                console.log(this.state.trainee_start_date);
                console.log(this.state.trainee_end_date);
                
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
		
    }

render() {
	let _id = this.props._id;

	if(this.state.currentUser.token.role === 'finance') {
        return (
            <div className="details">
                <div className="heading">
				<div className="heading-details">
					<h1>Your Details</h1>
				</div>
				</div>
				<div classname="detailsDiv">
                <table onSubmit={this.onSubmit} className='detailsDiv'>
                    <tbody>
                            <tr>
								<th>First Name</th><td>{this.state.trainee_fname}</td>
								<th>Last Name</th><td>{this.state.trainee_lname}</td>
							</tr>
								<tr><th>Email</th><td>{this.state.trainee_email}</td>
								<th>Mobile Number</th><td>{this.state.trainee_phone}</td>
								</tr>
							<tr>
								<th>University</th><td>{this.state.trainee_uniName}</td>
								<th>Degree</th><td>{this.state.trainee_degree}</td>
							</tr>
							<tr>
								<th>Start Date</th><td>{moment(this.state.trainee_start_date).format('MMMM Do YYYY')}</td>
								<th>End Date</th><td>{moment(this.state.trainee_end_date).format('MMMM Do YYYY')}</td>
							</tr>
							<tr>
								<th>Bank Name</th><td>{this.state.trainee_bank_name}</td>
								
							</tr>
							<tr>
								<th>Account Number</th><td>{this.state.trainee_account_no}</td>
								<th>Sort Code</th><td>{this.state.trainee_sort_code}</td>
							</tr>
				   </tbody>
                </table>
				<div className="profile-upload">
				</div>
				</div>
            </div>
        )
	} else if(this.state.currentUser.token.role === 'trainee'&& this.state.trainee_bursary === "True") {
		return (
		<div className="details">
                <div className="heading">
				<div className="heading-details">
					<h1>Your Details</h1>
				</div>
				</div>
				<div classname="detailsDiv">
                <table onSubmit={this.onSubmit} className='detailsDiv'>
                    <tbody>
                            <tr>
								<th>First Name</th><td className="editable_table" onClick={()=>{this.props.content(<EditTrainee id={this.state.currentUser.token._id}/>)}}>{this.state.trainee_fname}</td>
								<th>Last Name</th><td className="editable_table" onClick={()=>{this.props.content(<EditTrainee id={this.state.currentUser.token._id}/>)}}>{this.state.trainee_lname}</td>
							</tr>
								<tr><th>Email</th><td className="editable_table" onClick={()=>{this.props.content(<EditTrainee id={this.state.currentUser.token._id}/>)}}>{this.state.trainee_email}</td>
								<th>Mobile Number</th><td className="editable_table" onClick={()=>{this.props.content(<EditTrainee id={this.state.currentUser.token._id}/>)}}>{this.state.trainee_phone}</td>
								</tr>
							<tr>
								<th>University</th><td className="editable_table" onClick={()=>{this.props.content(<EditTrainee id={this.state.currentUser.token._id}/>)}}>{this.state.trainee_uniName}</td>
								<th>Degree</th><td className="editable_table" onClick={()=>{this.props.content(<EditTrainee id={this.state.currentUser.token._id}/>)}}>{this.state.trainee_degree}</td>
							</tr>
							<tr>
								<th>Start Date</th><td>{moment(this.state.trainee_start_date).format('MMMM Do YYYY')}</td>
								<th>End Date</th><td>{moment(this.state.trainee_end_date).format('MMMM Do YYYY')}</td>
							</tr>
							<tr>
								<th>Bank Name</th><td className="editable_table" onClick={()=>{this.props.content(<EditTrainee id={this.state.currentUser.token._id}/>)}}>{this.state.trainee_bank_name}</td>
								
							</tr>
							<tr>
								<th>Account Number</th><td className="editable_table" onClick={()=>{this.props.content(<EditTrainee id={this.state.currentUser.token._id}/>)}}>{this.state.trainee_account_no}</td>
								<th>Sort Code</th><td className="editable_table" onClick={()=>{this.props.content(<EditTrainee id={this.state.currentUser.token._id}/>)}}>{this.state.trainee_sort_code}</td>
							</tr>
				   </tbody>
				   <div className="editing-buttons">
                                <button className="actionBtn" onClick={()=>{this.props.content(<EditTrainee id={this.state.currentUser.token._id}/>)}}>Edit</button>
					</div>
                </table>
				<div className="profile-upload">
				</div>
				</div>
            </div>
        );
    }else if(this.state.currentUser.token.role === 'trainee'){
        return(
            <div className="details">
                <div className="heading">
				<div className="heading-details">
					<h1>Your Details</h1>
				</div>
				</div>
				<div classname="detailsDiv">
                <table onSubmit={this.onSubmit} className='detailsDiv'>
                    <tbody>
                            <tr>
								<th>First Name</th><td>{this.state.trainee_fname}</td>
								<th>Last Name</th><td>{this.state.trainee_lname}</td>
							</tr>
								<tr><th>Email</th><td>{this.state.trainee_email}</td>
								<th>Mobile Number</th><td>{this.state.trainee_phone}</td>
								</tr>
							<tr>
								<th>University</th><td>{this.state.trainee_uniName}</td>
								<th>Degree</th><td>{this.state.trainee_degree}</td>
							</tr>
							<tr>
								<th>Start Date</th><td>{moment(this.state.trainee_start_date).format('MMMM Do YYYY')}</td>
								<th>End Date</th><td>{moment(this.state.trainee_end_date).format('MMMM Do YYYY')}</td>
							</tr>
				   </tbody>
				   <div className="editing-buttons">
                                <button className="actionBtn" onClick={()=>{this.props.content(<EditTrainee id={this.state.currentUser.token._id}/>)}}>Edit</button>
					</div>
                </table>
				<div className="profile-upload">
				</div>
				</div>
            </div>
        ); 
	}else{ 
	return(
		< AccessDenied />
	);}
    }
}


import React, { Component } from 'react';
import axios from 'axios';
import AccessDenied from './modules/AccessDenied';
import { authService } from './modules/authService';
import '../css/edit-list-trainee.css';
import ok from './icons/ok.svg';
import close from './icons/close.svg';


export default class EditUserDetails extends Component {
    
    constructor(props) {
        super(props);
        
        this.onChangeStaffFname = this.onChangeStaffFname.bind(this);
        this.onChangeStaffLname = this.onChangeStaffLname.bind(this);
        this.onChangeStaffEmail = this.onChangeStaffEmail.bind(this);
		
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            staff_fname: '',
            staff_lname: '',
            staff_email: '',
            currentUser: authService.currentUserValue,
        }
    }
    
    componentDidMount() {
        axios.get('http://'+process.env.REACT_APP_AWS_IP+':4000/admin/staff/'+this.state.currentUser.token._id)
            .then(response => {
                console.log(response.data);
                    this.setState({
                        staff_fname: response.data.fname,
                        staff_lname: response.data.lname,
                        staff_email: response.data.email,
                    })  
            })
            .catch(function (error) {
                console.log(error);
            })
	}
    
    onChangeStaffFname(e) {
        this.setState({
            staff_fname: e.target.value
        });
    }
    
    onChangeStaffLname(e) {
        this.setState({
            staff_lname: e.target.value
        });
    }

    onChangeStaffEmail(e) {
        this.setState({
            staff_email: e.target.value
        });
    }
   
    onSubmit(e) {
        e.preventDefault();
		const updated_staff = {
            fname: this.state.staff_fname,
            lname: this.state.staff_lname,
            email: this.state.staff_email,
        };
		axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/admin/update-staff/'+this.state.currentUser.token._id, updated_staff)
                .then(res => {
                    console.log(updated_staff);
                    this.props.history.push('/user-profile/'+this.state.currentUser.token._id);
                });
    }

    render() {
		if(this.state.currentUser.token._id === this.state.currentUser.token._id){
            return(
                <div className="QATable">
                <form className="edit-form" onSubmit={this.onSubmit}>
                    <div className="all-edit-box">
					<div className="form-group"> 
                        <label>First Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.staff_fname}
                                onChange={this.onChangeStaffFname}
                                />
                    </div>
                     <div className="form-group"> 
                        <label>Last Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.staff_lname}
                                onChange={this.onChangeStaffLname}
                                />
                    </div>           
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.staff_email}
                                onChange={this.onChangeStaffEmail}
                                />
                    </div>
                    <br />
                    <div className="form-group">
                        <input id="updateBtn" type="submit" value="Update" className="btn btn-primary"/>
						<button id="cancelBtn" onClick={() => { document.location.href = "/user-profile/"+this.state.currentUser.token._id;}}>Back</button>
                    </div>
					</div>
				</form>
            </div>
            );
		}else{
			return(
				<AccessDenied/>
			);
    }
  }
}
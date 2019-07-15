import React, { Component } from 'react';
import axios from 'axios';
import { authService } from './modules/authService';
import { Link } from 'react-router-dom'
import AccessDenied from './modules/AccessDenied';
import Collapse from 'react-bootstrap/Collapse'
import '../css/list-trainee.css';
import add from './icons/person-add.svg';
import history from './icons/history.svg';
import close from './icons/close2.svg';
import filterIcon from './icons/filter.svg';
import mail from './icons/envelope.svg';
import QATable from '../components/components/table-component/qa-table.component';
import List_User from './list-user.component.js';

import CreateUser from './create-user.component';
import UserRecord from './user-history.component';

export default class ListUser extends Component {
    
    constructor(props) {
			//redirects to login if not logged in
	    if (!authService.currentUserValue){
			document.location.href = 'http://'+process.env.REACT_APP_AWS_IP+':3000/login';
			//this.context.history.push('/login');
		}
        super(props);
		
        this.state = {
			users: [], 
			searchString:"",
            currentUser: authService.currentUserValue,
            open: false,
            filter: {
                role: 'All',
                suspended: false
            }
        };
            
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeRoleFilter = this.onChangeRoleFilter.bind(this);
        this.onChangeSuspendedFilter = this.onChangeSuspendedFilter.bind(this);
    }
	
    
    componentDidMount() {
        axios.get('http://'+process.env.REACT_APP_AWS_IP+':4000/admin/')
            .then(response => {
                console.log(response.data);
			if(this.state.currentUser.token.role === 'admin'){
                this.setState({users: response.data});
            }
			})
            .catch(function (error){
                console.log(error);
            })
		}

    onChangeSearch(e) {
        this.setState({
            searchString: e.target.value
        })
    }

    onChangeRoleFilter(e){
        var newVal = e.target.value;
        var newFilter = this.state.filter
        newFilter.role = newVal
        this.setState({
            filter : newFilter
        })
    }

    onChangeSuspendedFilter(e){
        var newVal = !this.state.filter.suspended
        console.log(newVal)
        var newFilter = this.state.filter
        newFilter.suspended = newVal
        this.setState({
            filter : newFilter
        })
    }

    handleHistoryClick(e){
        window.location.href="history/"+e.target.value   
    }

    
    render() {
        let users = this.state.users;
        let search = this.state.searchString.trim().toLowerCase().replace(/\s+/g, '');
        let filter = this.state.filter;
        const {open} = this.state;
		let headers = [{ 'header': 'Name', 'width': 300 },{ 'header': 'Role', 'width': 200 },
			{ 'header': 'Status', 'width': 300 },{ 'header': 'Action', 'width': 800 } ]
		let rows = []

        if(search.length > 0){
            users = users.filter(function(i){
                if(i.email.toLowerCase().match(search) || i.role.toLowerCase().match(search) 
                || i.fname.toLowerCase().match(search) || 
                i.lname.toLowerCase().match(search) ||
                (i.fname.toLowerCase() + i.lname.toLowerCase()).match(search)){
                    return i;
                }
            })
        }

        if(filter.role !== 'All'){
            users = users.filter(function(user){
                if(user.role === filter.role.toLowerCase()){
                    return user;
                }

            })
        }

        if(filter.suspended === false){
            users = users.filter(function(user){
                if(user.status !== 'Suspended'){
                    return user;
                }
            })
        }

        users.map(u => {
			let _id = u._id
			let name= u.fname +' '+ u.lname;
			let deleteToggle = '';
            let deleteRoute = '';  
            let currentStaff;
                if(u.status === "Suspended"){
                   deleteToggle = "Reactivate";
                   deleteRoute = "reactivate";
            }else{
                  deleteToggle = "Suspend";
                  deleteRoute = "delete";
            }if(this.state.currentUser.token._id === u._id){
                currentStaff = true;
            }else{
				 currentStaff = false;
                 }     
		let row = {
                'Name': name,
                'Status': u.status,
				'Role':u.role,
				'Action':
				<div>
				<center>{currentStaff ? <button id="fakeBtn">
                {deleteToggle}
                <img src={close}></img>
                </button> : <button className="actionBtn" onClick={() => {
                if (window.confirm('Are you sure you wish to ' + deleteToggle.toLowerCase() + ' this user?'))
                    axios.get('http://' + process.env.REACT_APP_AWS_IP + ':4000/admin/' + deleteRoute + '/' + u._id).then(() => this.props.content(<List_User/>))
                                        }}>
                                                {deleteToggle}
                                                <img src={close}></img>
                                            </button>}&nbsp;
                                    <button className="actionBtn" value={u._id} onClick={()=>{this.props.content(<UserRecord id={u._id}/>)}}>View History <img src={history}></img></button>&nbsp;
                                    <a href={"mailto:" + u.email}><button className="actionBtn">Email <img src={mail}></img></button> </a>
                                    <button className="actionBtn" onClick={() => { 
                                                    axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/admin/send-email-staff/', {email: u.email})
													.then(() => window.alert("Email Sent!")) } }>
                                                    Resend Activation Email
                                                    <img src={mail}></img>
                                    </button>&nbsp;
                                        </center>
				</div>,
		}
		//Adds data to Rows
			rows.push(row)
		})	
	let tableData = { Headers: headers, Rows: rows }

	   if(this.state.currentUser.token.role !== 'admin'){
		   return (
		   < AccessDenied />
	   );} else{
        return (
            <div className="QAtable">
                <div className="QASearchBar">
                    <input
                        type="text"
                        value={this.state.searchString}
                        onChange={this.onChangeSearch}
                        placeholder="Find User.." 
                    />
                    <button
                    onClick={() => this.setState({ open: !open })}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    className="filter-btn"
                    >
                    Filters
                    <img src={filterIcon}></img>
                    </button>
                    <div id="addUser">
						<Link className="link"> <button className="qabtn" onClick={()=>{this.props.content(<CreateUser/>)}}>Create User<img src={add}></img></button></Link>
                    </div>
                    <Collapse in={this.state.open}>
                    <p>
                        <br></br>
                        <label>Role</label> &nbsp;
                        <select onChange={this.onChangeRoleFilter}>
                            <option value="All">All</option>
                            <option value="Admin">Admin</option>
                            <option value="Recruiter">Recruiter</option>
                            <option value="Finance">Finance</option>
                        </select>&nbsp;&nbsp;
                        <label>Show Suspended</label> &nbsp;
                        <input type="checkbox" value="Suspended" onClick={this.onChangeSuspendedFilter}/> &nbsp;&nbsp;
                    </p>
                    </Collapse>
                </div>
                <div id="resultsTable">
				<QATable id="trainee-table" data={tableData}/>
                </div>
            </div>
        )
	   }
    }
}
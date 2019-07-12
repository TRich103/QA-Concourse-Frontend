import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AccessDenied from './modules/AccessDenied';
import { authService } from './modules/authService';
import Collapse from 'react-bootstrap/Collapse'
import '../css/list-trainee-recruiter.css';
import add from './icons/person-add.svg';
import history from './icons/history.svg';
import close from './icons/close2.svg';
import filterIcon from './icons/filter.svg';
import eye from './icons/eye.svg';
import settings from './icons/settings.svg';
import addmoney from './icons/add.svg';
import mail from './icons/envelope.svg';
//new imports
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import download from './icons/download.svg';

import { Button, ButtonGroup } from 'reactstrap';

export default class ListTrainee extends Component {
    
    constructor(props) {
        super(props);
			
        this.state = {
            trainees: [],
            record: [],
			searchString: "",
            currentUser: authService.currentUserValue,
            staffName: '',
            filter: {
                myTrainees: false,
                status: 'All',
                bursary: 'All',
                suspended: false
            },
            open: false,
			csv: '',
            csvN:'',
            modal: false,
            filterBoolean: false,
			range:{
                from: undefined,
                to: undefined,
            }
        };
        
		this.onChangeFilterSearch = this.onChangeFilterSearch.bind(this)
        this.handleDayClick = this.handleDayClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleDaysClicked = this.handleDaysClicked.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
		
        this.handleHistoryClick = this.handleHistoryClick.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeBursaryFilter = this.onChangeBursaryFilter.bind(this);
        this.onChangeStatusFilter = this.onChangeStatusFilter.bind(this);
        this.onChangeMyTraineeFilter = this.onChangeMyTraineeFilter.bind(this);
        this.onChangeSuspendedFilter = this.onChangeSuspendedFilter.bind(this);
        this.handleExpensesClick = this.handleExpensesClick.bind(this);
    }
    
    componentDidMount() {
        axios.get('http://'+process.env.REACT_APP_AWS_IP+':4000/trainee/')
            .then(response => {
                this.setState({trainees: response.data});
            })
            .catch(function (error){
                console.log(error);
            })

            axios.get('http://' + process.env.REACT_APP_AWS_IP + ':4000/admin/staff/' + this.state.currentUser.token._id)
            .then(response => {
              if(response.data == null){
                authService.logout();
                if (!authService.currentUserValue) {
                  document.location.href = 'http://' + process.env.REACT_APP_AWS_IP + ':3000/login';
                }
              }
              else{
                this.setState({
                  staffName: response.data.fname + " " + response.data.lname
                })
              }
            });
    }

    // Added onChangeSearch(e) function. Needed for the search filter
   onChangeSearch= (e) =>{
            this.setState({
                searchString: e.target.value,
                selectedDate: e
            });
    }
	toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    onChangeMyTraineeFilter(e){
        var newVal = !this.state.filter.myTrainees
        console.log(newVal)
        var newFilter = this.state.filter
        newFilter.myTrainees = newVal
        this.setState({
            filter : newFilter
        })
    }
	
	handleDayClick(day, { selected }) {
        const { selectedDays } = this.state;
        const { splitDays } = this.state;
        if (selected) {
          const selectedIndex = selectedDays.findIndex(selectedDay =>
            DateUtils.isSameDay(selectedDay, day)
          );
        selectedDays.splice(selectedIndex, 1);
        splitDays.splice(selectedIndex, 1);
        } else {
          selectedDays.push(day);
           splitDays.push(day.toString().split(" ", 4).toString());
        }
        this.setState({ selectedDays });
      }

      handleDaysClicked(day) {
        const range = DateUtils.addDayToRange(day, this.state.range);
        console.log(range);
        this.setState({
            range: range});
        console.log(this.state.range);
      }
	  
	  handleResetClick() {
        this.setState({
            range: {
                from: undefined,
                to: undefined
            }
        });
      }
	  
	  onChangeFilterSearch(e) {
        this.setState({
            searchString: e.target.value
        });
    }
	  
      onChangeMyTraineeFilter(e){
        var newVal = !this.state.filter.myTrainees
        console.log(newVal)
        var newFilter = this.state.filter
        newFilter.myTrainees = newVal
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

    onChangeStatusFilter(e){
        var newVal = e.target.value;
        var newFilter = this.state.filter
        newFilter.status = newVal
        this.setState({
            filter : newFilter
        })
    }

    onChangeBursaryFilter(e){
        var newVal = e.target.value;
        var newFilter = this.state.filter
        newFilter.bursary = newVal
        this.setState({
            filter : newFilter
        })
    }

    handleHistoryClick(e){
        window.location.href="history/"+e.target.value   
    }

    handleExpensesClick(e){
        window.location.href="expenses/"+e.target.value
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
	
    render() {
        let splitDays = this.state.splitDays;
        let output = this.state.csv;
        let out = this.state.csvN;
        let role = this.state.currentUser.token.role;
        let range = this.state.range;
        const { from, to } = this.state.range;
        const modifiers = { start: from, end: to };
        //Declared variables in order to read input from search function
        let trainees = this.state.trainees;
        let search = this.state.searchString.trim().toLowerCase().replace(/\s+/g, '');
        let filter = this.state.filter;
        let staffName = this.state.staffName;
        const {open} = this.state;
        
        if(search.length > 0){
            trainees = trainees.filter(function(i){
                if(i.trainee_fname.toLowerCase().match(search) ||
                   i.trainee_lname.toLowerCase().match(search) ||
                   i.status.toLowerCase().match(search)        ||
                   i.added_By.toLowerCase().match(search)      ||
                   i.bursary.toLowerCase().match(search)       ||
                   i.trainee_email.toLowerCase().match(search) ||
                   (i.trainee_fname.toLowerCase() + i.trainee_lname.toLowerCase() + i.trainee_email.toLowerCase()).match(search)){
                    return i;
                }
            })
        }
        if(filter.status != 'All'){
            trainees = trainees.filter(function(trainee){
                if(trainee.status == filter.status){
                    return trainee;
                }

            })
        }

        if(filter.bursary != 'All'){
            trainees = trainees.filter(function(trainee){
                if(trainee.bursary == filter.bursary){
                    return trainee;
                }

            })
        }

        if(filter.myTrainees === true){
            trainees = trainees.filter(function(trainee){
                if(trainee.added_By === staffName){
                    return trainee;
                }
            })
        }

        if(filter.suspended === false){
            trainees = trainees.filter(function(trainee){
                if(trainee.status !== 'Suspended'){
                    return trainee;
                }
            })
        }
		if(from != undefined){
            if(to == undefined){
                trainees = trainees.filter(function(trainee){
                    let start = new Date(Date.parse(trainee.trainee_start_date));
                    if(DateUtils.isSameDay(start, from)){
                         return trainee;
                    }
                })
            }
            else if(to!= undefined){
                trainees = trainees.filter(function(trainee){
                    let start = new Date(Date.parse(trainee.trainee_start_date));
                    if(DateUtils.isDayInRange(start, range)){
                         return trainee;
                    }
                })
            }
        }
		
		if(role === 'finance'){
            output = [["Trainee/Payee Name", "Account Number", "Sort Code", "Total Value", "Decimal Place", "Append", "Data to Copy to Clipboard"]];
            out = [];
            
            trainees.map( t => {
                let totalexpenses = 0;
                t.monthly_expenses.map(expense => {
                    totalexpenses = +totalexpenses + +Number(expense.amount).toFixed(2);
                })
                var obj = [t.trainee_fname+' '+t.trainee_lname, t.trainee_account_no, t.trainee_sort_code,Number(t.bursary_amount*t.trainee_days_worked + totalexpenses).toFixed(2),"2","00","\""+"\""+t.trainee_sort_code+"\""+"\""+','+"\""+"\""+t.trainee_fname+' '+t.trainee_lname+"\""+"\""+','+"\""+"\""+t.trainee_account_no+"\""+"\""+','+"\""+"\""+Number(t.bursary_amount*t.trainee_days_worked + totalexpenses).toFixed(2)+"\""+"\""+','+"\""+"\""+"BURSARY"+"\""+"\""+','+"\""+"\""+"99"+"\""+"\""];
                var old = [t.trainee_sort_code,t.trainee_fname+' '+t.trainee_lname,t.trainee_account_no,Number(t.bursary_amount*t.trainee_days_worked + totalexpenses).toFixed(2),"BURSARY","99"];
                if(t.status === 'Active'){
                    output.push(obj);
                    out.push(old);
                }
                }
            )
        }else if(role === 'admin'){
            output = [["First Name", "Last Name", "Bursary", "Days Worked", "Bursary Amount", "Expenses total for month","Total payment for month", "Start-Date", "End-Date", "Bench start", "Bench end"]];
            trainees.map( t => {
                    let totalexpenses = 0;
                    t.monthly_expenses.map(expense => {
                        totalexpenses = +totalexpenses + +Number(expense.amount).toFixed(2);
                    })
                    var obj = [t.trainee_fname, t.trainee_lname, t.bursary, t.trainee_days_worked,t.bursary_amount, t.monthly_expenses.length, Number((t.bursary_amount*t.trainee_days_worked)+totalexpenses).toFixed(2), moment(t.trainee_start_date).format('MMMM Do YYYY'), moment(t.trainee_end_date).format('MMMM Do YYYY'), moment(t.trainee_bench_start_date).format('MMMM Do YYYY'), moment(t.trainee_bench_end_date).format('MMMM Do YYYY')];
                    output.push(obj);
                }
            )
        }
		
        
        console.log(search.length);
        if(search.length > 0){
            if(role === 'finance'){
                 output = [["First Name", "Last Name", "Email", "Bank Name", "Account Number", "Sort Number","Start-Date", "End-Date"]];
            }
            else if(role === 'admin'){
                 output = [["First Name", "Last Name", "Email", "Start-Date", "End-Date"]];
            }
            console.log(search);
            trainees = trainees.filter(function(i){
                if(i.trainee_fname.toLowerCase().match(search) ||
                   i.trainee_lname.toLowerCase().match(search) ||
                   i.status.toLowerCase().match(search)        ||
                   i.added_By.toLowerCase().match(search)      ||
                   i.bursary.toLowerCase().match(search)       ||
                   i.trainee_email.toLowerCase().match(search) ||
                   (i.trainee_fname.toLowerCase() + i.trainee_lname.toLowerCase() + i.trainee_email.toLowerCase()).match(search)){
                    return i;
                }
            })
        }

		if (this.state.currentUser.token.role === undefined){
			return (
			<AccessDenied/>
			)
		}
		else if(this.state.currentUser.token.role === 'recruiter'){
			return (
            <div className="QAtable">
                <div className="QASearchBar">
                    <input
                        type="text"
                        value={this.state.searchString}
                        onChange={this.onChangeSearch}
                        placeholder="Find trainee..."
                    />
                    <div id="addUser">
                        <button className="qabtn"><Link className="link" to={"/create"}>Add Trainee</Link></button>            
                    </div>
                </div>

                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>               
                    <tbody>
                        {trainees.map(t => {
                            return (
                                <tr>
                                    <td> {t.trainee_fname}</td>
                                    <td> {t.trainee_lname}</td>
                                    <td> {t.trainee_email}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        );
			
        }
        else if(this.state.currentUser.token.role === 'admin'){
            return (
                <div className="QAtable">
                    <div className="QASearchBar">
                        <input
                            type="text"
                            value={this.state.searchString}
                            onChange={this.onChangeSearch}
                            placeholder="Find trainee..."
                            //search icon
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
					<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} className="dateModal">
                        <ModalHeader toggle={this.toggle} cssModule={{'modal-title':'w-100 text-center'}}>Select Start Dates</ModalHeader>
                        <ModalBody cssModule={{'modal-body':'w-100 text-center'}}>
                        <div className = "mod-body">
                        <DayPicker
                            className="Selectable"
                            numberOfMonths={this.props.numberOfMonths}
                            selectedDays={[from, { from, to }]}
                            modifiers={modifiers}
                            onDayClick={this.handleDaysClicked}
                        />
                        <p>
                            {from &&
                                to && (
                                <button className="resetBtn" onClick={this.handleResetClick}>
                                    Reset
                                </button>
                                )}
                        </p>
                        </div>
                        </ModalBody>
                    </Modal>
                    <div id="addUser">
                       <Link className="link" to={"/create"}> <button className="qabtn">Add Trainee <img src={add}></img></button></Link>
                       <Link className="link" to={"/trainee-settings"}><button className="qabtn">Settings <img src={settings}></img></button></Link>
					   <CSVLink className="link" data={output} filename={"Admin_report_" + moment().format('MMMM YYYY') + ".csv"}><button className="qabtn">Download CSV <img src={download}></img></button></CSVLink>					   
                    </div>
                    <Collapse in={this.state.open}>
                    <p>
                        <br></br>
                        <label>My Trainees</label> &nbsp;
                        <input type="checkbox" value="MyTrainees" onClick={this.onChangeMyTraineeFilter}/> &nbsp;&nbsp;
                        <label>Status</label> &nbsp;
                        <select onChange={this.onChangeStatusFilter}>
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Incomplete">Incomplete</option>
                            <option value="Active">Active</option>
                        </select>&nbsp;&nbsp;
                        <label>Bursary</label> &nbsp;
                        <select onChange={this.onChangeBursaryFilter}>
                            <option>All</option>
                            <option value="True">True</option>
                            <option value="False">False</option>
                        </select>&nbsp;&nbsp;
                        <label>Show Suspended</label> &nbsp;
                        <input type="checkbox" value="Suspended" onClick={this.onChangeSuspendedFilter}/> &nbsp;&nbsp;
						<button className="resetBtn" onClick={this.toggle}>Select Start Dates</button> &nbsp;&nbsp;
                    </p>
                    </Collapse>
                    </div>
                    <div id="resultsTable">
                    <table className="table table-hover" style={{ marginTop: 20 }} >
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th><center>Status</center></th>
                                <th>Recruited By</th>
								<th>Cohort</th>
                                <th><center>Bursary</center></th>
                                <th><center>Payment This Month</center></th>
								<th><center>Start Date</center></th>
                                <th><center>Action</center></th>
                            </tr>
                        </thead>               
                        <tbody>
                            {trainees.map(t => {
                                let deleteToggle = '';
                                let deleteRoute = '';
                                let expenses = 0;
                                t.monthly_expenses.map(expense =>{
                                    expenses += +Number(expense.amount).toFixed(2);
                                })
                                if(t.status === "Suspended"){
                                    deleteToggle = "Reactivate";
                                    deleteRoute = "reactivate";
                                }
                                else{
                                    deleteToggle = "Suspend";
                                    deleteRoute = "delete";
                                }
                                return (
                                    <tr className="trainees">
                                        <td onClick={() => window.location.href = "/editDates/" + t._id}> {t.trainee_fname}</td>
                                        <td onClick={() => window.location.href = "/editDates/" + t._id}> {t.trainee_lname}</td>
                                        <td onClick={() => window.location.href = "/editDates/" + t._id}> <center>{t.status}</center></td>
                                        <td onClick={() => window.location.href = "/editDates/" + t._id}> {t.added_By}</td>
										<td onClick={() => window.location.href = "/editDates/" + t._id}> {t.trainee_intake}</td>
                                        <td onClick={() => window.location.href = "/editDates/" + t._id}> <center>{t.bursary}</center></td>
                                        <td onClick={() => window.location.href = "/editDates/" + t._id}> <center>£{Number(t.bursary_amount * t.trainee_days_worked + expenses).toFixed(2)}</center></td>
										<td> <center>{moment(t.trainee_start_date).format('MMMM Do YYYY')}</center></td>
                                            <td>
                                            <center><button className="actionBtn" onClick={() => { 
                                                                if (window.confirm('Are you sure you wish to '+deleteToggle.toLowerCase()+' this trainee?'))
                                                                axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/trainee/'+deleteRoute+'/'+t._id, {addedBy:this.state.currentUser.token._id}).then(() => window.location.reload()) } }>
                                                                {deleteToggle}
                                                                <img src={close}></img>
                                                </button>&nbsp;
                                                <button className="actionBtn" value={t._id} onClick={this.handleHistoryClick}>View History <img src={history}></img></button>&nbsp;
                                                <button className="actionBtn" value={t._id} onClick={this.handleExpensesClick}> Expenses <img src={addmoney}></img></button>&nbsp;
                                                <a href={"mailto:"+t.trainee_email}><button className="actionBtn">Email <img src={mail}></img></button> </a>
                                                <button className="actionBtn" onClick={() => { 
                                                                axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/trainee/send-email/', {trainee_email: t.trainee_email}).then(() => window.alert("Email Sent!")) } }>
                                                                Resend Activation Email 
                                                                <img src={mail}></img>
                                                </button>&nbsp;
                                                </center>
                                           </td>
                                        </tr>
                                );
                            })}
                        </tbody>
    
                    </table>
                    </div>
                </div>
            );
        }
        else{
        return (
            <div className="QAtable">
                <div className="QASearchBar">
                    <input
                        type="text"
                        value={this.state.searchString}
                        onChange={this.onChangeSearch}
                        placeholder="Find trainee..."
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
					<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} className="dateModal">
                            <ModalHeader toggle={this.toggle} cssModule={{'modal-title':'w-100 text-center'}}>Select Start Dates</ModalHeader>
                            <ModalBody cssModule={{'modal-body':'w-100 text-center'}}>
                            <p>
                            {from &&
                                to && (
                                <button className="resetBtn" onClick={this.handleResetClick}>
                                    Reset
                                </button>
                                )}
                            </p>
                            <DayPicker
                                className="Selectable"
                                numberOfMonths={this.props.numberOfMonths}
                                selectedDays={[from, { from, to }]}
                                modifiers={modifiers}
                                onDayClick={this.handleDaysClicked}
                            />
                                {/* <DayPicker
                                    selectedDays={this.state.selectedDays}
                                    onDayClick={this.handleDayClick}
                                /> */}
                            </ModalBody>
                        </Modal>
						<div id="addUser">
                            <CSVLink className="link" data={output} filename={"Finance_report_template_" + moment().format('MMMM YYYY') + ".csv"}><button className="qabtn">CSV template<img src={download}></img></button></CSVLink>
                            <CSVLink className="link" data={out} filename={"Finance_report_" + moment().format('MMMM YYYY') + ".csv"}><button className="qabtn">Download CSV<img src={download}></img></button></CSVLink>
                        </div>
                    <Collapse in={this.state.open}>
                    <p>
                        <br></br>
                        <label>Status</label> &nbsp;
                        <select onChange={this.onChangeStatusFilter}>
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Incomplete">Incomplete</option>
                            <option value="Active">Active</option>
                        </select>&nbsp;&nbsp;
                        <label>Bursary</label> &nbsp;
                        <select onChange={this.onChangeBursaryFilter}>
                            <option>All</option>
                            <option value="True">True</option>
                            <option value="False">False</option>
                        </select>&nbsp;&nbsp;
						<button className="resetBtn" onClick={this.toggle}>Select Start Dates</button> &nbsp;&nbsp;
                    </p>
                    </Collapse>
                </div>
                <div id="resultsTable">
                <table className="table table-hover" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th><center>Status</center></th>
                            <th><center>Bursary</center></th>
							<th><center>Start Date</center></th>
                            <th><center>Payment This Month</center></th>
                            <th><center>Action</center></th>
                        </tr>
                    </thead>               
                    <tbody>
                        {trainees.map(t => {
                            let expenses = 0;
                            t.monthly_expenses.map(expense => {
                                expenses += +Number(expense.amount).toFixed(2);
                            })
							if(this.state.currentUser.token.role === 'finance'){
                                if(t.status != "Suspended"){
                                    return (
                                        <tr className="trainees">
                                            <td onClick={() => window.location.href = "/trainee-details/" + t._id}> {t.trainee_fname}</td>
                                            <td onClick={() => window.location.href = "/trainee-details/" + t._id}> {t.trainee_lname}</td>
                                            <td onClick={() => window.location.href = "/trainee-details/" + t._id}> <center>{t.status}</center></td>
                                            <td onClick={() => window.location.href = "/trainee-details/" + t._id}> <center>{t.bursary}</center></td>
											<td onClick={() => window.location.href = "/trainee-details/" + t._id}> <center>{moment(t.trainee_start_date).format('MMMM Do YYYY')}</center></td>
                                            <td onClick={() => window.location.href = "/trainee-details/" + t._id}> <center>£{Number(t.bursary_amount * t.trainee_days_worked + expenses).toFixed(2)}</center></td>
                                            <td> 
                                                <center>
                                                <button className="actionBtn" onClick={() => window.location.href = "/trainee-details/" + t._id}> View Details <img src={eye}></img></button>&nbsp;
                                                <a href={"mailto:"+t.trainee_email}><button className="actionBtn">Email <img src={mail}></img></button> </a>
                                                </center>
                                            </td>
                                        </tr>
                                    );
                                }
							}
                        })}
                    </tbody>

                </table>
                </div>
            </div>
        );
		}
	}
}
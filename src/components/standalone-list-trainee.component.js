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
import QATable from '../components/components/table-component/qa-table.component';
//new imports
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import download from './icons/download.svg';

import CreateTrainee from "./create-trainee.component";
import TraineeSettings from "./TraineeSettings.component";
import EditDates from "./edit-dates.component";
import EditTrainee from "./edit-trainee.component";
import UserExpense from "./expenses-trainee.component"
import { Button, ButtonGroup } from 'reactstrap';
import History from './user-history.component.js';
import UserRecord from './user-history.component';
import TraineeDetails from './trainee-details.component';

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
            searchString: "",
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
                this.setState({
					trainees: response.data,
					});
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
        this.props.content(<History/>)
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
		let headers = [{ 'header': 'Cohort', 'width': 90 }, { 'header': 'Name', 'width': 100 },
            { 'header': 'Recruited By', 'width': 100 }, { 'header': 'Payment This Month', 'width': 150 },
			{ 'header': 'Training Start Date', 'width': 150 }, { 'header': 'Training End Date', 'width': 150 },
			{ 'header': 'Bench Start Date', 'width': 150 },{ 'header': 'Bench End Date', 'width': 150 }, { 'header': 'Action', 'width': 700 } ]
		let rows = []
		let trainees = this.state.trainees;
        //Declared variables in order to read input from search function
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
        if(filter.status !== 'All'){
            trainees = trainees.filter(function(trainee){
                if(trainee.status == filter.status){
                    return trainee;
                }

            })
        }

        if(filter.bursary !== 'All'){
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
		
        if(search.length > 0){
            if(role === 'finance'){
                 output = [["First Name", "Last Name", "Email", "Bank Name", "Account Number", "Sort Number","Start-Date", "End-Date"]];
            }
            else if(role === 'admin'){
                 output = [["First Name", "Last Name", "Email", "Start-Date", "End-Date"]];
            }
            console.log(search);
            console.log(this.state.splitDays);
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

        trainees.map( t => {
            if(moment(t.trainee_bench_start_date).isAfter(moment().format('MMMM YYYY'))){
                                if(t.status !== "Suspended"){
                                    t.status = "Training";
                                }
                            }
                            else{
								if(t.status !== "Suspended"){
									t.status = "Bench";
							}
                            }
                let _id = t._id
                let name= t.trainee_fname + t.trainee_lname
                let expenses = 0;
                let deleteToggle = '';
                let deleteRoute = '';
              t.monthly_expenses.map(expense =>{
                      expenses += +Number(expense.amount).toFixed(2);
                    })
                    if(t.status === "Suspended"){
                        deleteToggle = "Reactivate";
                        deleteRoute = "reactivate";
                    }else{
                          deleteToggle = "Suspend";
                          deleteRoute = "delete";
                    }
                    if(this.state.currentUser.token.role === 'admin'){	
                let row = {
                    'Cohort':<p className="editable_table" onClick={() => this.props.content(<EditDates id={t._id}/>)}>{t.trainee_intake}</p>,
                    'Name': <p className="editable_table" onClick={() => this.props.content(<EditDates id={t._id}/>)}>{t.trainee_fname +' '+ t.trainee_lname}</p>,
                    'Recruited By': <p className="editable_table" onClick={() => this.props.content(<EditDates id={t._id}/>)}>{t.added_By}</p>,
                    'Payment This Month':<p className="editable_table" onClick={() => this.props.content(<EditDates id={t._id}/>)}>{'£'+Number(t.bursary_amount * t.trainee_days_worked ).toFixed(2)}</p>,
                    'Training Start Date':<p className="editable_table" onClick={() => this.props.content(<EditDates id={t._id}/>)}>{moment(t.trainee_start_date).format('MMMM DD YYYY')}</p>,
                    'Training End Date':<p className="editable_table" onClick={() => this.props.content(<EditDates id={t._id}/>)}>{moment(t.trainee_end_date).format('MMMM DD YYYY')}</p>,
                    'Bench Start Date':<p className="editable_table" onClick={() => this.props.content(<EditDates id={t._id}/>)}>{moment(t.trainee_bench_start_date).format('MMMM DD YYYY')}</p>,
                    'Bench End Date':<p className="editable_table" onClick={() => this.props.content(<EditDates id={t._id}/>)}>{moment(t.trainee_bench_end_date).format('MMMM DD YYYY')}</p>,
                    
                    'Action':			
                    <div>
					<button className="actionBtn" onClick={() => { 
                     if (window.confirm('Are you sure you wish to '+deleteToggle.toLowerCase()+' this trainee?'))
                      axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/trainee/'+deleteRoute+'/'+t._id, {addedBy:this.state.currentUser.token._id}).then(() => window.location.reload()) } }>
                      {deleteToggle} <img src={close}></img></button>&nbsp;
                    <button className="actionBtn" value={t._id} onClick={()=>{this.props.content(<UserRecord id={t._id}/>)}}>View History <img src={history}></img></button>&nbsp;
                    <button className="actionBtn" value={t._id} onClick={()=>{this.props.content(<UserExpense id={t._id}/>)}}>Expenses<img src={addmoney}></img></button> &nbsp; 
                     <a href={"mailto:"+t.trainee_email}><button className="actionBtn">Email <img src={mail}></img></button> </a>
                     <button className="actionBtn" onClick={() => { 
                           axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/trainee/send-email/', {trainee_email: t.trainee_email}).then(() => window.alert("Email Sent!")) } }>
                           Resend Activation Email <img src={mail}></img>
                     </button>&nbsp;
                    </div>,
                }	
                //Adds data to Rows
                rows.push(row)				
            }else {
                let row = {
                    'Cohort':<p className="editable_table" onClick={() => this.props.content(<TraineeDetails id={t._id}/>)}>{ t.trainee_intake}</p>,
					'Name':<p className="editable_table" onClick={() => this.props.content(<TraineeDetails id={t._id}/>)}>{t.trainee_fname +' '+ t.trainee_lname}</p>,
                    'Status': <p className="editable_table" onClick={() => this.props.content(<TraineeDetails id={t._id}/>)}>{t.status}</p>,
                    'Recruited By': <p className="editable_table" onClick={() => this.props.content(<TraineeDetails id={t._id}/>)}>{t.added_By}</p>,
                    'Bursary': <p className="editable_table" onClick={() => this.props.content(<TraineeDetails id={t._id}/>)}>{t.bursary}</p>,
                    'Payment This Month':<p className="editable_table" onClick={() => this.props.content(<TraineeDetails id={t._id}/>)}>{'£'+Number(t.bursary_amount * t.trainee_days_worked ).toFixed(2)}</p>,
                    'Training Start Date':<p className="editable_table" onClick={() => this.props.content(<TraineeDetails id={t._id}/>)}>{moment(t.trainee_start_date).format('MMMM DD YYYY')}</p>,
                    'Training End Date':<p className="editable_table" onClick={() => this.props.content(<TraineeDetails id={t._id}/>)}>{moment(t.trainee_end_date).format('MMMM DD YYYY')}</p>,
                    'Bench Start Date':<p className="editable_table" onClick={() => this.props.content(<TraineeDetails id={t._id}/>)}>{moment(t.trainee_bench_start_date).format('MMMM DD YYYY')}</p>,
                    'Bench End Date':<p className="editable_table" onClick={() => this.props.content(<TraineeDetails id={t._id}/>)}>{moment(t.trainee_bench_end_date).format('MMMM DD YYYY')}</p>,
                    
                    'Action':			
                    <div>
                    <button className="actionBtn" onClick={() => this.props.content(<TraineeDetails id={t._id}/>)}> View Details <img src={eye}></img></button>&nbsp;
                    <a href={"mailto:"+t.trainee_email}><button className="actionBtn">Email <img src={mail}></img></button> </a>
                    </div>,
                }
                //Adds data to Rows
                rows.push(row)	
            }
                
            })
            let tableData = { Headers: headers, Rows: rows }

		if (this.state.currentUser.token.role === undefined){
			return (
			<AccessDenied/>
			)
		}
        else if(this.state.currentUser.token.role === 'admin'){
            return (
                <div>
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
						<Link className="link"> <button className="qabtn" onClick={()=>{this.props.content(<CreateTrainee/>)}}>Create Trainee<img src={add}></img></button></Link>
                       	<Link className="link"> <button className="qabtn" onClick={()=>{this.props.content(<TraineeSettings/>)}}>Settings<img src={settings}></img></button></Link>
					   <CSVLink className="link" data={output} filename={"Admin_report_" + moment().format('MMMM YYYY') + ".csv"}><button className="qabtn">Download CSV <img src={download}></img></button></CSVLink>					   
                    </div>
                    <Collapse in={this.state.open}>
                    <div className="filter_collapse">
                        <label>My Trainees</label> &nbsp;
                        <input type="checkbox" value="MyTrainees" onClick={this.onChangeMyTraineeFilter}/> &nbsp;&nbsp;
                        <label>Status</label> &nbsp;
                        <select onChange={this.onChangeStatusFilter}>
                            <option value="All">All</option>
							<option value="Training">Training</option>
							<option value="Bench">Bench</option>
                            <option value="Incomplete">Incomplete</option>
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
                    </div>
                    </Collapse>
                    </div>
                    <div id="resultsTable">
						<QATable id="trainee-table" data={tableData}/>
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
				<QATable id="trainee-table" data={tableData}/>

                </div>
            </div>
        );
		}
	}
}
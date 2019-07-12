import React, { Component } from 'react';
import axios from 'axios';
import '../css/history.css';
import { authService } from './modules/authService';
import AccessDenied from './modules/AccessDenied';
import moment from 'moment';
import QAGenericTable from './components/table-component/qa-table.component';
import SearchBar from './components/search-bar-component/searchBar.component';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import DayPicker, { DateUtils } from 'react-day-picker';

export default class UserRecord extends Component {
    
    constructor(props) {
        super(props);
			
        this.state = {
            userType: '',
            recordOf: '',
            record: [],
            currentUser: {token: {role: "admin", status: "Active", _id: "5d0bb39bd2ba63099c621593"}},
            searchResults: [],
            modal: false,
            range:{
                from: undefined,
                to: undefined,
            }
            };
            this.toggle = this.toggle.bind(this);
            this.handleDaysClicked = this.handleDaysClicked.bind(this);
            this.handleResetClick = this.handleResetClick.bind(this);
    }

    search = event => {
        if(event.length > 0){
            let searchResults = [];
            this.state.record.map(record => {
                let searchValues = Object.values(record);
                    if(searchValues.join('').toLowerCase().match(event.replace(/ /g,'').toLowerCase())){
                        searchResults.push(record);            
                     }                
            })
            this.setState({ searchResults : searchResults });
            console.log(searchResults);
        }
        else{
            
            this.setState({searchResults: this.state.record})
        }
    };

    handleDaysClicked(day) {
        console.log(typeof day);
        const range = DateUtils.addDayToRange(day, this.state.range);
        this.setState({
            range: range});
        console.log(range);
      }

      handleResetClick() {
        this.setState({
            range: {
                from: undefined,
                to: undefined
            }
        });
      }
    componentDidMount() {
        axios.get('https://'+process.env.REACT_APP_BACKEND_IP+'/admin/getRecord/'+this.props.match.params.id)
            .then(response => {
                this.setState({record: response.data,
                    searchResults: response.data
                });
                console.log(this.state.record)
            })
            .catch(function (error){
                console.log(error);
            })
        axios.get('https://'+process.env.REACT_APP_BACKEND_IP+'/admin/staff/'+this.props.match.params.id)
             .then(response => {
                if(response.data === null){
                    axios.get('https://'+process.env.REACT_APP_BACKEND_IP+'/trainee/'+this.props.match.params.id)
                         .then(response =>{
                            if(response.data === null){
                                this.setState({recordOf: 'Not Found', userType: 'User'});
                            }
                            else{
                                this.setState({recordOf: response.data.trainee_email, userType: 'Trainee'});
                            }
                         })
                }
                else{
                    this.setState({recordOf: response.data.email, userType:'Staff'});
                }
            })
            .catch(function (error){
                console.log(error);
            })    
    }
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    render(){
		if (this.state.currentUser.token.role !== 'admin'){
			return (
			<AccessDenied/>
			)
        }
        else{
            let json = {
                Headers: [{'header':'Date', 'width':100}, {'header':'Event'}],
                Rows: []
            };
            let record = this.state.searchResults;
            const { from, to } = this.state.range;
            const modifiers = { start: from, end: to };
            let range = this.state.range;
            let recordOf = this.state.recordOf;
            let userType = this.state.userType;
            if(from != undefined){
                if(to == undefined){
                    record = record.filter(function(record){
                        let start = new Date(Date.parse(record.timestamp));
                        console.log(start);
                        console.log(from);
                        console.log(DateUtils.isSameDay(start, from));
                        if(DateUtils.isSameDay(start, from)){
                             return record;
                        }
                    })
                }
                else if(to!= undefined){
                    record = record.filter(function(record){
                        let start = new Date(Date.parse(record.timestamp));
                        if(DateUtils.isDayInRange(start, range)){
                             return record;
                        }
                    })
                }
            }
            for(var i=0; i < record.length; i++){
                let a = 1;
                json.Rows.push({'Date':moment(record[record.length - (a+i)].timestamp).format('YYYY/MM/DD'), 'Event': record[record.length - (a+i)].message});
            }

            return(
                <div className = "BigBox">
                <div className="historyTable">
                        <div className="QASearchBar">
                            <h2>{userType} History- {recordOf}</h2>
                            <h3><center><button id="cancelBtn" onClick={() => { document.location.href = "/"; }}>⭠ Back</button></center></h3>
                            <div id="logbox">
                                <label id="searchLogs">Search Logs :</label><SearchBar search={this.search} /><button className="resetBtn" onClick={this.toggle}>Select Start Dates</button>
                            </div>
                        </div>
                        <div className="QASearchBar">
                        <QAGenericTable data={json}/>

                        
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className="dateModal">
                                <ModalHeader toggle={this.toggle} cssModule={{ 'modal-title': 'w-100 text-center' }}>Select Start Dates</ModalHeader>
                                <ModalBody cssModule={{ 'modal-body': 'w-100 text-center' }}>
                                    <div className="mod-body">
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
                        </div>
            </div>
            </div>
            )
        }
    }
}
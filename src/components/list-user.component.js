import React, { Component } from 'react';
import axios from 'axios';
import { authService } from './modules/authService';
import { Link } from 'react-router-dom'
import AccessDenied from './modules/AccessDenied';
import Collapse from 'react-bootstrap/Collapse'
import '../css/GlobalCss.css';
import add from './icons/person-add.svg';
import history from './icons/history.svg';
import close from './icons/close2.svg';
import filterIcon from './icons/filter.svg';
import mail from './icons/envelope.svg';
import sideBar from './sideBar.component';


function checkmenu() {
    console.log("Good");
}


export default class ListUser extends Component {

    constructor(props) {
        //redirects to login if not logged in
        if (!authService.currentUserValue) {
            document.location.href = 'http://' + process.env.REACT_APP_AWS_IP + ':3000/login';
            //this.context.history.push('/login');
        }
        super(props);

        this.state = {
            fontsize: "medium",
            menuopen: "",
            users: [],
            searchString: "",
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

    componentWillUpdate() {
        console.log("MENU");
    }

    async componentWillMount(){
        var x = document.getElementsByClassName("OpenMenu").length;
        console.log(x);
        if (x == '0') {
            this.setState({
                menuopen: "",
            });
        }
        else if (x == '1') {
            this.setState({
                menuopen: "Menu",
            });
        }

        await new Promise(resolve => { setTimeout(resolve, 1000); });
        this.componentWillMount();
    }

    async componentDidMount() {
        axios.get('http://' + process.env.REACT_APP_AWS_IP + ':4000/admin/')
            .then(response => {
                console.log(response.data);
                if (this.state.currentUser.token.role === 'admin') {
                    this.setState({ users: response.data });
                }
            })
            .catch(function (error) {
                console.log(error);
            })

        await new Promise(resolve => { setTimeout(resolve, 1000); });
        this.componentWillMount();
    }

    setFontSize = (e) => {
        console.log(e.value);
        var x = document.getElementById("dropdown2").value;
        console.log(x);
        this.setState({
            fontsize: x,
        });

    }

    setMenuOpen = (e) => {
        var x = document.getElementsByClassName("OpenMenu").length;
        console.log(x);
        if (x == '0') {
            this.setState({
                menuopen: "",
            });
        }
        else if (x == '1') {
            this.setState({
                menuopen: "Menu",
            });
        }
    }


    onChangeSearch(e) {
        this.setState({
            searchString: e.target.value
        })
    }

    onChangeRoleFilter(e) {
        var newVal = e.target.value;
        var newFilter = this.state.filter
        newFilter.role = newVal
        this.setState({
            filter: newFilter
        })
    }

    onChangeSuspendedFilter(e) {
        var newVal = !this.state.filter.suspended
        console.log(newVal)
        var newFilter = this.state.filter
        newFilter.suspended = newVal
        this.setState({
            filter: newFilter
        })
    }

    handleHistoryClick(e) {
        window.location.href = "history/" + e.target.value
    }


    render() {
        let users = this.state.users;
        let search = this.state.searchString.trim().toLowerCase();
        let filter = this.state.filter;
        const { open } = this.state;

        if (search.length > 0) {
            users = users.filter(function (i) {
                if (i.email.toLowerCase().match(search) || i.role.toLowerCase().match(search)) {
                    return i;
                }
                return 0;
            })
        }

        if (filter.role !== 'All') {
            users = users.filter(function (user) {
                if (user.role === filter.role.toLowerCase()) {
                    return user;
                }
                return 0;

            })
        }

        if (filter.suspended === false) {
            users = users.filter(function (user) {
                if (user.status !== 'Suspended') {
                    return user;
                }
                return 0;
            })
        }

        if (this.state.currentUser.token.role !== 'admin') {
            return (
                < AccessDenied />
            );
        } else {
            return (

                <div className={"QAtable" + this.state.menuopen}>
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
                    <img src={filterIcon} alt="filter"></img>
                        </button>
                        <div id="addUser">
                            <select id="dropdown2" className="qabtn" value={this.state.value} onChange={this.setFontSize}>
                                <option hidden value="Medium" selected> TextSize</option>
                                <option value="small" > Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                            <Link className="link" to={"/addUser"}><button className="qabtn">Add User<img src={add} alt="Add User"></img></button></Link>
                            <button onClick={this.setMenuOpen}>OPEN MENU</button>
                        </div>
                        <Collapse in={this.state.open}>
                            <p>
                                <br></br>
                                <label>Role</label> &nbsp;
                        <select onChange={this.onChangeRoleFilter}>
                                    <option value="All">All</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Recruiter">Recruiter</option>
                                </select>&nbsp;&nbsp;
                        <label>Show Suspended</label> &nbsp;
                        <input type="checkbox" value="Suspended" onClick={this.onChangeSuspendedFilter} /> &nbsp;&nbsp;
                    </p>
                        </Collapse>
                    </div>
                    <div id="resultsTable">
                        <table className="table table-hover" style={{ marginTop: 20 }} >
                            <thead>
                                <tr>
                                    <th className="tabletext">Name</th>
                                    <th className="tabletext">Role</th>
                                    <th className="tabletext">Status</th>
                                    <th className="action"><center>Action</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => {
                                    let deleteToggle = '';
                                    let deleteRoute = '';
                                    let currentStaff;
                                    if (user.status === "Suspended") {
                                        deleteToggle = "Reactivate";
                                        deleteRoute = "reactivate";
                                    }
                                    else {
                                        deleteToggle = "Suspend";
                                        deleteRoute = "delete";
                                    }
                                    if (this.state.currentUser.token._id === user._id) {
                                        currentStaff = true;
                                    }
                                    else {
                                        currentStaff = false;
                                    }
                                    return (
                                        <tr className={"trainees" + this.state.fontsize}>
                                            <td>{user.fname} {user.lname}</td>
                                            <td className="userRole">{user.role}</td>
                                            <td>{user.status}</td>
                                            <td>
                                                <center>{currentStaff ? <button id="fakeBtn">
                                                    {deleteToggle}
                                                    <img src={close} alt="Close Window"></img>
                                                </button> : <button className="actionBtn" onClick={() => {
                                                    if (window.confirm('Are you sure you wish to ' + deleteToggle.toLowerCase() + ' this user?'))
                                                        axios.get('http://' + process.env.REACT_APP_AWS_IP + ':4000/admin/' + deleteRoute + '/' + user._id).then(() => window.location.reload())
                                                }}>
                                                        {deleteToggle}
                                                        <img src={close} alt="Close Window"></img>
                                                    </button>}&nbsp;
                                    <button className="actionBtn" value={user._id} onClick={this.handleHistoryClick}>View History <img src={history} alt="View History"></img></button>&nbsp;
                                    <a href={"mailto:" + user.email}><button className="actionBtn">Email <img src={mail} alt="Create Email"></img></button> </a>
                                                </center>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }
}
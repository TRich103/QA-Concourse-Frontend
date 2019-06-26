import React from "react";
import { authService } from './modules/authService';
import { slide as Menu } from "react-burger-menu";
import { BrowserRouter as Router, Route ,NavLink} from "react-router-dom";

export default class sideBar extends React.Component {
	constructor(props) {
        super(props);
			this.state = {
				show_server_logs: true,
				currentUser: authService.currentUserValue
		}
	}
	
componentDidMount(){
		if(this.state.currentUser.token.role === 'admin'){
			this.setState({
				show_server_logs: true,
			})
		}else{
			this.setState({
				show_server_logs: false
			})
		}
	}
	
	 showSettings (event) {
		event.preventDefault();
		}
   render () {
	const {show_server_logs} = this.state;
	
	return (
		// Pass on our props
		<Menu>
			<NavLink to="/" className="sidebar_btn" >Home</NavLink>
			<NavLink to="/trainees" className="sidebar_btn" >Trainees</NavLink>
			{show_server_logs ? 
			<NavLink className="sidebar_btn" to="/users">Users</NavLink>
				: ""}
			<NavLink to="/csvreport" className="sidebar_btn" >CSV Report</NavLink>
			<NavLink to="/costreport" className="sidebar_btn" >Cost Report</NavLink>
			<NavLink className="sidebar_btn" to="/usersettings"> User Settings </NavLink>
			<br/><br/>
		</Menu>
		);
	};
};
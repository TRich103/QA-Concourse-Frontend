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
			<Router>

			<NavLink to="/" className="sidebar_btn" >Home</NavLink>
			<br/><br/>
			<a className="sidebar_btn" href="https://docs.google.com/document/d/1AXQ9NMtyfb5IkY0sDhafANRjIISliqCThlpj8kq99LA/edit" target="_blank" > User Guide</a>
			<br/><br/>
			{show_server_logs ? 
			<NavLink className="sidebar_btn" to="/system_logs">System Logs</NavLink>
				: ""}
			<br/><br/>
			<NavLink className="sidebar_btn" to="/settings"> Universal Settings </NavLink>
			<br/><br/>
			</Router>
		</Menu>
		);
	};
};
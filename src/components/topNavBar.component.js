import React from "react";
import { authService } from './modules/authService';
import "../css/navBar.css";


export default class topNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show_server_logs: false,
            currentUser: authService.currentUserValue,
            changePassVisible: false
        }
    }
    componentDidMount() {
        if (this.state.currentUser.token.role === 'admin') {
            this.setState({
                show_server_logs: true,
                changePassVisible: true
            })
        } else {
            this.setState({
                show_server_logs: false
            })

            if(this.state.currentUser.token.role === 'finance'){
                this.setState({
                    changePassVisible: true
                })
            } else if(this.state.currentUser.token.role === 'recruiter'){
                this.setState({
                    changePassVisible: true
                })
            } else{
                this.setState({
                    changePassVisible: false
                })
            }
        }
    }
    showSettings(event) {
        event.preventDefault();
    }
    handlePasswordStaff(e){
        window.location.href="update-mypassword-staff/"+e.target.value   
    }
    render() {
        const { show_server_logs, changePassVisible } = this.state;

        return (
            // Pass on our props
            <div id="top-nav-bar">
            <ul>
                <li><a className="sidebar_btn" onClick={() => { document.location.href = "/"; }}>Home</a></li>
                <li><a id="HelperGuide" target="_new" className="sidebar_btn" href="https://docs.google.com/document/d/1AXQ9NMtyfb5IkY0sDhafANRjIISliqCThlpj8kq99LA/edit">User Guide</a></li>
                
                {changePassVisible ?
                                <li>
                                <a className="sidebar_btn" onClick={this.handlePasswordStaff}>Change Password </a>
                        </li> : ""
                }
                </ul>
            </div>
        );
    };
};

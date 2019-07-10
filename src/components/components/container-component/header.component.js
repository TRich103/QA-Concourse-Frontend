import React from 'react';
import logo from './QA_logo.png';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import { authService } from "./modules/authService";
import axios from 'axios';
import './css/Header.css';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.state = {
      currentUser: authService.currentUserValue,
      token: '',
      id: '',
      staff_fname: '',
	    staff_lname: '',
      trainee_fname: '',
      trainee_lname: ''
    };
  }

  //Display user
  componentDidMount() {
    // if not logged in no name will be displaed
    if (!this.state.currentUser) {
      return null
    } else {
      axios.get('http://' + process.env.REACT_APP_AWS_IP + ':4000/trainee/' + this.state.currentUser.token._id)
        .then(response => {
          if (response.data == null) {
            axios.get('http://' + process.env.REACT_APP_AWS_IP + ':4000/admin/staff/' + this.state.currentUser.token._id)
              .then(response => {
                if(response.data == null){
                  authService.logout();
                  document.location.href = 'http://' + process.env.REACT_APP_DNS + ':3000/login';
                }
                else{
                  this.setState({
                    staff_fname: response.data.fname,
					          staff_lname: response.data.lname
                  })
                }
              })
          } else {
            this.setState({
              trainee_fname: response.data.trainee_fname,
              trainee_lname: response.data.trainee_lname
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  login() {
    document.location.href = '/login';
  }
  logout() {
    authService.logout();
  }
  
  render() {

    if (this.state.currentUser) {
      console.log(this.state)
      return (
        <div id='bar'>
		    <div id="navigation-bar">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/"><img src={logo} alt="QA logo" width="60px" /></NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem className="display_name">Logged in as: {this.state.trainee_fname} {this.state.trainee_lname} {this.state.staff_fname} {this.state.staff_lname}  |  </NavItem>
                <NavItem>
                  <Button id="logoutBtn" onClick={this.logout} href='/login'>
                    Logout
                  </Button>
                </NavItem>
              </Nav>
          </Navbar>
		 </div>
		</div>
      );
    } else if (!this.state.currentUser) {
      return (
        <div id="navigation-bar">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/"><img src={logo} width="60px" />
			      </NavbarBrand>
              <Nav className="ml-auto" navbar>
                <Button id="loginBtn" onClick={this.login} href='/login'>
                  Login
                </Button>
              </Nav>
          </Navbar>
        </div>
      );

    }
  }
}
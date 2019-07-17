import React from 'react';
import logo from './QA_logo.png';
import { Navbar, NavbarBrand, Nav, NavItem, NavDropdown, Button } from 'react-bootstrap'; 
import * as _ from 'lodash';
import { authService } from "./modules/authService";
import axios from 'axios';
import PasswordStaff from '../../admin-staff-password';
import UserProfile from '../../user_profile/user-details.component.js';
import TraineeProfile from '../../trainee-details.component.js'
import './css/Header.css';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
	this.profile = this.profile.bind(this);
	
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
  profile(){
	  if(this.state.currentUser.token.role === 'trainee'){
		  this.props.content(<TraineeProfile/>)
	  }else{
		  this.props.content(<UserProfile/>)
	  }
  }
  render() {
	  
	let role = this.props.role 
	
    if (this.state.currentUser) {
      let Tname = this.state.trainee_fname + ' ' + this.state.trainee_lname;
	  let Sname = this.state.staff_fname + ' ' + this.state.staff_lname;
	  let displayName;
	  if(this.state.currentUser.token.role === 'trainee'){
		  displayName = Tname;
	  }
	  else{
		  displayName = Sname;
	  }
      return (
        <div id='bar'>
		<div id="navigation-bar">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/"><img src={logo} alt="QA logo" width="60px" /></NavbarBrand>
             <Nav className="mr-auto" navbar>
			  {this.props.links[role].buttons.map(button => {
				  return <Nav.Link onclick={() => this.props.content(button.content)}>{button.name}</Nav.Link>
			  })}
			  {this.props.links[role].dropdowns.map(dropdown => {
				  return (
				  <NavDropdown title={dropdown.name} id="basic-nav-dropdown">
					  {dropdown.content.map(content =>{
						  return <NavDropdown.Item onClick={() => this.props.content(content.content)}>{content.name}
						  </NavDropdown.Item>
					  })}
				   </NavDropdown>
				  )
			  })}
			  </Nav>
			  <Nav>
			  <div className="menu" onClick={this.profile}></div>
			   <NavDropdown title={displayName} className="login-dropdown">
					<NavDropdown.Item onClick={this.profile} >Profile</NavDropdown.Item>
					<NavDropdown.Item onClick={()=>{this.props.content(<PasswordStaff/>)}} >Change Password</NavDropdown.Item>
                </NavDropdown>  
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
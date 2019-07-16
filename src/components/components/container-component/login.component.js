import React, { Component } from 'react';

import axios from 'axios';

import { authService } from "./modules/authService";
import decode from "jwt-decode";
import {Button} from 'reactstrap';
import ForgotPass from '../../forgot-password.component';
import './css/Header.css';
import "./css/Login.css";

export default class Login extends Component {

    constructor(props) {
        super(props);
        //redirects to home if already logged in
        if (authService.currentUserValue) {
            this.props.history.push('/');
        }
        this.state = {
            uname: '',
            psw: '',
        };
    }

    handleUsername = event => {
        this.setState({
            email: event.target.value.toLowerCase()
        });
    }

    handlePassword = event => {
        this.setState({
            psw: event.target.value
        })
    }

    onSubmit = event => {
        event.preventDefault();

        const user = {
            username: this.state.email,
            password: this.state.psw,
            token: ''
        };

        const token = {
            token: ''
        };

        axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/auth/login', user)
            .then(function (res) {
                if (res.status === 200) {
                    var status = res.data.user.status;
                    console.log("STATUS: "+status);
                    if(status !== "Suspended"){
                        document.location.href = 'http://'+process.env.REACT_APP_AWS_IP+':3000/';
                        token.token = decode(res.data.token);
                        localStorage.setItem('currentUser', JSON.stringify(token));
                    }
                    else{
                        alert("Account Suspended");
                    }
                }
                else if (res.status === 204) {
                    console.log('email and password do not match');
                    alert('Username or Password does not match')
                } else {
                    console.log('Account does not exist');
                    alert("Email does not exist");
                }
            })
            .catch(error => {
                alert("Invalid Email/Password");
                console.log(error.response)
            });
    }

    render() {
        return (
            <div className="Login">
                <form className="form" onSubmit={this.onSubmit}>
                    <label className="uname" bsSize="large"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" onChange={this.handleUsername} required />
                    <br/>
                    <label className="psw" bsSize="large"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" onChange={this.handlePassword} required />
                    <br />
                    <br/>
                    <Button id="loginBtn" type="submit" className="btn" value="Login">
                        Login
                    </Button>
					<button className="forgotBtn" onClick={() => {this.props.content(<ForgotPass/>)}}>FORGOT PASSWORD?</button> 
                </form>
            </div>
        )
    }
}
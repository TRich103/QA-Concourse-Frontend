import React, { Component } from 'react';

import { authService } from './authService';


export default class AccessDenied extends Component {

componentDidMount(){
	if(authService.currentUserValue.token.role === undefined){
			document.location.href = '/trainee-details/'+authService.currentUserValue.token._id;
	}else{
	alert('Access Denied');
	document.location.href = 'http://'+process.env.REACT_APP_AWS_IP+':3000/';
	}
}

render() {
        return (
		<div id="access-denied-error">
		</div>
		);
	}
}
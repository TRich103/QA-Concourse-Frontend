import { AdminHome, Admin1, Admin2, Admin3, Admin4, Admin5, Admin6,
         RecruiterHome, Recruiter1, Recruiter2, Recruiter3, Recruiter4, Recruiter5, Recruiter6 } from'./placeholder-components';
import Login from './login.component'
import React, { Component }  from 'react';
import GenericDiv from '../table-component/generic-div.component';
import SearchContainer from '../search-bar-component/searchContainer.component';
import PictureButtonDiv from '../picture-button-component/button-div.component';
import ButtonDiv from '../text-button-component/button-div.component';
import ApartmentList from '../apartment-display-component/apartment-list.component';
import CalendarDiv from '../calendar-component/generic-div.component';
import QAForm from '../form-component/qa-form.component'

//Admin
import ListTrainee from '../../standalone-list-trainee.component.js';
import TraineeSettings from '../../TraineeSettings.component';
import CostReports from '../../cost-Report.component.js';
import ListUser from '../../list-user.component.js';
import PasswordStaff from '../../admin-staff-password';
import CreateUser from '../../create-user.component';
import CreateTrainee from "../../create-trainee.component";
//Recruiter
import RecruiterTrainee from '../../list-trainee.component.js';

export const myConfig =
{
    "null": <Login/>,
    "recruiter": {
        "home": <RecruiterTrainee/>,
        "buttons": [
                        {'name': 'Home', 'content': <RecruiterTrainee/>},
						{'name': 'Change Password', 'content':<PasswordStaff/>}
                   ],
        "dropdowns":[
                        {   'name': 'Bursary',
                            'content':[
                                        {'name': 'Create Trainees', 'content': <CreateTrainee/>},
                                        {'name': 'View Trainees', 'content': <RecruiterTrainee/>}
                                    ]
                        },
                    ],
        "side": [
                        {'name': 'Trainees', 'content': <RecruiterTrainee/>},
                   ],
    },
    "admin": {
        "home": <ListTrainee/>,
        "buttons": [
						{'name': 'Change Password', 'content':<PasswordStaff/>},
						{'name': 'Bursary', 'content':<ListTrainee/>},
						{'name': 'User Managment', 'content':<ListUser/>},
						
                   ],
        "dropdowns":[ ],
        "side": [
						{'name': 'Trainees', 'content': <ListTrainee/>},
						{'name': 'Cost Report', 'content': <CostReports/>}
                   ],
    },
	"finance": {
        "home": <ListTrainee/>,
        "buttons": [
                        {'name': 'Bursary', 'content': <ListTrainee/>},
						{'name': 'Change Password', 'content':<PasswordStaff/>}
                   ],
        "dropdowns":[
                    ],
        "side": [
						{'name': 'Trainees', 'content': <ListTrainee/>},
						{'name': 'Cost Report', 'content': <CostReports/>}
                   ],
    }
}
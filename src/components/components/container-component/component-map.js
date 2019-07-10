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
//Recruiter
import listTrainee from '../../list-trainee.component.js';

export const myConfig =
{
    "null": <Login/>,
    "recruiter": {
        "home": <listTrainee/>,
        "buttons": [
                        {'name': 'Home', 'content': <listTrainee/>},
						{'name': 'Change Password', 'content':<PasswordStaff/>}
                   ],
        "dropdowns":[
                        {   'name': 'Bursary',
                            'content':[
                                        {'name': 'Recruiter Bursary Link 1', 'content': <Recruiter1/>},
                                        {'name': 'Recruiter Bursary Link 2', 'content': <Recruiter2/>}
                                    ]
                        },
                        {  'name': 'Apartments',
                           'content':[
                                        {'name': 'Recruiter Apartment Link 1', 'content': <Recruiter3/>},
                                        {'name': 'Recruiter Apartment Link 2', 'content': <Recruiter4/>}
                                    ]
                        }
                    ],
        "side": [
                        {'name': 'Trainees', 'content': <listTrainee/>},
                        {'name': 'Recruiter SiderBar Link 2', 'content': <Recruiter6/>}
                   ],
    },
    "admin": {
        "home": <ListTrainee/>,
        "buttons": [
                        {'name': 'Bursary', 'content': <ListTrainee/>},
						{'name': 'Change Password', 'content':<PasswordStaff/>}
                   ],
        "dropdowns":[
                        {   'name': 'Demo',
                            'content':[
                                        {'name': 'Table', 'content': <GenericDiv/>},
                                        {'name': 'Search Bar', 'content':<div>
                                                                            <h2>QA Search Bar</h2>
                                                                            <p>Please search for the values of the JSON objects (i.e John, Mary, Jack@example.com etc.)</p>
                                                                            <SearchContainer data = {[{'Name': 'John', 'Age': '22', 'Email': 'John@example.com'},
                                                                                                    {'Name': 'Jane', 'Age': '26', 'Email': 'Jane@example.com'},
                                                                                                    {'Name': 'Jack', 'Age': '24', 'Email': 'Jack@example.com'},
                                                                                                    {'Name': 'Mary', 'Age': '23', 'Mobile': '07777888999'}]}/>
                                                                        </div>                           
                                        },
                                        {'name': 'Buttons', 'content': <div>
                                                                            <h2>Picture and Text Buttons</h2>
                                                                            <PictureButtonDiv/><br/>
                                                                            <ButtonDiv/><br/>
                                                                       </div>
                                        },
                                        {'name': 'Apartment Display', 'content': <div>
                                                                                      <h2>Apartment Display</h2>
                                                                                      <ApartmentList/><br/>
                                                                                 </div>
                                        },
                                        {'name': 'Calendar', 'content': <div>
                                                                             <CalendarDiv/><br/>
                                                                        </div>
                                        },
                                        {'name': 'Generated Form', 'content': <div>
                                                                                <QAForm data={[{"FieldText": "Name", "Type": "text" , "UniqueID": "formnamefield"},
                                                                                            { "FieldText": "Choose a fruit", "Type": "select", "UniqueID": "formfruitfield", "Options": ["Apple", "Banana", "Pear", "Orange", "Grape"] },
                                                                                            {"FieldText": "Which country do you like the most?", "Type": "radio" , "UniqueID": "formcountryfield", "Options":["UK","Germany","Russia","USA"]},
                                                                                            { "FieldText": "Which animals are cool?", "Type": "checkbox", "UniqueID": "formanimalfield", "Options": ["Tigers", "Penguins", "Gorillas", "Wolves"] }]} />
                                                                              </div>
                                        },
                                      ]
                        }
                    ],
        "side": [
						{'name': 'Trainees', 'content': <ListTrainee/>},
                        {'name': 'Users', 'content': <ListUser/>},
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
                        {   'name': 'Demo',
                            'content':[
                                        {'name': 'Table', 'content': <GenericDiv/>},
                                        {'name': 'Search Bar', 'content':<div>
                                                                            <h2>QA Search Bar</h2>
                                                                            <p>Please search for the values of the JSON objects (i.e John, Mary, Jack@example.com etc.)</p>
                                                                            <SearchContainer data = {[{'Name': 'John', 'Age': '22', 'Email': 'John@example.com'},
                                                                                                    {'Name': 'Jane', 'Age': '26', 'Email': 'Jane@example.com'},
                                                                                                    {'Name': 'Jack', 'Age': '24', 'Email': 'Jack@example.com'},
                                                                                                    {'Name': 'Mary', 'Age': '23', 'Mobile': '07777888999'}]}/>
                                                                        </div>                           
                                        },
                                        {'name': 'Buttons', 'content': <div>
                                                                            <h2>Picture and Text Buttons</h2>
                                                                            <PictureButtonDiv/><br/>
                                                                            <ButtonDiv/><br/>
                                                                       </div>
                                        },
                                        {'name': 'Apartment Display', 'content': <div>
                                                                                      <h2>Apartment Display</h2>
                                                                                      <ApartmentList/><br/>
                                                                                 </div>
                                        },
                                        {'name': 'Calendar', 'content': <div>
                                                                             <CalendarDiv/><br/>
                                                                        </div>
                                        },
                                        {'name': 'Generated Form', 'content': <div>
                                                                                <QAForm data={[{"FieldText": "Name", "Type": "text" , "UniqueID": "formnamefield"},
                                                                                            { "FieldText": "Choose a fruit", "Type": "select", "UniqueID": "formfruitfield", "Options": ["Apple", "Banana", "Pear", "Orange", "Grape"] },
                                                                                            {"FieldText": "Which country do you like the most?", "Type": "radio" , "UniqueID": "formcountryfield", "Options":["UK","Germany","Russia","USA"]},
                                                                                            { "FieldText": "Which animals are cool?", "Type": "checkbox", "UniqueID": "formanimalfield", "Options": ["Tigers", "Penguins", "Gorillas", "Wolves"] }]} />
                                                                              </div>
                                        },
                                      ]
                        }
                    ],
        "side": [
						{'name': 'Trainees', 'content': <ListTrainee/>},
						{'name': 'Cost Report', 'content': <CostReports/>}
                   ],
    }
}
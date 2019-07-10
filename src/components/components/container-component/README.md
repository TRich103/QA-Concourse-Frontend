# QA-Container

A container component that displays content based on user role

### Changing displayed content

The content that the container displays for each role is mapped in a JSON object found in "component-map.js". The demo only has Admin and Recruiter mapped but to add another role we can simply that role to the aforementioned JSON. 

Similarly we can change the components each role has access to by editing the mapped components in the JSON: 
-"buttons" refernces a simple Navbar link
-"dropdowns" references dropdowns in the Navbar 
-"home" references the component the user is immediately directed to after login
-"null" is the component the user is directed to if they haven't logged in 

Example JSON:

```
{
    "null": <Login/>,
    "recruiter": {
        "home": <RecruiterHome/>,
        "buttons": [
                        {'name': 'Home', 'content': <RecruiterHome/>}
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
                    ]
    },
    "admin": {
        "home": <AdminHome/>,
        "buttons": [
                        {'name': 'Home', 'content': <AdminHome/>}
                   ],
        "dropdowns":[
                        {   'name': 'Bursary',
                            'content':[
                                        {'name': 'Admin Bursary Link 1', 'content': <Admin1/>},
                                        {'name': 'Admin Bursary Link 2', 'content': <Admin2/>}
                                      ]
                        },
                        {  'name': 'Apartments',
                           'content':[
                                        {'name': 'Admin Apartment Link 1', 'content': <Admin3/>},
                                        {'name': 'Admin Apartment Link 2', 'content': <Admin4/>}
                                     ]
                        }
                    ]
    }
}
```



### Dependencies
Inside package.json "dependencies":


container:
```
-    "lodash": "^4.17.11",
-    "reactstrap": "^8.0.0"
    
```
Navbar:
```
    "lodash": "^4.17.11",
    "react-bootstrap": "^1.0.0-beta.9"
    
```

Login Demo:
```
-    "axios": "^0.19.0"
-    "jwt-decode": "^2.2.0"
    
```


### Demo Deployment

-Open a command window in root Git directory and run:

```
npm install
npm start
```
You can login to using the following accounts:

```
User: adamadmin@example.com
Password: adam

User: ronnyrecruiter@example.com
Password: password
```

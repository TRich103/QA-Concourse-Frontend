import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as _ from 'lodash';
import SideBar from './sideBar.component';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

export default class Navbarr extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let role = this.props.role
        return (
                <div id="navigation-bar">
                    <Navbar bg="light" expand="lg">
                            <Nav className="mr-auto">
                                {this.props.links[role].buttons.map(button => {
                                    console.log(button.name)
                                    return <Nav.Link onClick={()=>this.props.content(button.content)}>{button.name}</Nav.Link>
                                })}
								 {this.props.links[role].dropdowns.map(dropdown => {
                                    console.log(dropdown.name)
                                    return(
                                        <NavDropdown title={dropdown.name} id="basic-nav-dropdown">
                                            {dropdown.content.map(content =>{
                                                return  <NavDropdown.Item onClick={()=>this.props.content(content.content)}>{content.name}</NavDropdown.Item>
                                            })}
                                        </NavDropdown>                          
                                    )
                                })}
                            </Nav>
                    </Navbar>
                </div>


        );
    };

}
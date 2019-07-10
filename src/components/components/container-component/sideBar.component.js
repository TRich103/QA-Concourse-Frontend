import React from "react";
import { push as Menu } from "react-burger-menu";
import open from './icons/Open.svg';
import close from './icons/Close.svg';
import Nav from 'react-bootstrap/Nav';
import './css/SideBar.css'

export default class sideBar extends React.Component {
	constructor(props) {
        super(props);
	}

   render () {	
	let role = this.props.role
	return (
		<div>
		<Menu htmlClassName={"OpenMenu"} 
			  customBurgerIcon={ <img src={open} /> } 
			  customCrossIcon={ <img src={close} /> } 
			  noOverlay 
			  pageWrapId={ "page-wrap" } 
			  outerContainerId={ "outer-container" }
		>
			{this.props.links[role].side.map(button => {
				return <Nav.Link onClick={()=>this.props.content(button.content)}>{button.name}</Nav.Link>
			})}
		</Menu>
		</div>
		);
	};
};
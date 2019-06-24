import React from 'react';
import Login from "../src/components/login.component.js";
import renderer from 'react-test-renderer';
import TestUtils from 'react-dom/test-utils';
import axios from "axios";
import { shallow, mount, render, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import regeneratorRuntime from "regenerator-runtime";
import 'babel-polyfill';
import {BrowserRouter as Router, Route} from "react-router-dom";

configure({
	adapter: new Adapter(),
	disableLifecycleMethods: true
	});

beforeEach(() => {
  jest.resetModules();
});

describe('Login Component', () => {
	const mockValues = {
		email: 'recruiter@mail.com',
		psw: 'password',
		onSubmit: jest.fn(),
	};

	it("should render the login component", () => {
		const instance = renderer.create(<Login/>); 

	})

	it("should show the login form & submit login credentials", () => {
		var rendered = TestUtils.renderIntoDocument(<Login/>);
		var form = TestUtils.findRenderedDOMComponentWithTag(rendered, 'form');
		TestUtils.Simulate.submit(form, {uname:"recruiter@mail.com", psw:"password"});
	});

	it('returns result of false along with email when called with wrong details', async() => {
        var mock = new MockAdapter(axios);
		var rendered = TestUtils.renderIntoDocument(<Login/>);
        const data = {result: false, email: 'Qatesting@qa.com', psw:'password'};
        mock.onPost('http://localhost:4000/trainee/login').reply(data);
    }, 1000);
	
	it('returns result of true along with email when called with correct details', async() => {
        var mock = new MockAdapter(axios);
		var rendered = TestUtils.renderIntoDocument(<Login/>);
        const data = {result: true, email: 'recruiter@gmail.com', psw:'password'};
        mock.onGet('http://localhost:4000/trainee/login').reply(data);
    }, 1000);
	
})
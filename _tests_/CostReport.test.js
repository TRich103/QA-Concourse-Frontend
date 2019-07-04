import React from 'react';
import CostReport from "../src/components/cost-report.component";
import { authService } from "../src/components/modules/authService.js";
import renderer from 'react-test-renderer';
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
// Currently insterting currentUser directly into component 
// currentUser: {token:{ role: "admin", status: "Active"}},

let spy
describe ("CostReport", () => {
	beforeEach(() => {
		const wrapper = shallow(<CostReport/>,{ lifecycleExperimental: true });;
		wrapper.setState({report: true,
            trainee_data: [],
            staffEmail: '',
			approvedBy: '',
			finApprovedBy:'',
			approval: '',
			finApproval:'',
			ShowApproval: false,
			form_cancel: false,
            date: '',
            values : {
                amountPayable: 0,
                daysPayable: 0,
                dailyPayments: 0,
                status: '',
                bench_number: '',
                training_number: '',
                pending_number: '',
            },
            open: true,
            filterOpen: false,
            searchString: '',
            filter: {
                myTrainees: false,
                status: 'All',
                pending: false
            },
            range:{
                from: undefined,
                to: undefined,
            },
            modal: false,
            tableDays: 0,
            tableTotal: 0,
            startDate: ''
		})

    jest.setTimeout(10000);
  });
	it('renders the cost report component', done => {
		let wrapper = mount(<CostReport/>);
		expect(wrapper.find('#cRTitle').length).toEqual(1);
		done();
	});
	it('componentDidMount',done => {
		let props = ({
			approvedBy:jest.fn(),
			finApprovedBy:jest.fn(),
            date: 'July 2019',
			values : {
                amountPayable: 5,
                daysPayable: 10,
                dailyPayments: 5,
                status: 'PendingApproval',
                bench_number: '10',
                training_number: '5',
                pending_number: '5',
            },
		});
		const spy = jest.spyOn(CostReport.prototype, 'componentDidMount');
		let wrapper = mount(<CostReport {...props} />);
		wrapper.instance().componentDidMount();
		expect(spy).toHaveBeenCalled();
		spy.mockClear();
		done();
		
	})
});
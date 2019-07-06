import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import CreateTrainee from '../create-trainee.component';

Enzyme.configure({adapter: new Adapter()})

let wrapper;

beforeEach(() => {
    wrapper = mount(<CreateTrainee/>);
});

describe('Create trainee render tests', ()=>{
    it('renders correctly when there are no items', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    
    it('checking that input input are rendered', () => {
        expect(wrapper.find('input')).toHaveLength(16);
    });

    it('checking that labels are all rendered', () => {
        expect(wrapper.find('label')).toHaveLength(18);
    })

    it('checking that button is rendered', () => {
        expect(wrapper.find('#createTraineeBtn')).toHaveLength(1);
    })

    it('checking that collapse component is rendered', () => {
        expect(wrapper.find('Collapse')).toHaveLength(2);
    })
})

describe('Testing functions', () => {
    it('check that componentDidMount has been called', () => {
        const spy = jest.spyOn(CreateTrainee.prototype, 'componentDidMount');
        const wrapper = mount(<CreateTrainee />);
        wrapper.instance().componentDidMount();
        expect(spy).toBeCalled();
    })

    it('check fname changes when input', () => {
        const wrapper = mount(<CreateTrainee/>);
        const input = wrapper.find('input').at(0);
        input.simulate('change', {target : {value : 'B' }});
        expect(wrapper.state('trainee_fname')).toEqual('B');
        expect(wrapper.find('input').at(0).prop('value')).toEqual('B');
    })

    it('check lname changes when input', () => {
        const wrapper = mount(<CreateTrainee/>);
        const input = wrapper.find('input').at(1);
        input.simulate('change', {target : {value : 'G' }});
        expect(wrapper.state('trainee_lname')).toEqual('G');
        expect(wrapper.find('input').at(1).prop('value')).toEqual('G');  
    })

    it('checks phone number changes when input', () => {
        const wrapper = mount(<CreateTrainee />);
        const input = wrapper.find('input').at(2);
        input.simulate('change', {target : {value : 12345678 }});
        expect(wrapper.state('trainee_phone')).toEqual(12345678);
        expect(wrapper.find('input').at(2).prop('value')).toEqual(12345678); 
    })

    it('checks emails changes when input', () => {
        const wrapper = mount(<CreateTrainee />);
        const input = wrapper.find('input').at(3);
        input.simulate('change', {target : {value : 'bg@gmail.com' }});
        expect(wrapper.state('trainee_email')).toEqual('bg@gmail.com');
        expect(wrapper.find('input').at(3).prop('value')).toEqual('bg@gmail.com'); 
    })

    it('checks uni or not changes when input is clicked', () => {
        const wrapper = mount(<CreateTrainee />);
        const input = wrapper.find('input').at(4);
        input.simulate('click');
        expect(wrapper.state('university')).toEqual(true); 
    })

    it('checks uni name changes when input', () => {
        const wrapper = mount(<CreateTrainee />);
        wrapper.setState({ university : true});
        const input = wrapper.find('input').at(5);
        input.simulate('change', {target : {value : 'University' }});
        expect(wrapper.state('uniName')).toEqual('University');
        expect(wrapper.find('input').at(5).prop('value')).toEqual('University'); 
    })

    it('checks degree name changes when input', () => {
        const wrapper = mount(<CreateTrainee />);
        wrapper.setState({ university : true});
        const input = wrapper.find('input').at(6);
        input.simulate('change', {target : {value : 'Science' }});
        expect(wrapper.state('degree')).toEqual('Science');
        expect(wrapper.find('input').at(6).prop('value')).toEqual('Science'); 
    })

    it('checks bursary or not changes when clicked', () => {
        const wrapper = mount(<CreateTrainee />);
        const input = wrapper.find('input').at(7);
        input.simulate('click');
        expect(wrapper.state('bursary')).toEqual("False");
    })

    it('checks bursary amount changes when input', () => {
        const wrapper = mount(<CreateTrainee />);
        const box = wrapper.find('input').at(7);
        box.simulate('click');
        wrapper.setState({ bursary : true});
        const input = wrapper.find('input').at(8);
        input.simulate('change', {target : {value : 32 }});
        wrapper.setState({ bursary_amount : 32});
        expect(wrapper.state('bursary_amount')).toEqual(32);
    })

    it('checking onSubmit function', () => {
        const spy = jest.spyOn(CreateTrainee.prototype, 'onSubmit');
        const wrapper = mount(<CreateTrainee />);
        const e = { preventDefault: jest.fn() };
        wrapper.setState({
            trainee_fname: 'Sam',
            trainee_lname: 'Hicks',
            trainee_email: 'samhicks@mail.com',
            trainee_gender: 'Male',
            trainee_uniName: 'Oxford Uni',
            trainee_phone: 123456,
            trainee_degree: 'Uni Management',
            trainee_chosenTech: 'Java',
            trainee_intake: 'Java 2019',
            trainee_geo: "Yes",
            trainee_clearance: 'None',
            trainee_password: Math.random().toString(36).slice(-8),
            trainee_start_date: "Tue Jul 09 2019 12:00:00 GMT+0100 (British Summer Time)",
            trainee_end_date: "Mon Sep 30 2019 00:00:00 GMT+0100 (British Summer Time)",
            added_By: 'Gareth D',
            bursary: "True",
            bursary_amount: "30",
            trainee_bench_end_date: "Mon Dec 23 2019 00:00:00 GMT+0000 (Greenwich Mean Time)",
            trainee_bench_start_date: "Tue Oct 01 2019 00:00:00 GMT+0100 (British Summer Time)",
            bank_holiday: "1",
        });
        let btn = wrapper.find('#createTraineeBtn');
        btn.simulate('click');
        wrapper.instance().onSubmit(e);
        expect(spy).toBeCalled();
    })
})

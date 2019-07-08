import React from 'react';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import CostReport from '../cost-Report.component';

Enzyme.configure({adapter: new Adapter()})

let wrapper;

beforeEach(() => {
    wrapper = mount(<CostReport/>);
});

describe('Create trainee render tests', ()=>{

    it('renders correctly when there are no items', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    
    it('checking that input input are rendered', () => {
        expect(wrapper.find('input')).toHaveLength(3);
    });

    it('checking that labels are all rendered', () => {
        expect(wrapper.find('button')).toHaveLength(4);
    })

})

describe('Testing functions', () => {
    it('check that componentDidMount has been called', () => {
        const spy = jest.spyOn(CostReport.prototype, 'componentDidMount');
        const wrapper = mount(<CostReport />);
        wrapper.instance().componentDidMount();
        expect(spy).toBeCalled();
    })

    it('check search string changes when input in search box', () => {
        const wrapper = mount(<CostReport/>);
        const input = wrapper.find('input').at(1);
        input.simulate('change', {target : {value : 'B' }});
        expect(wrapper.state('searchString')).toEqual('B');
        expect(wrapper.find('input').at(1).prop('value')).toEqual('B');
    })

    it(' function check that status change works', () => {
        const onClickSpy = jest.spyOn(wrapper.instance(), "onChangeStatusFilter");
        wrapper.instance().onChangeStatusFilter({target:{value:"Pending"}});
        expect(onClickSpy).toHaveBeenCalled();
        expect(wrapper.state().filter.status).toEqual("Pending");
    });

    it('checks phone number changes when input', () => {
        const wrapper = mount(<CostReport />);
        const input = wrapper.find('input').at(2);
        input.simulate('click');
        expect(wrapper.state().filter.pending).toEqual(true); 
    })

    it('checks toggle changes when function called', () => {
        const onClickSpy = jest.spyOn(wrapper.instance(), "toggle");
        wrapper.instance().toggle();
        expect(onClickSpy).toHaveBeenCalled();
    })

    it('check handle Days function changes values', () => {
        const wrapper = shallow(<CostReport/>);
        const onClickSpy = jest.spyOn(wrapper.instance(), "handleDaysClicked");
        wrapper.instance().handleDaysClicked("Mon Jul 22 2019 12:00:00 GMT+0100 (British Summer Time)");
        expect(onClickSpy).toHaveBeenCalled();
    })

    it('checks handle reset click', () => {
        const onClickSpy = jest.spyOn(wrapper.instance(), "handleResetClick");
        wrapper.instance().handleResetClick();
        expect(onClickSpy).toHaveBeenCalled();
        expect(wrapper.state().range).toEqual({from: undefined, to: undefined});
    })

    it('checks update report', () => {
        //
    })

//     it('checks emails changes when input', () => {
//         const wrapper = mount(<CreateTrainee />);
//         const input = wrapper.find('input').at(3);
//         input.simulate('change', {target : {value : 'bg@gmail.com' }});
//         expect(wrapper.state('trainee_email')).toEqual('bg@gmail.com');
//         expect(wrapper.find('input').at(3).prop('value')).toEqual('bg@gmail.com'); 
//     })

//     it('checks uni or not changes when input is clicked', () => {
//         const wrapper = mount(<CreateTrainee />);
//         const input = wrapper.find('input').at(4);
//         input.simulate('click');
//         expect(wrapper.state('university')).toEqual(true); 
//     })

//     it('checks uni name changes when input', () => {
//         const wrapper = mount(<CreateTrainee />);
//         wrapper.setState({ university : true});
//         const input = wrapper.find('input').at(5);
//         input.simulate('change', {target : {value : 'University' }});
//         expect(wrapper.state('uniName')).toEqual('University');
//         expect(wrapper.find('input').at(5).prop('value')).toEqual('University'); 
//     })

//     it('checks degree name changes when input', () => {
//         const wrapper = mount(<CreateTrainee />);
//         wrapper.setState({ university : true});
//         const input = wrapper.find('input').at(6);
//         input.simulate('change', {target : {value : 'Science' }});
//         expect(wrapper.state('degree')).toEqual('Science');
//         expect(wrapper.find('input').at(6).prop('value')).toEqual('Science'); 
//     })

//     it('checks bursary or not changes when clicked', () => {
//         const wrapper = mount(<CreateTrainee />);
//         const input = wrapper.find('input').at(7);
//         input.simulate('click');
//         expect(wrapper.state('bursary')).toEqual("False");
//     })

//     it('checks bursary amount changes when input', () => {
//         const wrapper = mount(<CreateTrainee />);
//         const box = wrapper.find('input').at(7);
//         box.simulate('click');
//         wrapper.setState({ bursary : true});
//         const input = wrapper.find('input').at(8);
//         input.simulate('change', {target : {value : 32 }});
//         wrapper.setState({ bursary_amount : 32});
//         expect(wrapper.state('bursary_amount')).toEqual(32);
//     })

//     it('checking onSubmit function', () => {
//         const spy = jest.spyOn(CreateTrainee.prototype, 'onSubmit');
//         const wrapper = mount(<CreateTrainee />);
//         const e = { preventDefault: jest.fn() };
//         wrapper.setState({
//             trainee_fname: 'Sam',
//             trainee_lname: 'Hicks',
//             trainee_email: 'samhicks@mail.com',
//             trainee_gender: 'Male',
//             trainee_uniName: 'Oxford Uni',
//             trainee_phone: 123456,
//             trainee_degree: 'Uni Management',
//             trainee_chosenTech: 'Java',
//             trainee_intake: 'Java 2019',
//             trainee_geo: "Yes",
//             trainee_clearance: 'None',
//             trainee_password: Math.random().toString(36).slice(-8),
//             trainee_start_date: "Tue Jul 09 2019 12:00:00 GMT+0100 (British Summer Time)",
//             trainee_end_date: "Mon Sep 30 2019 00:00:00 GMT+0100 (British Summer Time)",
//             added_By: 'Gareth D',
//             bursary: "True",
//             bursary_amount: "30",
//             trainee_bench_end_date: "Mon Dec 23 2019 00:00:00 GMT+0000 (Greenwich Mean Time)",
//             trainee_bench_start_date: "Tue Oct 01 2019 00:00:00 GMT+0100 (British Summer Time)",
//             bank_holiday: "1",
//         });
//         let btn = wrapper.find('#createTraineeBtn');
//         btn.simulate('click');
//         wrapper.instance().onSubmit(e);
//         expect(spy).toBeCalled();
//     })
 })

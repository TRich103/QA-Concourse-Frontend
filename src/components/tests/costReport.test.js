import React from 'react';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import * as jsPDF from 'jspdf';
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
        const onClickSpy = jest.spyOn(wrapper.instance(), "updateReport");
        wrapper.instance().updateReport();
        expect(onClickSpy).toHaveBeenCalled();
    })

    it('checks handleChange', () => {
        const onClickSpy = jest.spyOn(wrapper.instance(), "handleChange");
        wrapper.instance().handleChange("Mon Jul 22 2019 12:00:00 GMT+0100 (British Summer Time)");
        expect(onClickSpy).toHaveBeenCalled();
    })

    it('checks onSubmit', () => {
        const onClickSpy = jest.spyOn(wrapper.instance(), "onSubmit");
        wrapper.instance().onSubmit();
        expect(onClickSpy).toHaveBeenCalled();
    })

    it('checks updatePDF', () => {
        global.URL.createObjectURL = jest.fn();
        global.URL.createObjectURL = jest.fn(() => 'details');
        window.navigator.msSaveOrOpenBlob = jest.fn(() => 'details');
        const onClickSpy = jest.spyOn(wrapper.instance(), "updatePDF");
        wrapper.instance().updatePDF([{bursary: {amountDay: "30", amountMonth: 240},days: "8",displayStart: "19/06/2019",email: "bibek8989@hotmail.com",expenses: 119.5,name: "B Gurung",recruitedBy: "Adam Admin",start: "2019-06-19T11:00:00.000Z",status: "Training",totalMonth: 359.5}]);
        expect(onClickSpy).toHaveBeenCalled();
    })

 })

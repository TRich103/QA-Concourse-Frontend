import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import renderer from 'react-test-renderer';
import Calendar from './calendar.component';

configure({ adapter: new Adapter() });

const clickFn = jest.fn();

describe('Calendar', () => {

    it('should be able to render the Calendar with properties received from a parent', () => {
        const startDateTitle = 'Test Start Date';
        const endDateTitle = 'Test End Date';
        const component = shallow(<Calendar start_date_title={startDateTitle} end_date_title={endDateTitle} />);

        expect(component).toMatchSnapshot();
    });

    /*Test below includes potential logic*/
    // it('should update state when start and end dates are selected', () => {
    //     const string = 'generic-id';
    //     const component = mount(<Calendar/>);

    //     component
    //         .find('input#generic-id')
    //         .simulate('click')
    //         .find('div.DayPickerInput')
    //         .find(div.DayPickerInput-OverlayWrapper)
    //         .find('relatedDateID')
    //         .simulate('click');
    //     expect(component.state('start_date')).toEqual();
    //     component.unmount();
    // });
});
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import ExpenseTrainee from '../expenses-trainee.component';

Enzyme.configure({adapter: new Adapter()})

let component;
let props = {match:{params:{id:'5d0bb39bd2ba63099c621593'}}};

beforeEach(() => {
    component = mount(<ExpenseTrainee {...props}/>);
});


describe('render testing', () => {
    it('renders correctly when there are no items', () => {
        // resolve, status, id
        expect(toJson(component)).toMatchSnapshot();
    });

    it('checking if labels are correctly rendered if other is not selected', () => {
        expect(component.find('label')).toHaveLength(2);
    });

    it('checking if additional label is correctly rendered', () => {
        component.setState({
            other: true
        });
        expect(component.find('label')).toHaveLength(3);
    });

    it('checking if add and back buttons are rendered', () => {
        expect(component.find('Button')).toHaveLength(2);
    });
})

describe('testing functions', ()=>{
    it('check that componentDidMount has been called', () => {
        const spy = jest.spyOn(ExpenseTrainee.prototype, 'componentDidMount');
        const wrapper = mount(<ExpenseTrainee {...props}/>);
        wrapper.instance().componentDidMount();
        expect(spy).toBeCalled();
    })

    it('check clearAll function empties', () => {
        const wrapper = shallow(<ExpenseTrainee {...props}/>);
        const onClickSpy = jest.spyOn(wrapper.instance(), "clearAll");
        wrapper.instance().clearAll();
        expect(onClickSpy).toHaveBeenCalled();
        expect(wrapper.state().expArray).toEqual([]);
    });

    it('check otherAdd function adds into', () => {
        const e = { target: {value: "Test"} };
        const onClickSpy = jest.spyOn(component.instance(), "onOtherAdd");
        component.instance().onOtherAdd(e);
        expect(onClickSpy).toHaveBeenCalled();
        expect(component.state().expenseType).toEqual("Other(Test)");
    })

    it('checks onSelect function changes state when state: false', () => {
        const e = { target: {value: "Other(Test)"} };
        const onClickSpy = jest.spyOn(component.instance(), "onSelect");
        component.instance().onSelect(e);
        expect(onClickSpy).toHaveBeenCalled();
        expect(component.state().other).toEqual(false);
        expect(component.state().expenseType).toEqual(e.target.value);
    })

    it('checks onSelect function changes state when state: true', () => {
        const e = { target: {value: "Other"} };
        const onClickSpy = jest.spyOn(component.instance(), "onSelect");
        component.instance().onSelect(e);
        expect(onClickSpy).toHaveBeenCalled();
        expect(component.state().other).toEqual(true);
        expect(component.state().expenseType).toEqual("Other");
    })

    it('checks onChange function', () => {
        const e = { target: {value: 100} };
        const onClickSpy = jest.spyOn(component.instance(), "onChange");
        component.instance().onChange(e);
        expect(onClickSpy).toHaveBeenCalled();
        expect(component.state().monthly_expenses).toEqual(100);
    })

    it('checks onSave function is called when button pressed', () => {
        const onClickSpy = jest.spyOn(component.instance(), "onSave");
        component.setState({
            expenseType: 'Taxi',
            monthly_expenses: 32.40
        })
        component.find('#createExpenseBtn').at(0).simulate('click');
        expect(onClickSpy).toHaveBeenCalled();
    })

})
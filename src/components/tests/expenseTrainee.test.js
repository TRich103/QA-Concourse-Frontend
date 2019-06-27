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
    component = shallow(<ExpenseTrainee {...props}/>);
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

    // it('checking if additional label is correctly rendered', () => {
    //     const clickCallback = sinon.spy();
    //     const actualNode = shallow(<ExpenseTrainee {...props} onSave={clickCallback} />);
    //     actualNode.setState({
    //         other: true
    //     })
    //     // WHEN
    //     actualNode.find("#createExpenseBtn").at(0).simulate("click");
    //     // THEN
    //     sinon.assert.called(clickCallback);
    // });
})
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import ExpenseTrainee from '../expenses-trainee.component';

Enzyme.configure({adapter: new Adapter()})

const testValues = {
}

it('renders correctly when there are no items', () => {
// resolve, status, id
    const component = shallow(<ExpenseTrainee/>);
    expect(toJson(component)).toMatchSnapshot();

});

it('checking onChange functions', () => {
    const mockCallBack = jest.fn("");
    const component = mount(<ExpenseTrainee onSave={mockCallBack}/>);

    component.find('#createExpenseBtn').at(1).simulate('click');
    expect(mockCallBack).toHaveBeenCalledTimes(0);
});

it('checking if button that was added renders', () => {
    const component = mount(<ExpenseTrainee/>);
    expect(component.dive().find('.actionBtn').exists()).toBe(true);
})




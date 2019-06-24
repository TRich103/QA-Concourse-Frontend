import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import CreateTrainee from '../create-trainee.component';

Enzyme.configure({adapter: new Adapter()})

const testValues = {
}

// it('renders correctly when there are no items', () => {
// // resolve, status, id
//     const component = mount(<CreateTrainee/>);
//     expect(toJson(component)).toMatchSnapshot()

//     expect(wrapper.state().data).toBe('state1');
//     wrapper.find('button').simulate('click');
//     expect(wrapper.state().data).toBe('state2');
// });

it('renders correctly when there are no items', () => {
    // resolve, status, id
        const component = shallow(<CreateTrainee/>);
        expect(toJson(component)).toMatchSnapshot();
    });

it('checking onChange functions', () => {
    const mockCallBack = jest.fn("");
    const component = mount(<CreateTrainee onSubmit={mockCallBack}/>);

    component.find('#createTraineeBtn').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(0);
});




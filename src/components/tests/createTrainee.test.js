import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import CreateTrainee from '../create-trainee.component';

Enzyme.configure({adapter: new Adapter()})

let wrapper;

beforeEach(() => {
    wrapper = shallow(<CreateTrainee/>);
});

describe('Create trainee render tests', ()=>{
    it('renders correctly when there are no items', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    
    it('checking that input input are rendered', () => {
        expect(wrapper.find('input')).toHaveLength(11);
    });

    it('checking that labels are all rendered', () => {
        expect(wrapper.find('label')).toHaveLength(20);
    })

    it('checking that button is rendered', () => {
        expect(wrapper.find('#createTraineeBtn')).toHaveLength(1);
    })

    it('checking that collapse component is rendered', () => {
        expect(wrapper.find('Collapse')).toHaveLength(2);
    })
})




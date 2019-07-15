import React from 'react';
import Enzyme,{mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Overlay from './overlay.component';

Enzyme.configure({adapter: new Adapter()});

//Testing that close button changes state of overlay

describe('Overlay', () => {
    it ('should close when close button clicked', () => {
        const component = mount(<Overlay debug />);
        const closebutton = component.find('.close-btn').first();
        closebutton.simulate('click');
        expect(component.state('showModal')).toBeFalsy();
});
});

// Testing that clicking backdrop changes state of overlay

describe('Overlay', () => {
    it ('should close when backdrop clicked', () => {
        const component = mount(<Overlay debug />);
        const backdrop = component.find('.backdrop-style').first();
        backdrop.simulate('click');
        expect(component.state('showModal')).toBeFalsy();
});
});
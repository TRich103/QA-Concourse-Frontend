import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme,{shallow, mount, render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Nav from '../src/Navigation.js';
import 'babel-polyfill';

Enzyme.configure({adapter: new Adapter()})

let wrapper;

beforeEach(() => {
    wrapper = mount(<Nav/>);
    wrapper.setState({currentUser: {token: {role: "admin"}}})
});

describe("Logo Colour is correct for Admin", () => {
    it('Class for admin exists', () => {
        expect(wrapper.find('.logo-colour-admin').toBe(true));
    });

    it('background colour for the logo is purple', () => {
        let containerStyle =
        expect(wrapper.find(wrapper.find('.logo-colour-admin').prop('style')).toHaveProperty('backgroundColor','#ff00ff'));
    });
})
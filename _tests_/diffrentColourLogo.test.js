import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme,{shallow, mount, render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Nav from '../src/Navigation.js';
import 'babel-polyfill';
import expect from 'expect';

Enzyme.configure({adapter: new Adapter()})

let wrapper;


beforeEach(() => {
        wrapper = mount(<Nav/>);
        wrapper.setState({state:{currentUser: {token: {role: "admin"}}}});

});

describe("Logo Colour is correct for Admin", () => {
    it('State token role is admin', () => {
        expect((wrapper.find('.admin')).exists("admin"));
    });
    it('Class for admin exists', () => {
        expect(wrapper.exists('.logo-colour-admin'));
    });
    it('Class for finance does not exists', () => {
            expect(!wrapper.exists('.logo-color-finance'));
        });
})
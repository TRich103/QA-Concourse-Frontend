import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import renderer from 'react-test-renderer';
import Navigation from './header.component';
import { myConfig } from './component-map';
import { exportAllDeclaration } from '@babel/types';
import { authService } from "./modules/authService";
import sinon from "sinon";

configure({ adapter: new Adapter() });


describe('Header', () => {

    it('should render with "Logout" if user is defined', () => {

        let component = shallow(<Navigation />);

        component.setState({
            currentUser: {
                token: {
                    exp: 1562606357,
                    iat: 1562596277,
                    role: "admin",
                    status: "Active",
                    _id: "5d0a7134d1a499765385ee9f"
                }
            }
        });

        expect(component).toMatchSnapshot();

    });

    it('should render with "Login" if user is null', () => {

        let component = shallow(<Navigation />);

        component.setState({ currentUser: null });

        expect(component).toMatchSnapshot();
    });


    it('should display correct user name', () => {

        let component = shallow(<Navigation />);

        component.setState({
            currentUser: {
                token: {
                    exp: 1562606357,
                    iat: 1562596277,
                    role: "admin",
                    status: "Active",
                    _id: "5d0a7134d1a499765385ee9f"
                }
            }
        });

        component.setState({
            staff_fname: 'Test',
            staff_lname: 'Account'
        });



        expect(component).toMatchSnapshot();
    });



    it('name of user is set on mount', async () => {

        const spy = jest.spyOn(Navigation.prototype, 'componentDidMount');
        const component = mount(<Navigation />);

        component.setState({
            currentUser: {
                token: {
                    exp: 1562606357,
                    iat: 1562596277,
                    role: "admin",
                    status: "Active",
                    _id: "5d0a7134d1a499765385ee9f"
                }
            }
        });
        await component.update();
        component.instance().componentDidMount();
        expect(spy).toHaveBeenCalled();
        // expect(component.state().staff_fname).toEqual("Main")
        component.unmount();
        spy.mockClear();
    });

    it('page redirects for bad credentials', () => {
        const component = mount(<Navigation />);
        component.setState({
            currentUser: {
                token: {
                    exp: 1562606357,
                    iat: 1562596277,
                    role: "admin",
                    status: "Active",
                    _id: "1234"
                }
            }
        });
        
        expect(component).toMatchSnapshot();
        component.unmount();

    });

    it('should component should return null if user is null', () => {


        const spy = jest.spyOn(Navigation.prototype, 'componentDidMount');
        const component = mount(<Navigation />);
        component.setState({
            currentUser: null
        });
        component.instance().componentDidMount();
        expect(component.state('currentUser')).toEqual(null);
        component.unmount();
        spy.mockClear();

    });

    it('should logout', () => {
        const spy = jest.spyOn(Navigation.prototype, 'logout');
        const component = mount(<Navigation />);

        component.setState({
            currentUser: {
                token: {
                    exp: 1562606357,
                    iat: 1562596277,
                    role: "admin",
                    status: "Active",
                    _id: "5d0a7134d1a499765385ee9f"
                }
            }
        });
        component.find('#logoutBtn').first().simulate('click');


        expect(spy).toHaveBeenCalled();

        component.unmount();
    });

    it('should login', () => {
        const spy = jest.spyOn(Navigation.prototype, 'login');
        const component = mount(<Navigation />);

        component.setState({currentUser: null});
        component.find('#loginBtn').first().simulate('click');

        expect(spy).toHaveBeenCalled();

        component.unmount();

    });

});




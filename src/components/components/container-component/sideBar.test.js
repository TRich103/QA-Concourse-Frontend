import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import renderer from 'react-test-renderer';
import SideBar from './sideBar.component';
import { myConfig } from './component-map';

configure({ adapter: new Adapter() });

describe('Side Bar', () => {

    it('should render the side bar with admin links when role is admin', () => {
        const testRole = 'admin';

        const component = shallow(<SideBar role={testRole} links={myConfig}/>);

        expect(component).toMatchSnapshot();
    });

    it('should render the sidebar with recruiter links when role is recruiter', () => {
        const testRole = 'recruiter';

        const component = shallow(<SideBar role={testRole} links={myConfig}/>);

        expect(component).toMatchSnapshot();
    });

   
});
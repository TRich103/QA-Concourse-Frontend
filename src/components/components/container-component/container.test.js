import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import renderer from 'react-test-renderer';
import Container from './container.component';
import NavBarr from './navbar.component'
import Header from './header.component'
import { myConfig } from './component-map';

configure({ adapter: new Adapter() });

describe('Container', () => {

    it('should render the side bar with admin links when role is admin', () => {
        const testRole = 'admin';

        const ContainerNoRole = mount(<Container role='' links={myConfig}/>);
        expect(ContainerNoRole).toMatchSnapshot();

        const ContainerWithRole = mount(<Container role={testRole} links={myConfig}/>);
        expect(ContainerWithRole).toMatchSnapshot();
        const { content } = ContainerWithRole.find(NavBarr).props()
        content(<div>Hello World!</div>)
        expect(ContainerWithRole.state().content).toEqual(<div>Hello World!</div>);
    });   
});
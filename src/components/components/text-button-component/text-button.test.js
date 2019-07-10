import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme,{shallow, mount, render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import renderer from 'react-test-renderer';
import TextButton from './text-button.component';
import { Button, ButtonGroup } from 'reactstrap';

configure({ adapter: new Adapter() });

const clickFn = jest.fn();

describe('TextButton', () => {

  it('should be disabled when disabled is set to true', () => {
    const boolean = true;
    
    const component = shallow(<TextButton disabled={boolean} />);
  
    expect(component).toMatchSnapshot();
  });

  it('should render button text correctly with given string', () => {
    const string = 'Click Me';
    
    const component = shallow(<TextButton text={string}/>);
  
    expect(component).toMatchSnapshot();
  });

  it('button click should call function', () => {
    const string = 'my-button';
      const component = mount(<TextButton id={string} onClick={clickFn}  />);
      
      component
        .find('button#my-button')
        .simulate('click');
      expect(clickFn).toHaveBeenCalled();
      component.unmount(); 
    });
});


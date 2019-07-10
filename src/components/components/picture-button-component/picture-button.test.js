import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme,{shallow, mount, render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import renderer from 'react-test-renderer';
import PictureButton from './picture-button.component';
import Image from './images/qa-image.png';
import './css/image.css'

configure({ adapter: new Adapter() });

describe('TextButton', () => {


  it('image click should call function', () => {
    const string = 'picture-button';
    const clickFn = jest.fn();

      const component = mount(<PictureButton id={string} onClick={clickFn}  />);
      
      component
        .find('img#picture-button')
        .simulate('click');
      expect(clickFn).toHaveBeenCalled();
      component.unmount(); 
    });

    it('should match the inline CSS passed into the style', () => {
        const imageStyle = {
            maxHeight: 360,
            maxWidth: 360
        }
        
        const component = shallow(<PictureButton style={imageStyle}/>);
      
        expect(component).toMatchSnapshot();
      });

      it('should be the image passed', () => {
        
        const image = '../images/square.jpg';
        
        const component = shallow(<PictureButton image={image}/>);
      
        expect(component).toMatchSnapshot();
      });

      it('should possess the id that has been passed', () => {
        
        const imageID = 'img';
        
        const component = shallow(<PictureButton id={imageID}/>);
      
        expect(component).toMatchSnapshot();
      });

});
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

it('renders without crashing', () => {
  const component = shallow(<App/>);
  expect(toJson(component)).toMatchSnapshot();
});

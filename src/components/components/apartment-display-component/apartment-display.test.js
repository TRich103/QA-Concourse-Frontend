import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ApartmentDisplay from './apartment-display.component';
import toJson from 'enzyme-to-json';
import apartment1 from './apartment.jpg'
import { Media } from 'reactstrap';

Enzyme.configure({adapter: new Adapter()})

describe('Apartment Display component', () =>{

  var heading = "Test Heading"
  var body = "Test Body"
  var img = apartment1

  //Creates snapshot of desired display
  test('renders desired display', () => {
    var imgStyle = {
        maxWidth: "256px",
        maxHeight: "256px",
        paddingRight : "10%",
        paddingTop: "1%"
      };
      
      var padding ={
        padding: "1%"
      }

      const display = mount(
        <div style={padding}>
            <Media>
            <Media left href="#">
            <Media style={imgStyle} object src={img}/>
            </Media>
            <Media body>
            <Media heading>
                {heading}
            </Media>
                {body}
            </Media>
        </Media>
        </div>
      )
    expect(toJson(display)).toMatchSnapshot()
  })

  //Checks if QATable component matches desired table
  test('Apartment display matches desired outcome', () => {
    const display = mount(
        <ApartmentDisplay
            heading = {heading}
            img = {apartment1}
            body = {body}
        />
    )
    expect(toJson(display)).toMatchSnapshot()
  })

})
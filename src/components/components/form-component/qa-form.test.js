import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import QAForm from './qa-form.component'
import { Button, Form } from 'react-bootstrap';

Enzyme.configure({ adapter: new Adapter() })

const formData = [
    { "FieldText": "Name", "Type": "text", "UniqueID": "formnamefield" },
    { "FieldText": "Choose a fruit", "Type": "select", "UniqueID": "formfruitfield", "Options": ["Apple", "Banana", "Pear", "Orange", "Grape"] },
    { "FieldText": "Which country do you like the most?", "Type": "radio", "UniqueID": "formcountryfield", "Options": ["UK", "Germany", "Russia", "USA"] },
    { "FieldText": "Which animals are cool?", "Type": "checkbox", "UniqueID": "formanimalfield", "Options": ["Tigers", "Penguins", "Gorillas", "Wolves"] }
];

describe('Form component', () => {

    test('renders', () => {
        let formholderStyle = {padding:'2vh'};

        const form = shallow(

            <div style={formholderStyle}>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control id="formnamefield" type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Choose a fruit</Form.Label>
                        <select id="formfruitfield" class="form-control">
                            <option>Apple</option>
                            <option>Banana</option>
                            <option>Pear</option>
                            <option>Orange</option>
                            <option>Grape</option>
                        </select>
                    </Form.Group>

                    <div>
                        <Form.Label>Which country do you like the most?</Form.Label>
                        <Form.Check type="radio" label="UK" name="2" id="formcountryfield0" />
                        <Form.Check type="radio" label="Germany" name="2" id="formcountryfield1" />
                        <Form.Check type="radio" label="Russia" name="2" id="formcountryfield2" />
                        <Form.Check type="radio" label="USA" name="2" id="formcountryfield3" />
                    </div>

                    <div>
                        <Form.Label>Which animals are cool?</Form.Label>
                        <Form.Check type="checkbox" label="Tigers" name="3" id="formanimalfield0" />
                        <Form.Check type="checkbox" label="Penguins" name="3" id="formanimalfield1" />
                        <Form.Check type="checkbox" label="Gorrillas" name="3" id="formanimalfield2" />
                        <Form.Check type="checkbox" label="Wolves" name="3" id="formanimalfield3" />
                    </div>

                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
                <hr></hr>
            </div>

        )
        expect(toJson(form)).toMatchSnapshot()
    });

    //Checks if QAForm component matches desired form
    test('Populates data from props', () => {
        const form = shallow(<QAForm data={formData} />);
        expect(toJson(form)).toMatchSnapshot()
    });


    test('Input text data to form', () => {
        const form = mount(<QAForm data={formData} />);
        const namefield = form.find("#formnamefield").at(1);
        namefield.instance().value = 'Joe Bloggs';
        namefield.simulate('change');
        expect(form.state().formData["Name"]).toEqual('Joe Bloggs');
        form.unmount();
    });


    test('Input select data to form', () => {
        const form = mount(<QAForm data={formData} />);
        const fruitfield = form.find("#formfruitfield");
        fruitfield.instance().value = 'Apple';
        fruitfield.simulate('change');
        expect(form.state().formData["Choose a fruit"]).toEqual('Apple');
        form.unmount();
    });

    test('Input radio data to form and then change selection', () => {
        const form = mount(<QAForm data={formData} />);
        const countryfield = form.find("#formcountryfield0").at(1);
        countryfield.simulate('click');
        countryfield.simulate('change');
        expect(form.state().formData["Which country do you like the most?"]).toEqual('UK');
        const countryfield2 = form.find("#formcountryfield1").at(1);
        countryfield2.simulate('click');
        countryfield2.simulate('change');
        expect(form.state().formData["Which country do you like the most?"]).toEqual('Germany');
        form.unmount();
    });


    // test('Input checkbox data to form', () => {
    //     const form = mount(<QAForm data={formData} />);
    //     const animalfield = form.find("#formanimalfield0").at(1);
    //     animalfield.simulate('click');
    //     animalfield.simulate('change');
    //     expect(form.state().formData["Which animals are cool?"]).toEqual(['Tigers',]);
    //     form.unmount();
    // });

})
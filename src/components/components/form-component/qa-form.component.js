import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default class QAForm extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeEvent = this.onChangeEvent.bind(this);

        this.state = {
            inputFieldInfo: [],
            data: [],
            formData: {},
            submit: this.props.submit
        };
    }

    componentDidMount() {
        this.setData(this.props.data);
        this.setSubmitFunction(this.props.submit)
    }

    componentWillReceiveProps(nextProps) {
        this.setData(nextProps.data);
    }

    setSubmitFunction(sub){
        this.setState({submit:sub})
    }

    setData(info) {

        let inputFieldNum = [];

        for (let i = 0; i < info.length; i++) {
            inputFieldNum.push(<td>{info[i].Type}</td>)
        }



        this.setState({
            inputFieldInfo: inputFieldNum,
            data: info
        })
    }


    createForm = () => {
        let form = [];

        for (let i = 0; i < this.state.inputFieldInfo.length; i++) {
            if (this.state.data[i].Type === "select") {
                let child = []

                for (let j = 0; j < this.state.data[i].Options.length; j++) {
                    child.push(<option>{this.state.data[i].Options[j]}</option>)
                }
                form.push(
                    <Form.Group>
                        <Form.Label>{this.state.data[i].FieldText}</Form.Label>
                        <select id={this.state.data[i].UniqueID} className="form-control" onChange={this.onChangeEvent}>
                            {child}
                        </select>
                    </Form.Group>)

            } else 
            if (this.state.data[i].Type === "textarea") {
                form.push(
                    <Form.Group>
                        <Form.Label>{this.state.data[i].FieldText}</Form.Label>
                        <Form.Control id={this.state.data[i].UniqueID} as={this.state.data[i].Type} rows={this.state.data[i].Rows} onChange={this.onChangeEvent}></Form.Control>
                    </Form.Group>)
            } else if (this.state.data[i].Type === "checkbox") {
                let child = []

                for (let j = 0; j < this.state.data[i].Options.length; j++) {
                    child.push(<Form.Check type={this.state.data[i].Type} label={this.state.data[i].Options[j]} name={i} id={`${this.state.data[i].UniqueID}${j}`} onClick={this.onChangeEvent} />)
                }
                form.push(<div>
                    <Form.Label>{this.state.data[i].FieldText}</Form.Label>
                    {child}

                </div>)
            } else if (this.state.data[i].Type === "radio") {
                let child = []

                for (let j = 0; j < this.state.data[i].Options.length; j++) {
                    child.push(<Form.Check type={this.state.data[i].Type} label={this.state.data[i].Options[j]} name={i} id={`${this.state.data[i].UniqueID}${j}`} onChange={this.onChangeEvent} />)
                }
                form.push(<div>
                    <Form.Label>{this.state.data[i].FieldText}</Form.Label>
                    {child}

                </div>)
            } else {
                form.push(
                    <Form.Group>
                        <Form.Label>{this.state.data[i].FieldText}</Form.Label>
                        <Form.Control id={this.state.data[i].UniqueID} type={this.state.data[i].Type} onChange={this.onChangeEvent}></Form.Control>
                    </Form.Group>)
            }

        }
        return form;
    }



    onChangeEvent(e) {

        let newState = this.state.formData;
        let fieldIds = []

        if(Object.keys(this.state.formData).length === 0){
            this.state.data.forEach(element =>{if(element["Type"]==="select"){newState[element["FieldText"]]=element.Options[0]}});
        }

        this.state.data.forEach(element => {
            if (element["Options"] === undefined || element["Type"] === "select") {
                fieldIds.push(element["UniqueID"]);
            } else {
                for (let j = 0; j < element["Options"].length; j++) {
                    fieldIds.push(`${element["UniqueID"]}${j}`)
                }
            }

        });

        fieldIds.forEach(id => {
            if (e.target.getAttribute("id") === id) {

                let newStateEntry;
                this.state.data.forEach(element => {
                    if (id.includes(element["UniqueID"])) {
                        newStateEntry = element["FieldText"];
                        if (e.target.getAttribute("type") === "radio") {
                            let optionIndex = parseInt(id.replace(element["UniqueID"], ''));
                            newState[newStateEntry] = element.Options[optionIndex];
                        } else if (e.target.getAttribute("type") === "checkbox") {
                            if (newState[newStateEntry] === undefined) { newState[newStateEntry] = [] };
                            let optionIndex = parseInt(id.replace(element["UniqueID"], ''));
                            if (e.target.checked) { 
                                newState[newStateEntry].push(element.Options[optionIndex]);
                            }
                            else if (e.target.checked === false) {
                                let filteredArray = newState[newStateEntry].filter(item => item !== element.Options[optionIndex]);
                                newState[newStateEntry] = filteredArray;
                             }
                        }
                        else {
                            newState[newStateEntry] = e.target.value;
                        }
                    }
                })
            }
        });

        //console.log(newState);

        this.setState({
            formData: newState
        });
    }

    render() {
        return (
            <div>
                <Form>
                    {this.createForm()}
                    <hr></hr>
                    <Button variant="primary" type="button" onClick={() => { this.state.submit(this.state.formdata) }}>
                        Submit
                    </Button>
                </Form>
            </div>
        );

    }
}

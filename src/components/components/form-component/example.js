import React from "react";
import QAForm2 from "./qa-form.component";

export default class Example extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [{"FieldText": "Name", "Type": "text" , "UniqueID": "formnamefield"},
            { "FieldText": "Choose a fruit", "Type": "select", "UniqueID": "formfruitfield", "Options": ["Apple", "Banana", "Pear", "Orange", "Grape"] },
            {"FieldText": "Which country do you like the most?", "Type": "radio" , "UniqueID": "formcountryfield", "Options":["UK","Germany","Russia","USA"]},
            { "FieldText": "Which animals are cool?", "Type": "checkbox", "UniqueID": "formanimalfield", "Options": ["Tigers", "Penguins", "Gorillas", "Wolves"] },
            // { "FieldText": "Enter password", "Type": "password", "UniqueID":"formpasswordfield" },
            // { "FieldText": "Email address", "Type": "email", "UniqueID":"formemailfield" },
            // { "FieldText": "Date to start", "Type": "date", "UniqueID":"formdatefield" },
            // { "FieldText": "Pick a colour", "Type": "color", "UniqueID":"formcolorfield" },
            // { "FieldText": "Cost", "Type": "number", "UniqueID":"formcostfield" },
            // { "FieldText": "Write a Story", "Type": "textarea", "Rows": "3", "UniqueID":"formstoryfield" }
        ]
        }
    }

    render() {

        let submitfunc = function(x){console.log(x)}

        let json = this.state.data

        return (
            <div>
                <QAForm2 data={json} submit={submitfunc}/>
            </div>
        );
    };
};

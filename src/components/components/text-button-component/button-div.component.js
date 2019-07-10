import React from "react";
import TextButton from './text-button.component';
import './css/button.css'

export default class ButtonDiv extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            disabled: false
        };
    }

    myFunc = () => {
        this.setState({
            disabled: true
          });
        console.log("Hello");
    }

    render() {
        return (
            <div>
                <h2>QA Text Button Component</h2>
                <TextButton
                    id="Btn"
                    type=""
                    onClick={this.myFunc}
                    disabled={this.state.disabled}
                    text={"Click Me"}
                    /> <br/>
                    <h6>Button click will disable button and print message in console</h6>
            </div>
        );
    };
};

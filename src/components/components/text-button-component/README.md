# QA-text-button

A text button that populates with props passed in from parent component. Text button component location: /src/components/text-button.component.js


### Text Button Attributes
The component consists of the following attributes:

"id" - the css id that should be applied to the button.<br />
"type" - the type of button e.g. button, submit or reset.<br />
"onClick" - the function that should be called when the button is clicked.<br />
"disabled" - an attribute which assess a boolean value to determine if the button should be enabled or disabled.

Example use of button in a <b>parent</b> component which can be found in full detail at /src/components/button-div.component.js:

```
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
                <TextButton
                    id="Btn"
                    type=""
                    onClick={this.myFunc}
                    disabled={this.state.disabled}
                    text={"Click Me"}
                    />
            </div>
        );
    };
    
    
```
For the button to be disabled a prop named "disabled" needs to be added in the state. This state can then be used in the assigned onClick function to dictate when in the processing of that function the button should be disabled and if it should remained disabled.


### Dependencies
Inside package.json "dependencies"

    "react-bootstrap": "^1.0.0-beta.9"


### Demo Deployment

-Open a command window in root Git directory and run:

```
npm install
npm start
```

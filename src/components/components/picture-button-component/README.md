# QA-picture-button

A picture button that populates with props passed in from parent component. Picture button component location: /src/components/picture-button.component.js


### Picture Button Attributes
The component consists of the following attributes:

"id" - the css id that should be applied to the button.<br />
"title" - hover text for the image.<br />
"src" - the file location of the image.<br />
"onClick" - the function that should be called when the button is clicked.<br />
"style" - additional inline css


Example use of picture button in a <b>parent</b> component which can be found in full detail at /src/components/button-div.component.js:

```
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    myFunc() {
        console.log("Hello");
    }

    render() {
        const imageStyle = {
            maxHeight: 360,
            maxWidth: 360
        }

        return (
            <div className="col-xs-10 col-xs-offset-1">
                <PictureButton
                id="img"
                title={"Hover text"}
                image={Image}
                onClick={this.myFunc}
                style={imageStyle}
                />
            </div>
        );
    };
    
    
```
### Dependencies
Inside package.json "dependencies"

    "react-bootstrap": "^1.0.0-beta.9"


### Demo Deployment

-Open a command window in root Git directory and run:

```
npm install
npm start
```

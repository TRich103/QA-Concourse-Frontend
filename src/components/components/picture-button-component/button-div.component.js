import React from 'react';
import PictureButton from './picture-button.component';
import Image from './images/qa-image.png'
import './css/image.css'

export default class PictureButtonDiv extends React.Component {

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
            maxWidth: 360,
            cursor: 'pointer'
        }

        return (
            <div>
                <h2>QA Picture Button Component</h2>
                <div className="col-xs-10 col-xs-offset-1">
                    <PictureButton
                        id="img"
                        title={"Hover text"}
                        image={Image}
                        onClick={this.myFunc}
                        style={imageStyle}
                    />
                </div>
                <h6>Click Image to print Hello to console</h6>
            </div>
        );
    };
};

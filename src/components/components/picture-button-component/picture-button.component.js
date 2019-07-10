import React, { Component } from 'react';
import Image from 'react-bootstrap/Image'

export default class PictureButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }
    
    render() {
        const imageStyle = {
            maxHeight: 128,
            maxWidth: 128,
            cursor: 'pointer'
        }
        return (
            <div>
                <Image
                id={this.props.id}
                title={this.props.title}
                src={this.props.image} 
                onClick={this.props.onClick} 
                style={ this.props.style ? this.props.style : imageStyle} />
            </div>
        );
    };
};


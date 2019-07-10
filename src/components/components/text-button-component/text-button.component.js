import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

export default class TextButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div>
                <ButtonGroup>
                    <Button
                        id={this.props.id}
                        type={this.props.type}
                        onClick={this.props.onClick}
                        disabled={this.props.disabled}>
                        {this.props.text}
                    </Button>
                </ButtonGroup>
            </div>

        );
    };
};


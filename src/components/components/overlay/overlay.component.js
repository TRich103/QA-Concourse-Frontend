import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './css/QAOverlay.css';


class Overlay extends Component {
    constructor(...args) {
        super(...args);
        this.state = { showModal: true, content: this.props.content, title:this.props.title };

        this.close = () => {
            this.setState({ showModal: false });
        };

        this.open = () => {
            this.setState({ showModal: true });
        };
    }

  
    render() {
        return (
                <Modal
                    show={this.state.showModal}
                    onHide={this.close}
                    backdrop={true}
                    backdropClassName ="backdrop-style"
                    dialogClassName="modal-style"
                    aria-labelledby="modal-label"
                >

                <Modal.Header closeButton={true}>
                <h4 id="modal-label" className="overlay-title">{this.state.title}</h4>
                </Modal.Header>

                <Modal.Body>
                {this.state.content}
                </Modal.Body>

                <Modal.Footer>                <button
                    className='close-btn'
                    onClick={this.close}
                >Close</button><br></br></Modal.Footer>
                </Modal>
        );
    }
}

export default Overlay;
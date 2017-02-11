import React, { Component, PropTypes } from 'react';
import {Button, Modal} from 'react-bootstrap';

export default class Modal {
    constructor(props) {
        super(props);

        this.state = {
            showModal: props.showModal || false
        }
    }

    close = () => {
        this.setState({ showModal: false });
    }

    open= () => {
        this.setState({ showModal: true });
    }

    render() {
        return <div>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { this.props.children }
                </Modal.Body>
            </Modal>
        </div>
    }
}
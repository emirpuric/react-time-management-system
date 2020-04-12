import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const MessageModal = ({ show, header, message, onHide: resetState }) => {
    const handleClose = () => {
        resetState({ show: false, header: null, message: null });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MessageModal;
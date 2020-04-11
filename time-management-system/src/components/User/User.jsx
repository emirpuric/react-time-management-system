import React, { useCallback, useState } from 'react';
import { useUsernameInput, usePasswordInput } from '../../hooks/input-hook'
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MessageModal from '../MessageModal/MessageModal';

const User = (props) => {
    const userId = props.match.params.id;
    const title = userId ? 'Edit a user' : 'Create a new user';

    const history = useHistory();
    const onCancel = useCallback(() => {
        history.push('/users');
    }, [history]);

    const [messageState, setMessageState] = useState({ show: false, header: null, message: null });

    const onSave = useCallback((event) => {
        event.preventDefault();
        setMessageState({ show: true, header: 'Success', message: 'New user saved!' });
    }, [messageState]);
    
    return (
        <div className="Form-wrapper">
            <h3>{ title }</h3>

            <Form className="Home-form" onSubmit={onSave}>
                <div className="row">
                    <div className="col-6">
                        <Form.Group controlId="formUsername">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" />
                            <Form.Text className="text-muted Alert"></Form.Text>
                        </Form.Group>
                    </div>

                    <div className="col-6">
                        <Form.Group controlId="formUsername">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" />
                            <Form.Text className="text-muted Alert"></Form.Text>
                        </Form.Group>
                    </div>
                </div>

                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" />
                    <Form.Text className="text-muted Alert"> </Form.Text>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <Form.Group controlId="formPassConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <div className="Form-buttons">
                    <Button variant="secondary" className="float-left" onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button variant="primary" className="float-right" type="submit">
                        Save
                    </Button>
                </div>
            </Form>

            <MessageModal show={messageState.show} header={messageState.header} message={messageState.message} onHide={setMessageState} />
            
        </div>
    );
};

export default User;
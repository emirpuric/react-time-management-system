import React, { useState } from 'react';
import { useUsernameInput, usePasswordInput } from '../../hooks/input-hook';
import { Button, Form } from 'react-bootstrap';
import { login } from '../../api-client';
import MessageModal from '../MessageModal/MessageModal';

const Login = () => {
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [messageState, setMessageState] = useState({ show: false, header: null, message: null });

    const usernameInput = useUsernameInput('');
    const passwordInput = usePasswordInput('');

    const validateForm = () => {
        let valid = true;

        if (usernameInput.isDirty) {
            if (!usernameInput.value) {
                usernameInput.setValid(false, 'Field is required.');
                valid = false;
            } else if (!usernameInput.value.match(usernameInput.validationRules.regex)) {
                usernameInput.setValid(false, 'Invalid characters used');
                valid = false;
            } else {
                usernameInput.setValid(true);
            }
        }

        if (passwordInput.isDirty) {
            if (!passwordInput.value) {
                passwordInput.setValid(false, 'Field is required.');
                valid = false;
            } else if (!passwordInput.value.match(usernameInput.validationRules.regex)) {
                passwordInput.setValid(false, 'Invalid characters used');
                valid = false;
            } else {
                passwordInput.setValid(true);
            }
        }

        return valid;
    };

    const handleBlur = () => {
        let valid = validateForm();
        let formCompleted = usernameInput.isDirty && passwordInput.isDirty;
        let enable = valid && formCompleted;
        setSubmitDisabled(!enable);
    };

    const handleSubmit = event => {
        event.preventDefault();
        
        const credentials = {
            username: usernameInput.value,
            password: passwordInput.value,
        };

        const success = (resp) => {
            alert(JSON.stringify(resp));
        };

        const fail = (error) => {
            setMessageState({ show: true, header: 'Error occured', message: JSON.stringify(error.response) });
        };

        login(credentials, success, fail);
    };

    return (
        <div>
            <h3>Sign in</h3>
            
            <Form className="Home-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" {...usernameInput.bind} onBlur={handleBlur} />
                    <Form.Text className="text-muted Alert"> {usernameInput.errorMessage} </Form.Text>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" {...passwordInput.bind} onBlur={handleBlur} />
                    <Form.Text className="text-muted Alert"> {passwordInput.errorMessage} </Form.Text>
                </Form.Group>
                
                <Button variant="primary" type="submit" disabled={submitDisabled}>
                    Sign in
                </Button>
            </Form>

            <MessageModal show={messageState.show} header={messageState.header} message={messageState.message} onHide={setMessageState} />
        </div>
    );
}

export default Login;
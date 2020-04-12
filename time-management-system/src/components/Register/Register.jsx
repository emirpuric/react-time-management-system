import React, { useState, useContext } from 'react';
import { useUsernameInput, usePasswordInput, useRequiredInput } from '../../hooks/input-hook'
import { Button, Form } from 'react-bootstrap';
import { signup } from '../../api-client';
import MessageModal from '../MessageModal/MessageModal';
import { HomeContext, LOGIN } from '../../contexts';

const Register = () => {
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const firstNameInput = useRequiredInput('');
    const lastNameInput = useRequiredInput('');
    const usernameInput = useUsernameInput('');
    const passwordInput = usePasswordInput('');
    const confirmPassInput = usePasswordInput('');
    const showPage = useContext(HomeContext);

    const [messageState, setMessageState] = useState({ show: false, header: null, message: null });

    const validateForm = () => {
        let valid = true;

        if (firstNameInput.isDirty) {
            if (!firstNameInput.value) {
                firstNameInput.setValid(false, 'Field is required.');
                valid = false;
            } else {
                firstNameInput.setValid(true);
            }
        }

        if (lastNameInput.isDirty) {
            if (!lastNameInput.value) {
                lastNameInput.setValid(false, 'Field is required.');
                valid = false;
            } else {
                lastNameInput.setValid(true);
            }
        }

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

        if (confirmPassInput.isDirty) {
            if (confirmPassInput.value !== passwordInput.value) {
                confirmPassInput.setValid(false, 'Passwords not match');
                valid = false;
            } else {
                confirmPassInput.setValid(true);
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

    const handleSubmit = async event => {
        event.preventDefault();
        const user = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            username: usernameInput.value,
            password: passwordInput.value,
            passConfirm: confirmPassInput.value
        }

        const success = (resp) => {
            setMessageState({ show: true, header: 'User created', message: 'New user created. Please eneter credentials.' });
        };

        const fail = () => {
            setMessageState({ show: true, header: 'Error occured', message: 'User not created, please try again.' });
        };

        signup(user, success, fail);
    };

    const handleModalHide = () => {
        setMessageState({ show: false, header: null, message: null });
        showPage(LOGIN);
    };

    return (
        <div>
            <h3>Create an account</h3>
            
            <Form className="Home-form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-6">
                        <Form.Group controlId="formUsername">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" {...firstNameInput.bind} onBlur={handleBlur} />
                            <Form.Text className="Alert"> {firstNameInput.errorMessage} </Form.Text>
                        </Form.Group>
                    </div>

                    <div className="col-6">
                        <Form.Group controlId="formUsername">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" {...lastNameInput.bind} onBlur={handleBlur} />
                            <Form.Text className="Alert"> {lastNameInput.errorMessage} </Form.Text>
                        </Form.Group>
                    </div>
                </div>

                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" {...usernameInput.bind} onBlur={handleBlur} />
                    <Form.Text className="Alert"> {usernameInput.errorMessage} </Form.Text>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" {...passwordInput.bind} onBlur={handleBlur} />
                    <Form.Text className="Alert"> {passwordInput.errorMessage} </Form.Text>
                </Form.Group>

                <Form.Group controlId="formPassConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" {...confirmPassInput.bind} onBlur={handleBlur} />
                    <Form.Text className="Alert"> {confirmPassInput.errorMessage} </Form.Text>
                </Form.Group>
                
                <Button variant="primary" type="submit" disabled={submitDisabled}>
                    Sign up
                </Button>
            </Form>

            <MessageModal show={messageState.show} header={messageState.header} message={messageState.message} onHide={handleModalHide} />
        </div>
    );
}

export default Register;
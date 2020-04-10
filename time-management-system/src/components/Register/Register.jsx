import React, { useState, useEffect, useCallback } from 'react';
import { useUsernameInput, usePasswordInput } from '../../hooks/input-hook'
import { Button, Form } from 'react-bootstrap';

const Register = () => {
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const usernameInput = useUsernameInput('');
    const passwordInput = usePasswordInput('');
    const confirmPassInput = usePasswordInput('');
    const formFields = [usernameInput, passwordInput];

    const validateForm = useCallback(() => {
        let valid = true;

        for (let field of formFields) {
            if (!field.isDirty) {
                continue;
            }

            if (field.validationRules.regex && !field.value.match(field.validationRules.regex)) {
                field.setValid(false, 'Field is invalid');
                valid = false;
                continue;
            } else {
                field.setValid(true);
            }
        }

        return valid;
    });

    useEffect(() => {
        let valid = validateForm();
        let formCompleted = usernameInput.isDirty && passwordInput.isDirty;
        let enable = valid && formCompleted;
        setSubmitDisabled(!enable);
    });

    const handleSubmit = async event => {
        event.preventDefault();
        alert('Submit');
    };

    return (
        <div>
            <h3>Create an account</h3>
            
            <Form className="Home-form">
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
                    <Form.Control type="text" {...usernameInput.bind} />
                    <Form.Text className="text-muted Alert"> {usernameInput.errorMessage} </Form.Text>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <Form.Group controlId="formPassConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Sign up
                </Button>
            </Form>
        </div>
    );
}

export default Register;
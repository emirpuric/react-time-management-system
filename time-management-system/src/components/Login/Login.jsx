import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useUsernameInput, usePasswordInput } from '../../hooks/input-hook';
import { Button, Form } from 'react-bootstrap';
import { StateContext } from '../../contexts';
import { login } from '../../api-client';

const Login = () => {
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const stateContext = useContext(StateContext);

    const usernameInput = useUsernameInput('');
    const passwordInput = usePasswordInput('');

    const validateForm = useCallback(() => {
        let valid = true;

        for (let field of [usernameInput, passwordInput]) {
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
    }, [usernameInput, passwordInput]);

    useEffect(() => {
        let valid = validateForm();
        let formCompleted = usernameInput.isDirty && passwordInput.isDirty;
        let enable = valid && formCompleted;
        setSubmitDisabled(!enable);
    }, [validateForm, usernameInput.isDirty, passwordInput.isDirty]);

    const handleSubmit = event => {
        event.preventDefault();
        // login({ username: usernameInput.value, password: passwordInput.value }, resp => {
        //     alert(JSON.stringify(resp))
        // }, error => {
        //     alert(JSON.stringify(error.response))
        // });
        localStorage.setItem('current-user', {username: 'emirp'});
        stateContext.setCurrentUser({username: 'emirp'});
    };

    return (
        <div>
            <h3>Sign in</h3>
            
            <Form className="Home-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" {...usernameInput.bind} />
                    <Form.Text className="text-muted Alert"> {usernameInput.errorMessage} </Form.Text>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Sign in
                </Button>
            </Form>
        </div>
    );
}

export default Login;
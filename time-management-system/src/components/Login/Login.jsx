import React, { useState, useEffect, useCallback } from 'react';
import { useUsernameInput, usePasswordInput } from '../../hooks/input-hook'

const Login = () => {
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const usernameInput = useUsernameInput('');
    const passwordInput = usePasswordInput('');
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
            <h3>Login</h3>
            
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" {...usernameInput.bind} />
                    <div>{usernameInput.errorMessage}</div>
                </label>
                <label>
                    Password:
                    <input type="text" {...passwordInput.bind} />
                    <div>{passwordInput.errorMessage}</div>
                </label>
                <input type="submit" value="Submit" disabled={submitDisabled} />
            </form>
        </div>
    );
}

export default Login;
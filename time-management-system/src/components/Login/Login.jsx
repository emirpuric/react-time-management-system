import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useUsernameInput, usePasswordInput } from '../../hooks/input-hook';
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
        login({ username: usernameInput.value, password: passwordInput.value }, resp => {
            alert(JSON.stringify(resp))
        }, error => {
            alert(JSON.stringify(error.response))
        });
        //localStorage.setItem('current-user', {username: 'emirp'});
        //stateContext.setCurrentUser({username: 'emirp'});
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
import { useState } from 'react';

const ERROR_CLASS = 'Wrong-input';

const useInputBase = (initialValue, validationRules) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorClassName, setErrorClassName] = useState('');

    const setValid = (valid, errorMessage) => {
        setDirty(true);
        if (valid) {
            setErrorMessage('');
            setErrorClassName('');
            setIsValid(true);
        } else {
            setErrorMessage(errorMessage);
            setErrorClassName(ERROR_CLASS);
            setIsValid(false);
        }
    };

    return {
        value,
        isDirty,
        isValid,
        errorMessage,
        validationRules: validationRules,
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
                setDirty(true);
            },
            className: errorClassName
        },
        setValid: setValid
    };
}

export const useInput = initialValue => {
    const validationRules = { required: false };
    return useInputBase(initialValue, validationRules);
}

export const useUsernameInput = initialValue => {
    const validationRules = { required: true, regex: /^[a-zA-Z0-9]+$/ };
    return useInputBase(initialValue, validationRules);
}

export const usePasswordInput = () => {
    const validationRules = { required: true, regex: /^[a-zA-Z0-9]+$/ };
    return useInputBase('', validationRules);
}

export const useRequiredInput = initialValue => {
    const validationRules = { required: true };
    return useInputBase(initialValue, validationRules);
}
import { useState, useCallback } from 'react';

const ERROR_CLASS = 'Wrong-input';

const useInputBase = (initialValue, validationRules) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorClassName, setErrorClassName] = useState('');

    const setValid = useCallback((valid, errorMessage) => {
        setDirty(true);
        if (valid) {
            setErrorMessage('');
            setErrorClassName('');
        } else {
            setErrorMessage(errorMessage);
            setErrorClassName(ERROR_CLASS);
        }
    });

    return {
        value,
        isDirty,
        errorMessage,
        validationRules: validationRules,
        bind: {
            value,
            onChange: useCallback(event => {
                setValue(event.target.value);
                setDirty(true);
            }),
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
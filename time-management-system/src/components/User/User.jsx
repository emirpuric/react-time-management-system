import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useUsernameInput, usePasswordInput, useRequiredInput, useInput } from '../../hooks/input-hook'
import { Button, Form, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MessageModal from '../MessageModal/MessageModal';
import { StateContext, hasManagerRole, hasAdminRole } from '../../contexts';
import { getUser, updateUser, signup, deleteUser } from '../../api-client';
import './User.css';

const User = (props) => {
    const history = useHistory();
    const userId = props.match.params.id;
    const currentUser = useContext(StateContext).currentUser;
    
    if (!currentUser || (!hasManagerRole(currentUser.roles) && currentUser.id !== userId)) {
        history.push('/');
    }

    const adminUser = hasAdminRole(currentUser.roles);
    const [loader, setLoader] = useState(userId ? true : false);

    const title = userId ? 'Edit a user' : 'Create a new user';

    const firstNameInput = useRequiredInput('');
    const lastNameInput = useRequiredInput('');
    const usernameInput = useUsernameInput('');
    const passwordInput = usePasswordInput('');
    const confirmPassInput = usePasswordInput('');
    const preferredWorkingHoursPerDayInput = useInput('');
    const rolesInput = useInput('');

    useEffect(() => {
        if (userId) {
            getUser(userId, (resp) => {
                const user = resp.data;

                if (user) {
                    firstNameInput.setValue(user.firstName);
                    lastNameInput.setValue(user.lastName);
                    usernameInput.setValue(user.username);
                    preferredWorkingHoursPerDayInput.setValue(user.preferredWorkingHoursPerDay);
                    rolesInput.setValue(user.roles);
                    setLoader(false);
                } else {
                    history.push('/');
                }
            }, (error) => {
                history.push('/');
            });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onCancel = useCallback(() => {
        history.push('/users');
    }, [history]);

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
        } else {
            valid = false;
        }

        if (lastNameInput.isDirty) {
            if (!lastNameInput.value) {
                lastNameInput.setValid(false, 'Field is required.');
                valid = false;
            } else {
                lastNameInput.setValid(true);
            }
        } else {
            valid = false;
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
        } else {
            valid = false;
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
        } else {
            valid = false;
        }

        if (confirmPassInput.isDirty) {
            if (confirmPassInput.value !== passwordInput.value) {
                confirmPassInput.setValid(false, 'Passwords not match');
                valid = false;
            } else {
                confirmPassInput.setValid(true);
            }
        } else {
            valid = false;
        }

        return valid;
    };

    const handleBlur = () => {
        validateForm();
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const successMsg = userId ? 'User updated' : 'User created';
        const failMsg = userId ? 'Update a user failed.' : 'Create a new user failed.'
        const success = (resp) => {
            setMessageState({ show: true, header: title, message: successMsg });
        };

        const fail = () => {
            setMessageState({ show: true, header: title, message: failMsg });
        };

        let user;
        if (!userId) {
            if (!validateForm()) {
                return false;
            }

            user = {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                username: usernameInput.value,
                password: passwordInput.value,
                passConfirm: confirmPassInput.value
            };

            if (preferredWorkingHoursPerDayInput.isDirty) {
                user['preferredWorkingHoursPerDay'] = preferredWorkingHoursPerDayInput.value;
            }
    
            if (rolesInput.isDirty) {
                user['roles'] = rolesInput.value;
            }

            signup(user, success, fail);
            return;
        }

        user = {
            id: userId
        };

        if (firstNameInput.isDirty && firstNameInput.valid) {
            user['firstName'] = firstNameInput.value;
        }
        
        if (lastNameInput.isDirty && lastNameInput.valid) {
            user['lastName'] = lastNameInput.value;
        }

        if (usernameInput.isDirty && usernameInput.valid) {
            user['username'] = usernameInput.value;
        }

        if (passwordInput.isDirty && passwordInput.valid && passwordInput.value === confirmPassInput.value) {
            user['password'] = passwordInput.value;
        }

        if (preferredWorkingHoursPerDayInput.isDirty) {
            user['preferredWorkingHoursPerDay'] = preferredWorkingHoursPerDayInput.value;
        }

        if (rolesInput.isDirty) {
            user['roles'] = rolesInput.value;
        }

        updateUser(user, success, fail);
    };

    const redirect = () => {
        history.push('/users');
    }
    
    const handleDeleteUser = () => {
        const success = (resp) => {
            setMessageState({ show: true, header: 'Delete User', message: 'User deleted' });
        };

        const fail = () => {
            setMessageState({ show: true, header: 'Delete User', message: 'Error occured' });
        }; 

        deleteUser(userId, success, fail);
    };
    
    return (
        <div className="Form-wrapper">
            <h3>{ title }</h3>

            {loader &&
            <Spinner animation="border" variant="primary" />
            }

           {userId &&
            <div className="User-action">
                <Button variant="danger" className="float-right" onClick={handleDeleteUser}>
                    Delete
                </Button>
            </div>
            }

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

                <Form.Group controlId="preferredWorkingHoursPerDay">
                    <Form.Label>Preferred Working Hours per Day</Form.Label>
                    <Form.Control type="numner" {...preferredWorkingHoursPerDayInput.bind} onBlur={handleBlur} />
                </Form.Group>

                {adminUser &&
                <Form.Group controlId="roles">
                    <Form.Label>User Role</Form.Label>
                    <Form.Control as="select" {...rolesInput.bind}>
                        <option value={1}>User</option>
                        <option value={2}>User Manager</option>
                        <option value={4}>Admin</option>
                    </Form.Control>
                </Form.Group>
                }

                <div className="Form-buttons">
                    <Button variant="secondary" className="float-left" onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button variant="primary" className="float-right" type="submit">
                        Save
                    </Button>
                </div>
            </Form>

            <MessageModal show={messageState.show} header={messageState.header} message={messageState.message} onHide={setMessageState} closeAction={redirect} />
            
        </div>
    );
};

export default User;
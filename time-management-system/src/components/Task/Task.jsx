import React, { useCallback, useState, useContext, useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import MessageModal from '../MessageModal/MessageModal';
import { StateContext } from '../../contexts';

import 'react-datepicker/dist/react-datepicker.css';
import './Task.css'
import { useRequiredInput } from '../../hooks/input-hook';
import { getTask, createTask, updateTask, deleteTask } from '../../api-client';

const Task = (props) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const [date, setDate] = useState(currentDate);
    const noteInput = useRequiredInput('');
    const hoursInput = useRequiredInput(0);

    const userId = props.match.params.id;
    const currentUser = useContext(StateContext).currentUser;
    let createdForUserId;
    if (userId) {
        createdForUserId = userId;
    } else {
        createdForUserId = currentUser.id;
    }

    const taskId = props.match.params.taskId;
    const title = taskId ? 'Edit a task' : 'Create a new task';

    const [loader, setLoader] = useState(taskId ? true : false);
    const [messageState, setMessageState] = useState({ show: false, header: null, message: null });
    
    const history = useHistory();
    const onCancel = useCallback(() => {
        history.push('/tasks');
    }, [history]);

    useEffect(() => {
        if (taskId) {
            getTask(taskId, (resp) => {
                const task = resp.data;

                if (task) {
                    setDate(new Date(task.date));
                    noteInput.setValue(task.note);
                    noteInput.setDirty(true);
                    hoursInput.setValue(task.workingHours);
                    hoursInput.setDirty(true);
                    setLoader(false);
                } else {
                    history.push('/tasks');
                }
            }, (error) => {
                history.push('/tasks');
            });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const validateForm = () => {
        let valid = true;

        if (noteInput.isDirty) {
            if (!noteInput.value) {
                noteInput.setValid(false, 'Field is required.');
                valid = false;
            } else {
                noteInput.setValid(true);
            }
        } else {
            valid = false;
        }

        if (hoursInput.isDirty) {
            if (!hoursInput.value) {
                hoursInput.setValid(false, 'Field is required.');
                valid = false;
            } else {
                hoursInput.setValid(true);
            }
        } else {
            valid = false;
        }

        return valid;
    }

    const handleBlur = () => {
        validateForm();
    }

    const handleDateChange = (date) => {
        date.setHours(0, 0, 0, 0);
        setDate(date);
    }

    const handleDateChangeRaw = (event) => {
        event.preventDefault();
    };

    const redirect = () => {
        history.push('/tasks');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const task = {
            date: date,
            note: noteInput.value,
            workingHours: hoursInput.value,
            userId: createdForUserId
        };

        let successMsg, failMsg;
        if (taskId) {
            task['id'] = taskId;
            successMsg = 'Task has updated.';
            failMsg = 'Update task failed.'
        } else {
            successMsg = 'Task has created.';
            failMsg = 'Create a task failed.';
        }

        const success = (resp) => {
            setMessageState({ show: true, header: title, message: successMsg });
        };

        const fail = () => {
            setMessageState({ show: true, header: title, message: failMsg });
        };

        if (taskId) {
            updateTask(task, success, fail);
        } else {
            createTask(task, success, fail);
        }
    };

    const handleDeleteTask = () => {
        const success = (resp) => {
            setMessageState({ show: true, header: 'Delete Task', message: 'Task deleted' });
        };

        const fail = () => {
            setMessageState({ show: true, header: 'Delete Task', message: 'Error occured' });
        }; 

        deleteTask(taskId, success, fail);
    };
    
    return (
        <div className="Form-wrapper">
            <h3>{title}</h3>

            {loader &&
            <Spinner animation="border" variant="primary" />
            }

            {taskId &&
            <div className="Task-action">
                <Button variant="danger" className="float-right" onClick={handleDeleteTask}>
                    Delete
                </Button>
            </div>
            }

            <Form className="Home-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formNote">
                    <Form.Label>Note</Form.Label>
                    <Form.Control type="text" {...noteInput.bind} onBlur={handleBlur} />
                    <Form.Text className="Alert"> {noteInput.errorMessage} </Form.Text>
                </Form.Group>

                <div className="row">
                    <div className="col-6">
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <DatePicker selected={date} onChange={handleDateChange} onChangeRaw={handleDateChangeRaw} className="form-control" />
                        </Form.Group>
                    </div>

                    <div className="col-6">
                        <Form.Group controlId="formUsername">
                            <Form.Label>Working hours</Form.Label>
                            <Form.Control type="number" min="0" max="24" step="0.1" {...hoursInput.bind} onBlur={handleBlur} lang="en" />
                            <Form.Text className="Alert"> {hoursInput.errorMessage} </Form.Text>
                        </Form.Group>
                    </div>
                </div>
                
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

export default Task;
import React, { useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import MessageModal from '../MessageModal/MessageModal';

import 'react-datepicker/dist/react-datepicker.css';
import './Task.css'

const Task = (props) => {
    const [date, setDate] = useState(new Date());

    const taskId = props.match.params.taskId;
    const title = taskId ? 'Edit a task' : 'Create a new task';
    
    const history = useHistory();
    const onCancel = useCallback(() => {
        history.push('/tasks');
    }, [history]);
    
    return (
        <div className="Form-wrapper">
            <h3>{title}</h3>

            <Form className="Home-form">
                <Form.Group controlId="formUsername">
                    <Form.Label>Note</Form.Label>
                    <Form.Control type="text" />
                    <Form.Text className="text-muted Alert"> </Form.Text>
                </Form.Group>

                <div className="row">
                    <div className="col-6">
                        <Form.Group controlId="formUsername">
                            <Form.Label>Date</Form.Label>
                            <DatePicker selected={date} onChange={setDate} className="form-control" />
                            <Form.Text className="text-muted Alert"></Form.Text>
                        </Form.Group>
                    </div>

                    <div className="col-6">
                        <Form.Group controlId="formUsername">
                            <Form.Label>Working hours</Form.Label>
                            <Form.Control type="number" min="0" max="24" step="1" />
                            <Form.Text className="text-muted Alert"></Form.Text>
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
            
        </div>
    );
};

export default Task;
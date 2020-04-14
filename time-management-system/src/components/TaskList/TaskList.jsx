import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../contexts';
import { getTasks } from '../../api-client';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './TaskList.css';
import DatePicker from "react-datepicker";

const LIST_VIEW = "list_view";
const EXPORT = "export";

const TaskList = (props) => {
    const [tasks, setTasks] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [preferredWorkingHoursPerDay, setPreferredWorkingHoursPerDay] = useState(0);
    const [view, setView] = useState(LIST_VIEW);
    const currentUser = useContext(StateContext).currentUser;
    const userId = props.match.params.id;
    const forUserId = userId ? userId : currentUser.id;
    const history = useHistory();

    useEffect(() => {
        getTasks(forUserId, (resp) => {
            if (resp.data) {
                setPreferredWorkingHoursPerDay(resp.data.preferredWorkingHoursPerDay);
                setTasks(resp.data.tasks);
            }
        }, () => {
            //message
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatDate = (date) => {
        return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
    };

    const filteredTasks = [];

    if (tasks) {
        for (let task of tasks) {
            let taskDate = new Date(task._id);

            if (startDate) {
                if (taskDate < startDate) {
                    continue;
                }
            }

            if (endDate) {
                if (taskDate > endDate) {
                    continue;
                }
            }

            filteredTasks.push(task);
        }
    }

    let taskList;

    if (view === LIST_VIEW) {
        taskList = filteredTasks.map(task => {
            const docList = task.docs.map(doc => {
                const actionLink = userId ? `/user/${userId}/task/${doc._id}` :  `/task/${doc._id}`;
                return (
                    <div className="Task-note">
                        <div className="Task-note-desc">
                            {doc.note} ({doc.workingHours})
                        </div>
                        <Link className='Task-action-link' to={actionLink}>Edit</Link>
                    </div>
                )
            });
    
            const taskDate = new Date(task._id);
            const bgClassName = Number(task.totalWorkingHours) < Number(preferredWorkingHoursPerDay) ? 'Task-notes Red' : 'Task-notes Green';
    
            return (
                <div className="Task-item">
                    <div>{taskDate.toDateString()} ({task.totalWorkingHours})</div>
                    <div className={bgClassName}>{docList}</div>
                </div>
            )
        });
    } else {
        const taskRows = filteredTasks.map(task => {
            const taskDate = new Date(task._id);
            const noteList = task.docs.map(doc => (
                <>
                    {doc.note}<br />
                </>
            ));
            return (
                <tr>
                    <td>{formatDate(taskDate)}</td>
                    <td>{task.totalWorkingHours}</td>
                    <td>{noteList}</td>
                </tr>
            );
        });

        taskList = (
            <table>
                <tr>
                    <th>Date</th>
                    <th>Total time</th>
                    <th>Notes</th>
                </tr>
                {taskRows}
            </table>
        )
    }
    
    const handleDateChangeRaw = (event) => {
        event.preventDefault();
    };

    const handleStartDateChange = (date) => {
        date.setHours(0, 0, 0, 0);
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        date.setHours(0, 0, 0, 0);
        setEndDate(date);
    };

    const resetFilter = () => {
        setStartDate(null);
        setEndDate(null);
    }
   
    const handleNewTask = () => {
        const newTaskUlr = userId ? `/user/${userId}/task/` :  '/task/';
        history.push(newTaskUlr);
    };

    const handleExport = () => {
        setView(EXPORT);
    }

    const handleBack = () => {
        setView(LIST_VIEW);
    }

    return (
        <div>
            <h3>Tasks</h3>

            <div className="Task-top-actions">
                {view === LIST_VIEW &&
                <Button variant="primary" className="float-right" onClick={handleNewTask}>
                    Create new task
                </Button>
                }
                {view === LIST_VIEW &&
                <Button variant="secondary" className="float-right" onClick={handleExport}>
                    Export
                </Button>
                }
                {view === EXPORT &&
                <Button variant="secondary" className="float-right" onClick={handleBack}>
                    Back
                </Button>
                }
            </div>

            <div className="Task-filter">
                <div className="Task-filter-item">
                    <span>From:</span>
                    <DatePicker selected={startDate} onChange={handleStartDateChange} onChangeRaw={handleDateChangeRaw} className="form-control Date-picker" />
                </div>
                <div className="Task-filter-item">
                    <span>To:</span>
                    <DatePicker selected={endDate} onChange={handleEndDateChange} onChangeRaw={handleDateChangeRaw} className="form-control Date-picker" />
                </div>
                <Button variant="primary" className="Task-filter-item" onClick={resetFilter}>
                    Clear filters
                </Button>
            </div>

            <div className="Task-list">
                {taskList}
            </div>
        </div>
    );
};

export default TaskList;
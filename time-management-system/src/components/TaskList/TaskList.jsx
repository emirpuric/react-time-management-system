import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../contexts';
import { getTasks } from '../../api-client';
import { Link } from 'react-router-dom';
import './TaskList.css';

const TaskList = (props) => {
    const [tasks, setTasks] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [preferredWorkingHoursPerDay, setPreferredWorkingHoursPerDay] = useState(0);
    const currentUser = useContext(StateContext).currentUser;
    const userId = props.match.params.id;
    const forUserId = userId ? userId : currentUser.id;

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

    const taskList = filteredTasks.map(task => {
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
   

    return (
        <div>
            <h3>Tasks</h3>

            <div className="Task-list">
                {taskList}
            </div>
        </div>
    );
};

export default TaskList;
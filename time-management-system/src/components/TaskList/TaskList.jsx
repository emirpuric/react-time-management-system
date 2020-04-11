import React, { useState } from 'react';

const TaskList = () => {
    const [tasksState, setTastsState] = useState({ tasks: null, selectedTask: null, view: 'list' });
    
    return (
        <div>
            <h3>TaskList</h3>
        </div>
    );
};

export default TaskList;
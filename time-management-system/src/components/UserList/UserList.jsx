import React, { useState } from 'react';

const UserList = () => {
    const [usersState, setUsersState] = useState({ users: null, selecedUser: null, view: 'list' });
    
    return (
        <div>
            <h3>UserList</h3>
        </div>
    );
};

export default UserList;
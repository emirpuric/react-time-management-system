import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUsers } from '../../api-client';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState(null);
    const history = useHistory();

    useEffect(() => {
        getUsers((resp) => {
            const users = resp.data;
            setUsers(users);
        }, () => {
            history.push('/');
        });
    }, []);

    let userList;

    if (users) {
        userList = users.map(user => (
            <div key={user.id}>
                <div>{user.firstName} {user.lastName}</div>
                <div>{user.username}</div>
            </div>
        ));   
    }

    return (
        <div>
            <h3>Users</h3>

            <div className="User-list">
                {userList}
            </div>
        </div>
    );
};

export default UserList;
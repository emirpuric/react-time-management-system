import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
            <div className="User-item" key={user.id}>
                <div>{user.firstName} {user.lastName}</div>
                <div className='User-item-row'>
                    <div className="User-item-username">{user.username}</div>
                    <Link className='User-action-link' to='/about'>Edit</Link>
                </div>
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
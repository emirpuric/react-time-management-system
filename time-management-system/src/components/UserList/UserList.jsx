import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { getUsers } from '../../api-client';
import './UserList.css';
import { StateContext, hasAdminRole } from '../../contexts';
import { Button } from 'react-bootstrap';

const UserList = () => {
    const [users, setUsers] = useState(null);
    const history = useHistory();
    const loggedUser = useContext(StateContext).currentUser;
    const adminUser = hasAdminRole(loggedUser.roles);

    useEffect(() => {
        getUsers((resp) => {
            const users = resp.data;
            setUsers(users);
        }, () => {
            history.push('/');
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let userList;

    if (users) {
        userList = users.map(user => (
            <div className="User-item" key={user.id}>
                <div>{user.firstName} {user.lastName}</div>
                <div className='User-item-row'>
                    <div className="User-item-username">{user.username}</div>
                    {adminUser &&
                    <Link className='User-action-link' to={'user/' + user._id + '/tasks'}>View Tasks</Link>
                    }
                    <Link className='User-action-link' to={'user/' + user._id}>Edit</Link>
                </div>
            </div>
        ));   
    }

    const handleNewUser = () => {
        history.push('/user');
    }

    return (
        <div>
            <h3>Users</h3>

            <div className="Users-top-actions">
            <Button variant="primary" className="float-right" onClick={handleNewUser}>
                Create a new user
            </Button>
            </div>

            <div className="User-list">
                {userList}
            </div>
        </div>
    );
};

export default UserList;
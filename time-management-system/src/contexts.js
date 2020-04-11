import React from 'react';

export const StateContext = React.createContext({
    currentUser: null
});

export const TasksContext = React.createContext(null);

export const UsersContext = React.createContext(null);

export const USER_MANAGER_ROLE = 2;
export const ADMIN_ROLE = 4;
export const MANAGER_ROLE = USER_MANAGER_ROLE | ADMIN_ROLE;

export const hasRoles = (userRoles, approvedRoles) => {
    return (userRoles & approvedRoles) > 0;
};

export const hasManagerRole = roles => {
    return (roles & MANAGER_ROLE) > 0;
};

export const hasAdminRole = roles => {
    return (roles & ADMIN_ROLE) > 0;
};
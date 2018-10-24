import React from 'react';

import NavItem from './NavItem';
import '../../assets/styles/user-tools.css'

const UserNav = (props) => {
    return (
        <ul className="user-nav">
            <NavItem link="/main/users">Users</NavItem>
            <NavItem link="/main/friends">Friends</NavItem>
        </ul>
    );
}

export default UserNav;
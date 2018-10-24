import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../assets/styles/user-tools.css'

const NavItem = (props) => {
    return (
        <NavLink to={props.link} className="user-nav-item">
            {props.children}
        </NavLink>
    );
}

export default NavItem;
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Col } from 'reactstrap';

import '../../assets/styles/user-tools.css'
import UserNav from './UserNav';
import Users from './Users';
import Friends from './Friends';
import usersIcon from '../../assets/images/users.svg'

class UserTools extends Component {
    render () {
        const usersClass = this.props.show ? "user-tools" : "hide-user-tools";
        return (
            <Container className={usersClass} >
                <Col>  
                    <UserNav />
                    <Switch>
                        <Route path="/main/users" exact component={Users} />
                        <Route path="/main/friends" exact component={Friends} />
                    </Switch>
                </Col>
                <Col>
                    <div className="users-icon-button" onClick={this.props.toggle}>
                        <img className="users-icon" src={usersIcon} alt="users-icon" />
                    </div>
                </Col>
            </Container>
        );
    }
}

export default UserTools;
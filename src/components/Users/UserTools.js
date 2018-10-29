import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Container, Col } from 'reactstrap';

import '../../assets/styles/user-tools.css'
import UserNav from './UserNav';
import Users from './Users';
import Friends from './Friends';
import usersIcon from '../../assets/images/users.svg'

class UserTools extends Component {

    render () {
        const usersClass = this.props.show ? "user-tools" : "hide-user-tools";
        const buttonContent = (
            <div className="users-icon-button" onClick={this.props.toggle}>
                <img className="users-icon" src={usersIcon} alt="users-icon" />
            </div>
        );
        return (
            <Container className={usersClass} >
                <Col className="users-main-content" >  
                    <UserNav />
                    <Switch>
                        <Route path="/main/users" exact component={() => <Users users={this.props.users} click={this.props.addFriend}/>} />
                        <Route path="/main/friends" exact component={() => <Friends friends={this.props.friends} deleteFriend={this.props.deleteFriend} toggleVisibility={this.props.toggleVisibility} />} />
                    </Switch>
                </Col>
                <Col>
                    {this.props.show ? 
                        <Link to="/main">{buttonContent}</Link> : 
                        <Link to="/main/users">{buttonContent}</Link>
                    }
                </Col>
            </Container>
        );
    }
}

export default UserTools;
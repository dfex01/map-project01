import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Container, Col } from 'reactstrap';
import firebase from '../firebase';

import '../../assets/styles/user-tools.css'
import UserNav from './UserNav';
import Users from './Users';
import Friends from './Friends';
import usersIcon from '../../assets/images/users.svg'

class UserTools extends Component {
    state = {
        users: [],
        friends: []
    }

    componentWillMount() {
        firebase.database().ref('/users').once('value')
        .then(snapshot => {
            let updatedUsers = [...this.state.users];
            for (let key in snapshot.val()) {
                updatedUsers.push(snapshot.val()[key]);
            }
            this.setState({ users: updatedUsers });
        });
    }

    addFriendHandler = (user) => {
        let newFriends = [...this.state.friends];
        if (this.state.friends.length === 0) {
            newFriends.push(user);
        } else if (this.state.friends.every(friend => {return friend.id !== user.id})) {
            newFriends.push(user);
        }    
        this.setState({ friends: newFriends });
    }

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
                        <Route path="/main/users" exact component={() => <Users users={this.state.users} click={this.addFriendHandler}/>} />
                        <Route path="/main/friends" exact component={() => <Friends friends={this.state.friends} />} />
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
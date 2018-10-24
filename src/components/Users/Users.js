import React, { Component } from 'react';
import firebase from '../firebase';

import addFriendIcon from '../../assets/images/add-friend.svg';

class Users extends Component {
    state = {
        users: []
    }

    componentWillMount() {
        if (this.props.show) {
            firebase.database().ref('/users').once('value')
            .then(snapshot => {
                let updatedUsers = [...this.state.users];
                for (let key in snapshot.val()) {
                    updatedUsers.push(snapshot.val()[key]);
                }
                this.setState({ users: updatedUsers });
            });
        };
    }

    
    
    render() {
        return (
            <div>
                <h1>User List</h1>
                {this.state.users.map(user => {
                    return (
                        <div className="user-card" key={user.id}>
                            <img src={user.picture} className="user-pic" alt={user.name}/>
                            <div className="user-name">{user.name}</div>
                            <img 
                                src={addFriendIcon} 
                                alt="add friend icon" 
                                className="add-friend-icon" />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Users;
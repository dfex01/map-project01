import React, { Component } from 'react';

import addFriendIcon from '../../assets/images/add-friend.svg';

class Users extends Component {
    
    render() {
        return (
            <div>
                <h1>User List</h1>
                {this.props.users.map(user => {
                    return (
                        <div className="user-card" key={user.id}>
                            <img src={user.picture} className="user-pic" alt={user.name}/>
                            <div className="user-name">{user.name}</div>
                            <img 
                                src={addFriendIcon} 
                                alt="add friend icon" 
                                className="add-friend-icon"
                                onClick={() => this.props.click(user)} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Users;
import React, { Component } from 'react';

import deleteFriendIcon from '../../assets/images/delete-friend.svg';
import visible from '../../assets/images/eye.svg';
import hiding from '../../assets/images/eye-slash.svg';

class Friends extends Component {
   
    render() {
        return (
            <div>
                <h1>Friends List</h1>
                {this.props.friends.map(user => {
                    return (
                        <div className="user-card" key={user.id}>
                            <img src={user.picture} className="user-pic" alt={user.name}/>
                            <div className="user-name">{user.name}</div>
                            <img 
                                src={deleteFriendIcon} 
                                alt="delete friend icon" 
                                className="add-friend-icon"
                                onClick={() => this.props.deleteFriend(user)} />
                            <img 
                                src={user.isShowing ? visible : hiding}
                                alt={user.isShowing ? 'user is visible' : 'user is hidden'}
                                className="visible-icon" 
                                onClick={() => this.props.toggleVisibility(user)} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Friends;
import React, { Component } from 'react';

import deleteFriendIcon from '../../assets/images/delete-friend.svg'

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
                                onClick={() => this.props.click(user)} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Friends;
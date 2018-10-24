import React, { Component } from 'react';

class Friends extends Component {
    render() {
        return (
            <div>
                <h1>Friend List</h1>
                {this.props.friends.map(user => {
                    return (
                        <div className="user-card" key={user.id}>
                            <img src={user.picture} className="user-pic" alt={user.name}/>
                            <div className="user-name">{user.name}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Friends;
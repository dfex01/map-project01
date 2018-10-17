import React, { Component } from 'react';
import firebase from './firebase';
import firebaseui from 'firebaseui';
import { Link } from 'react-router-dom';

import '../assets/styles/login.css';

class Login extends Component {

    componentDidMount() {
        const uiConfig = {
          signInSuccessUrl: '/main',
          signInFlow: 'popup',
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID
          ]
        }
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);

      }

    render() {
        return (
            <div className="firebase-outer-container">
                <div className="auth-welcome">
                    <h1>Welcome to Map-Project01</h1>
                    <p>Login to save your markers or continue as an anonymous user</p>
                </div>
                <div id="firebaseui-auth-container"></div>
                <Link to="/main" onClick={firebase.auth().signOut()}>
                    <button className="anonymous-button">
                        <img 
                            src="https://img1.looper.com/img/uploads/2017/06/dumb-and-dumber-780x438_rev1.jpg" 
                            alt="anonymous-user"
                            className="firebaseui-idp-icon" />
                        <span className="firebaseui-idp-text-long">Continue Anonymously</span>
                    </button>
                </Link>
            </div>
        );
    }
}

export default Login;
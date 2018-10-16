import React, { Component } from 'react';
import firebase from './firebase';
import firebaseui from 'firebaseui';


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
            <div id="firebaseui-auth-container"></div>
        );
    }
}

export default Login;
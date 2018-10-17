import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAA9hvWdE38THDWbBhdL7WcrANOORUsm74",
    authDomain: "map-project-1399a.firebaseapp.com",
    databaseURL: "https://map-project-1399a.firebaseio.com",
    projectId: "map-project-1399a",
    storageBucket: "map-project-1399a.appspot.com",
    messagingSenderId: "989380289899"
  };

  firebase.initializeApp(config);


  export default firebase;
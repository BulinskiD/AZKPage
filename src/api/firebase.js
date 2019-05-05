import firebase from 'firebase/';

  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyABuRw_InE1zSy7JTDQiRtQiBaievicd1I',
    authDomain: 'azkpage.firebaseapp.com',
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: 'azkpage',
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
  };


  export default firebase.initializeApp(config);
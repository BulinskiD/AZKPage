import app from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyABuRw_InE1zSy7JTDQiRtQiBaievicd1I',
    authDomain: 'azkpage.firebaseapp.com',
    databaseURL: 'https://azkpage.firebaseio.com',
    projectId: 'azkpage',
    storageBucket: 'azkpage.appspot.com',
    messagingSenderId: '40966102502'
  };


  export default app.initializeApp(config);
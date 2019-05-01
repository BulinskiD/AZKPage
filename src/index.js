import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import firebase from './api/firebase';
import FirebaseContext from './api/firebaseContext';

ReactDOM.render(
    <FirebaseContext.Provider value = {firebase.firestore()}>
            <App />
    </FirebaseContext.Provider>
, document.querySelector('#root'));
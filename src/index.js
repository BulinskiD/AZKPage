import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import firebase from './api/firebase';
import FirebaseContext from './api/firebaseContext';

ReactDOM.render(
    <FirebaseContext.Provider value = {{
            firestore: firebase.firestore(), 
            storage: firebase.storage().refFromURL("gs://azkpage.appspot.com"),
            auth: firebase.auth()}}>
            <App />
    </FirebaseContext.Provider>
, document.querySelector('#root'));
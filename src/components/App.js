import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import OpenApp from './openApp';
import AdminPage from './adminApp/adminPage';
import ErrorHandlerPage from './errorHandlerPage';
import FirebaseContext from '../api/firebaseContext';

class App extends React.Component {
    static contextType = FirebaseContext;

    render(){
        return (
            <BrowserRouter>
                <div>
                <Route exact path= '/' component={OpenApp} />
                <Route exact path= '/error' component={ErrorHandlerPage} />
                <Route path= '/admin' component={AdminPage} />
                </div>
            </BrowserRouter>
        );
    }
}


export default App;
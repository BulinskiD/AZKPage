import React from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter, Route, Redirect} from "react-router-dom";
import openApp from './openApp';
import adminApp from './adminApp/adminApp';
import adminStyles from './adminApp/styles';
import adminPaints from './adminApp/paints';
import adminExhibitions from './adminApp/exhibitions'
import errorHandlerPage from './errorHandlerPage';

class App extends React.Component {

    checkIfLogged = (Component, pathname)=>{

        if(localStorage.getItem('jwt')!==null){
            let decodedToken = jwt_decode(localStorage.getItem('jwt'));
            decodedToken.exp = new Date(decodedToken.exp * 1000);
            
            if (new Date().getTime() <= decodedToken.exp.getTime()){
                return React.createElement(Component) ;
            }
        }

        return <Redirect to={{
            pathname:"/admin",
            state: {refferer: pathname} 
        }} /> 
    }

    componentDidMount(){
        window.addEventListener('load', this.turnPageOn);
    }

    turnPageOn(){
        //Turn off loader gif
    }

    render(){
        return (
            <BrowserRouter>
                <div>
                <Route exact path= '/' component={openApp} />
                <Route exact path= '/error' component={errorHandlerPage} />
                <Route path= '/admin' component={adminApp} />
                <Route path= '/admin/styles'
                 render={()=>this.checkIfLogged(adminStyles, '/admin/styles')} />
                <Route path= '/admin/paints'  
                 render={()=>this.checkIfLogged(adminPaints, '/admin/paints')} />
                <Route path= '/admin/exhibitions'
                  render={()=>this.checkIfLogged(adminExhibitions, '/admin/exhibitions')} />
                </div>
            </BrowserRouter>
        );
    }
}


export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Route} from 'react-router-dom';
import FirebaseContext from '../../../api/firebaseContext';
import AdminExhibitions from '../exhibitions/';
import AdminPaints from '../paints/';
import AdminStyles from '../styles';
import Login from '../login/login';
import Loading from '../../loading/loading';

import './login.css';

class AdminPage extends React.Component{
    static contextType = FirebaseContext;

    authSubscriber;
    redirectPath;
    state={login: '', password: '', error: null, loading: true, user: null};

    setLogOut = async () =>{
        this.setState({loading: true});
        try {
            this.props.history.push('/');
            await this.context.auth.signOut();
        }
        catch(error) {
            console.log(error);
        }
    }

    async componentDidMount(){
        this.authSubscriber = this.context.auth.onAuthStateChanged(user => {
            this.setState({user, loading: false});
        });
    }

    componentWillUnmount() {
        this.authSubscriber();
    }

    renderNavBar= () =>{
        return(
            <div className="top-admin-menu">
                <div className="navbar navbar-admin">
                    <Link to="/" className="btn btn-secondary">Powrót do strony głównej</Link>
                    <Link to="/admin/styles" className="btn btn-dark">Style</Link>
                    <Link to="/admin/paints" className="btn btn-dark">Obrazy</Link>
                    <Link to="/admin/exhibitions" className="btn btn-dark">Wystawy</Link>
                </div>

                <div className="navbar">
                    <button className="btn btn-danger" onClick={this.setLogOut}>Wyloguj</button>
                </div>
            </div>
        )
    }

    checkIfLogged = (Component, pathname) =>{
        if(this.state.user){    
            return React.createElement(Component);
        }
        else{
            this.redirectPath = pathname;
            return null;
        }
    }

    renderRoutes() {
        return (
            <React.Fragment>
                <Route path='/admin/styles'
                    render={() => this.checkIfLogged(AdminStyles, '/admin/styles')} />
                <Route path='/admin/paints'
                    render={() => this.checkIfLogged(AdminPaints, '/admin/paints')} />
                <Route path='/admin/exhibitions'
                    render={() => this.checkIfLogged(AdminExhibitions, '/admin/exhibitions')} />
            </React.Fragment>);
    }


    render() {
        if(this.state.loading)
            return ReactDOM.createPortal(<Loading fullPage={true} />, document.querySelector('#root'));
        if (this.state.user === null) {
            return <React.Fragment><Login redirectPath={this.redirectPath} history={this.props.history} />{this.renderRoutes()}</React.Fragment>
        }
        else return <div>{this.renderNavBar()}{this.renderRoutes()}</div>;
    }
}

export default AdminPage; 
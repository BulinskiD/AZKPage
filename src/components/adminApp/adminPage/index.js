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
            <header className="mb-4">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span style={{'cursor': 'pointer'}} onClick={this.setLogOut} className="nav-item nav-link text-uppercase">Wyloguj</span>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link text-uppercase" to="/admin/styles">Style</Link>
                    <Link className="nav-item nav-link text-uppercase" to="/admin/paints">Obrazy</Link>
                    <Link className="nav-item nav-link text-uppercase" to="/admin/exhibitions">Wystawy</Link> 
                    <Link className="nav-item nav-link text-uppercase" to="/">Home</Link>
                </div>
              </div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
          </header>
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
            return <React.Fragment>
                        <Login onLoading={() => this.setState({loading: true})} 
                                          redirectPath={this.redirectPath}
                                          history={this.props.history} />
                        {this.renderRoutes()}
                    </React.Fragment>
        }
        else return <div>{this.renderNavBar()}{this.renderRoutes()}</div>;
    }
}

export default AdminPage; 
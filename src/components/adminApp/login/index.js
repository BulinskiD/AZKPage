import React from 'react';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import authApi from '../../../api/auth';
import onErrorHandler from '../../../helperFunctions/onErrorHandler';

import './login.css';

class login extends React.Component{

    state={login: '', password: '', error: null, decodedToken: null};

    setLogIn = async (loginData)=>{
        this.props.setLogIn(loginData);
        await this.setState({decodedToken: loginData});
    }

    setLogOut = ()=>{
        window.location.replace('/');
        this.props.setLogOut();
        this.setState({decodedToken: null});
        localStorage.removeItem('jwt');
    }

    componentDidMount(){
        if (localStorage.getItem('jwt')) {
            let decodedToken = jwt_decode(localStorage.getItem('jwt'));
            decodedToken.exp = new Date(decodedToken.exp * 1000);
            if (new Date().getTime() <= decodedToken.exp.getTime()) {
                this.setLogIn(decodedToken);
                this.setState({decodedToken: decodedToken})
            }
            else {
                localStorage.removeItem('jwt');
                this.props.setLogOut();
            }
        }
    }

    componentDidUpdate=()=>{
        if (this.state.decodedToken!==null && (new Date().getTime() >= this.state.decodedToken.exp.getTime())) {
            this.setLogOut();
        }
    }


    onFormSubmit= (e)=>{
        e.preventDefault();
        this.setState({error: null});

        if (this.state.login === '' || this.state.password === '') {
            this.setState({ error: 'Musisz uzupełnić wszystkie pola!' });
        }
        else {
            authApi.post('login', { 'Name': this.state.login, 'Password': this.state.password })
                .then(async response => {
                    await localStorage.setItem('jwt', response.data);
                    let decoded = jwt_decode(response.data);
                    decoded.exp = new Date(decoded.exp * 1000);
                    this.setLogIn(decoded);
                    this.setState({ login: '', password: '' });
                }).catch(error => {
                    const verifiedError= onErrorHandler(error);
                    if (verifiedError === 401) {
                        this.setState({ error: 'Podano błędne dane logowania!' });
                    }
                });
        }

    }



    renderNavBar=()=>{
        return(
            <div className="top-admin-menu">
                <div className="navbar navbar-admin">
                    <Link to="/" className="btn btn-secondary">Powrót do strony głównej</Link>
                    <Link to="/admin/styles" className="btn btn-dark">Style</Link>
                    <Link to="/admin/paints" className="btn btn-dark">Obrazy</Link>
                    <Link to="/admin/exhibitions" className="btn btn-dark">Wystawy</Link>
                </div>

                <div className="navbar">
                    <button className="btn btn-danger" onClick={this.setLogOut}>Wyloguj {this.state.decodedToken.sub}</button>
                </div>
            </div>
        )

    }



    render(){
        if (this.state.decodedToken === null) {
            return (
                <div className="col-6 offset-3">
                    <img className="logo" src="/img/logo.jpg" alt="Logo" />
                    <form onSubmit={(e) => this.onFormSubmit(e)} className="contact-form">
                        <div className="form-group row">
                            <div
                                className={this.state.error !== null ? 'anim col-12 alert alert-danger text-center' : 'anim'}>
                                {this.state.error}</div>
                        </div>
                        <div className="form-row">
                            <label htmlFor="login" className="col-lg-3">Login:</label>
                            <input onChange={(e) => this.setState({ login: e.target.value })} value={this.state.login} type="login" className="form-control col-lg-8" id="name" placeholder="Login" />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password" className="col-lg-3">Hasło:</label>
                            <input onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} type="password" className="form-control col-lg-8" id="password" placeholder="Hasło" />
                        </div>
                        <input type="submit" className="btn btn-dark float-right m-4" value="Zaloguj" />
                    </form>
                </div>
            );
        }
        else {
            return(
            <div>{this.renderNavBar()}</div>
            );
        }
    }
}

export default login; 
import React from 'react';
import FirebaseContext from '../../../api/firebaseContext';

class Login extends React.Component {
    static contextType = FirebaseContext;

    state={login: '', password: '', error: null};


    onFormSubmit= async e =>{
        e.preventDefault();
        this.setState({error: null});

        if (this.state.login === '' || this.state.password === '') {
            this.setState({ error: 'Musisz uzupełnić wszystkie pola!' });
        }
        else {
            try{
                await this.context.auth.signInWithEmailAndPassword(this.state.login, this.state.password);
                this.props.redirectPath && this.props.history.push(this.props.redirectPath);
            }
            catch(error) {
                this.setState({loading: false, error: 'Podano niewłaściwe dane!'});
                console.log(error);
            }
        }
    }

    render() {
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
                        <label htmlFor="login" className="col-lg-3">Email:</label>
                        <input onChange={(e) => this.setState({ login: e.target.value })} value={this.state.login} type="email" className="form-control col-lg-8" id="name" placeholder="Login" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="password" className="col-lg-3">Hasło:</label>
                        <input onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} type="password" className="form-control col-lg-8" id="password" placeholder="Hasło" />
                    </div>
                    <input type="submit" className="btn btn-dark float-right m-4" value="Zaloguj" />
                </form>
            </div>);
    }
}

export default Login;
import React from 'react';

import Login from './login/';

class adminApp extends React.Component{

    state={login: null}


    setLogIn=(loginData)=>{
        this.setState({login: loginData});

        if(this.props.location.state!==undefined){
            window.location.replace(this.props.location.state.refferer);
        }
    }

    setLogOut=async ()=>{
        await this.setState({login: null});
    }


    render(){
        return(
                <div>
                    <Login setLogIn={this.setLogIn} setLogOut={this.setLogOut} />
                </div>
        );
    }
}

export default adminApp;
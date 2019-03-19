import React from 'react';

import './errorHandlerPage.css';

export default () =>{
    return (
        <div className="error">
        <div className="error-image"><img src="img/working.jpg" alt="Gears Working" style={{maxWidth: '200px'}} /></div>
        <span className="error-message big">Ups! Coś poszło nie tak... </span>
        <span className="error-message">Spróbuj ponownie później! </span>
        </div>
    )
}
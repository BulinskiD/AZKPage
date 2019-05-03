import React from 'react';

import './loading.css';

export default () => {
    return (
        <div className="loader">
            <div className="square first"></div>
            <div className="square second"></div>
            <div className="square third"></div>
        </div>
    );
}
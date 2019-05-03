import React from 'react';

import './loading.css';

export default (props) => {
    return (
        <div className={props.fullPage ? "full-page loader" : "in-container loader"}>
            <div className="square first"></div>
            <div className="square second"></div>
            <div className="square third"></div>
        </div>
    );
}
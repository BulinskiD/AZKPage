import React from 'react';

import './paginator.css';

export default (props) => {

    const renderPaginator = () => {
        let paginator = [];
        let classes = 'page-link paginator-background'; 
        for (let i = 1; i <= props.pages; i++) {
            paginator.push(
                <li className="page-item" key={i} onClick={() => props.onPageChange(i)}>
                    <span className={props.currentPage === i ? classes + " selected-page " : classes + " page"}>
                        {i}
                    </span>
                </li>);
        }
        return paginator;
    }

    if (props.pages === 1) {
        return "";
    }
    else
        return (
            <div className="d-flex justify-content-center my-4">
                <ul className="pagination">
                    {renderPaginator()}
                </ul>
            </div>);
}

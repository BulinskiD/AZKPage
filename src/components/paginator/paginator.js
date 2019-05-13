import React from 'react';

export default (props) => {

    const renderPaginator = () => {
        let paginator = [];
        let classes = 'page-link text-white'; 
        for (let i = 1; i <= props.pages; i++) {
            paginator.push(
                <li className="page-item" key={i} onClick={() => props.onPageChange(i)}>
                    <span className={props.currentPage === i ? classes + " bg-secondary " : classes + " bg-dark"}>
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
            <div className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                    {renderPaginator()}
                </ul>
            </div>);
}

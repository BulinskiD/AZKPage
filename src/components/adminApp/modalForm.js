import React from 'react';




const modalForm=(props) =>{

        return (
            <>
                <div className="admin-add-container">
                    <button id="addStyleButton" onClick={props.openBlankModal} className="btn btn-success admin-add-button"><i className="fas fa-plus"></i></button>
                    <button id="openModal" data-toggle="modal" data-target="#addExh"></button>
                </div>
                <div className="modal fade" id="addExh" tabIndex="-1" role="dialog" aria-labelledby="addExh" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{props.title}</h5>
                            </div>

                            <form className="col-8 offset-2" onSubmit={(e) => { e.preventDefault(); props.id === null ? props.add() : props.edit() }}>
                                <div className="modal-body">
                                    {props.children}
                                </div>
                            <div className="modal-footer">
                                <button type="button" id="cancel" className="btn btn-secondary" data-dismiss="modal">Anuluj</button>
                                <button type="submit" className="btn btn-success">Dodaj!</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>);
}


export default modalForm;
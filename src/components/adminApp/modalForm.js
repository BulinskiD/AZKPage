import React from 'react';


class modalForm extends React.Component{

    state= {error: null};

    validate(){
        if(Object.values(this.props.errors).filter(e=> !e).length !== 0){
            this.setState({error: 'Wprowadź poprawne wartości!'});
            return false;
        }
        if(this.props.id === null){
            if(this.props.sendingFiles === true)
                if(document.getElementById('picture').files[0] === undefined){
                    // TO DOO ADD FILE TYPE VALIDATION
                    this.setState({error: 'Musisz dodać poprawny obrazek jpg'});
                    return false;
                }
            this.props.add();
        }
        else{
           this.props.edit();
        }

        this.setState({error: null});

    }

    render(){
        return (
            <>
                <div className="admin-add-container">
                    <button id="addStyleButton" onClick={this.props.openBlankModal} className="btn btn-success admin-add-button"><i className="fas fa-plus"></i></button>
                    <button id="openModal" data-toggle="modal" data-target="#addExh"></button>
                </div>
                <div className="modal fade" id="addExh" tabIndex="-1" role="dialog" aria-labelledby="addExh" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.title}</h5>
                            </div>
                            {this.state.error!==null ? <div className="alert alert-danger m-4 mb-0">{this.state.error}</div> : null}
                            <form className="col-8 offset-2" onSubmit={(e) => { e.preventDefault(); this.validate();}}>
                                <div className="modal-body">
                                    {this.props.children}
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
}


export default modalForm;
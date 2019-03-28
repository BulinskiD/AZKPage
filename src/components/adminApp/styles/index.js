import React from 'react';
import updatePic from '../../../helperFunctions/updatePic';
import onErrorHandler from '../../../helperFunctions/onErrorHandler';
import styleApi from '../../../api/styles';

import ModalForm from '../modalForm'; 

class StylesAdmin extends React.Component{

    state= {styles: null, name: '', picSrc: '', styleID: null, error: null};

    errors = {name: null};



    componentDidMount(){
        styleApi.get('index/')
        .then((response)=>{
            this.setState({styles: response.data});
        })
        .catch(error=>{
            let verifiedError = onErrorHandler(error);
            if(verifiedError === 404){
                this.setState({error: 'Brak dodanych styli'});
            }
        });
    }



    deleteStyle(style){
        styleApi.delete(`delete/${style.styleID}`,  { headers: {'Authorization': "bearer " + localStorage.getItem('jwt')}})
            .then((response)=>{
                let newArr= this.state.styles.filter(oldStyle=> oldStyle.styleID!==style.styleID);
                let error = newArr.length === 0 ? 'Brak dodanych styli' : null;
                this.setState({styles: newArr, error: error});
            }).catch((error)=>{
                let verifiedError = onErrorHandler(error);
                if(verifiedError === 404){
                    // Not found Style
                }
            });

    }

    editStyle= async(e) =>{
        let editedStyle = { name: this.state.name, picSrc: this.state.picSrc, styleID: this.state.styleID };
        if (document.getElementById('picture').files[0] !== undefined) {
            let file = document.getElementById('picture').files[0];
            if (file.name !== this.state.picSrc) {
                editedStyle.picSrc = `/img/styles/${file.name}`;
                await updatePic(file, 'styles', localStorage.getItem('jwt'));
            }
        }

        styleApi.put(`update/${this.state.styleID}`, editedStyle,  { headers: {'Authorization': "bearer " + localStorage.getItem('jwt')}})
            .then((response) => {
                let index = this.state.styles.findIndex((style) => style.styleID === editedStyle.styleID);
                let updatedArr = this.state.styles;
                updatedArr[index] = editedStyle;
                this.setState({ styles: updatedArr });
                document.getElementById('cancel').click();
                document.getElementById('picture').value= '';
            }).catch((error) => {
                let verifiedError = onErrorHandler(error);
                if(verifiedError === 400){
                    //Error on validation
                }
                if(verifiedError === 404){
                    //Not found style
                }
            });

    }

    addStyle= async(e)=>{
        let file = document.getElementById('picture').files[0];
        await updatePic(file, 'styles', localStorage.getItem('jwt'));

        let newStyle = { name: this.state.name, picSrc: `/img/styles/${file.name}` }

        styleApi.post(`add/`, newStyle,  { headers: {'Authorization': "bearer " + localStorage.getItem('jwt')}})
            .then((response) => {
                let updatedArr = this.state.styles;
                updatedArr.push(newStyle);
                this.setState({ styles: updatedArr });
                document.getElementById('cancel').click();
                document.getElementById('picture').value= '';
            }).catch((error) => {
                let verifiedError = onErrorHandler(error);
                if(verifiedError === 400){
                    //Error on validation
                }
            });
    }


    openBlankModal=()=>{
        this.setState({name: '', pic: '', styleID: null});
        document.getElementById('openModal').click();
    }

    openEditModal=(style)=>{
        this.setState({name: style.name, picSrc: style.picSrc, styleID: style.styleID});
        document.getElementById('openModal').click();
    }


    renderStylesList(){
        if(this.state.styles !==null){
            return this.state.styles.map(style=>{
                return (
                    <div className="paint" style={{cursor: 'default'}} key={style.styleID}>
                        <div className='thumb'>
                            <img className="img-thumbnail" src={style.picSrc} alt={style.name} />
                        </div>
                        <h4>{style.name}</h4>
                        <span className="exh-buttons">
                            <i onClick={()=>this.openEditModal(style)} className="far fa-edit icon"></i>
                            <i onClick={()=>this.deleteStyle(style)} className="fas fa-trash icon"></i>
                        </span>
                    </div>
                )
            });
        }
        else{
            if(this.state.error)
                return <div className="admin-page-content"><div className="alert alert-primary">{this.state.error}</div></div>
            else
                return 'Ładowanie';
        }
    }

    renderModal= () =>{
    let form= (
        <>
            <div className="form-group row">
                <label htmlFor="name">Nazwa</label>
                <input  className="form-control" onChange={(e)=>{ e.target.value.length >3 && e.target.value.length < 15 ? this.errors.name = true: this.errors.name = false;
                                                                this.setState({name: e.target.value})}} 
                                                                value={this.state.name} type='text' name='name' />
            </div>
            <div className="form-group row">
                <label htmlFor="picture">Zdjęcie</label>
                <input className="form-control" type='file' id='picture' name='picture' />
            </div>
        </>
        );

        return (
        <ModalForm title={'Zarządzaj technikami'} 
                   id={this.state.styleID} 
                   add={this.addStyle} 
                   edit={this.editStyle} 
                   openBlankModal={this.openBlankModal}
                   errors= {this.errors}
                   sendingFiles= {true}>
            {form}
        </ModalForm>);
    }





    render(){
        return(
            <div className="admin-page-content">
                    {this.renderModal()}
                    {this.renderStylesList()}
            </div>
        )
    }
}


export default StylesAdmin;
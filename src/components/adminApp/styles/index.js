import React from 'react';
import Loading from '../../loading/loading';
import FirebaseContext from '../../../api/firebaseContext';
import ReactDOM from 'react-dom';

import ModalForm from '../modalForm'; 

class StylesAdmin extends React.Component{
    static contextType = FirebaseContext;
    
    storageRef = this.context.storage;
    styleRef = this.context.firestore.collection('styles');
    state= {styles: null, name: '', src: '', id: null, error: null, loading: true};
    imagesLoaded = 0;

    errors = {name: null};

    async componentDidMount() {
        try {
            let styleNames = await this.styleRef.get();
            styleNames = styleNames.docs.map(async style => {
                let newUrl = await this.storageRef.child(style.data().src).getDownloadURL();
                return { id: style.id, url: newUrl, ...style.data() }
            });
            //Await for all promises to be completed, then set state
            Promise.all(styleNames).then(completed => {
                this.setState({ styles: completed });
            });
        }
        catch (error) {
            //TO DO CHANGE ERROR HANDLING!!
        }
    }

    deleteStyle = async style => {
        try {
            this.setState({loading: true});
            await this.styleRef.doc(style.id).delete();
            let newArr= this.state.styles.filter(oldStyle=> oldStyle.id!==style.id);
            await this.storageRef.child(style.src).delete();
            let error = newArr.length === 0 ? 'Brak dodanych styli' : null;
            this.setState({styles: newArr, error: error, loading: false});
        }
        catch(error) {

        }

    }

    editStyle = async () =>{
        this.setState({loading: true});
        let editedStyle = { name: this.state.name, src: this.state.src };
        try{
        if (document.getElementById('picture').files[0] !== undefined) {
            let file = document.getElementById('picture').files[0];
            if (file.name !== this.state.src) {
                let fileRef = this.storageRef.child(file.name);
                editedStyle.src = `/img/styles/${file.name}`;
                await fileRef.put(file);
            }
        }
        await this.styleRef.doc(this.state.id).update(editedStyle);
        editedStyle.url = await this.storageRef.child(editedStyle.src).getDownloadURL();
        editedStyle.id = this.state.id;
        let index = this.state.styles.findIndex((style) => style.id === this.state.id);
        let updatedArr = this.state.styles;
        updatedArr[index] = editedStyle;
        this.setState({ styles: updatedArr, loading: false });
        document.getElementById('cancel').click();
        document.getElementById('picture').value= '';
        }
        catch(error) {
            console.log(error);
        }
    }

    addStyle = async () =>{
        this.setState({loading: true});
        let file = document.getElementById('picture').files[0];
        let fileRef = this.storageRef.child(file.name);
        try{
            await fileRef.put(file);
            let newStyle = { name: this.state.name, src: `${file.name}` }
            let docRef = await this.styleRef.add(newStyle);
            newStyle.id = docRef.id;
            newStyle.url = await this.storageRef.child(newStyle.src).getDownloadURL();
            let updatedArr = this.state.styles;
            updatedArr.push(newStyle);
            this.setState({ styles: updatedArr, loading: false });
            document.getElementById('cancel').click();
            document.getElementById('picture').value= '';
        }
        catch(error) {
            console.log(error);
        }
    }

    openBlankModal=()=>{
        this.setState({name: '', src: '', id: null});
        document.getElementById('openModal').click();
    }

    openEditModal=(style)=>{
        this.setState({name: style.name, src: style.src, id: style.id});
        document.getElementById('openModal').click();
    }

    onImageLoaded = () => {
        this.imagesLoaded++;
        if(this.imagesLoaded === this.state.styles.length){
            this.imagesLoaded = 0;
            this.setState({loading: false});
        }
    }

    renderStylesList() {
        if (this.state.error)
            return <div className="admin-page-content"><div className="alert alert-primary">{this.state.error}</div></div>
        if (this.state.styles) {
            return this.state.styles.map(style => {
                return (
                    <div className="paint" style={{ cursor: 'default' }} key={style.id}>
                        <div className='thumb'>
                            <img className="img-thumbnail" onLoad={this.onImageLoaded} src={style.url} alt={style.name} />
                        </div>
                        <h4>{style.name}</h4>
                        <span className="exh-buttons">
                            <i onClick={() => this.openEditModal(style)} className="far fa-edit icon"></i>
                            <i onClick={() => this.deleteStyle(style)} className="fas fa-trash icon"></i>
                        </span>
                    </div>
                )
            });
        }
    }

    renderModal= () =>{
    let form= (
        <>
            <div className="form-group row">
                <label htmlFor="name">Nazwa</label>
                <input  className="form-control" 
                onChange={(e)=>{ e.target.value.length < 3 || e.target.value.length > 15 ? this.errors.name = true: this.errors.name = false;
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
                   id={this.state.id} 
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
                    {this.state.loading && ReactDOM.createPortal(<Loading fullPage={true} />, document.querySelector("body"))}
            </div>
        )
    }
}


export default StylesAdmin;
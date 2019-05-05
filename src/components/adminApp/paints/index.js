import React from 'react';
import ReactDOM from 'react-dom'
import ModalForm from '../modalForm';

import Loading from '../../loading/loading';
import onErrorHandler from '../../../helperFunctions/onErrorHandler';
import FirebaseContext from '../../../api/firebaseContext';


class PaintsAdmin extends React.Component {
    static contextType = FirebaseContext;
    storageRef = this.context.storage;
    paintsRef = this.context.firestore.collection('styles');
    imageLoadedCount = 0;

    state = {
        paints: null,
        selectedStyleID: 0,
        styles: null,
        error: null,
        loading: true,
        //Paint from form
        id: null,
        title: '',
        src: '',
        xdim: '',
        ydim: '',
        styleID: 0
    }

    formErrors = {
        title: null,
        xdim: null,
        ydim: null
    }

    getDownloadUrl = async pic =>{
        try {
            let newUrl = await this.storageRef.child(pic.data().src).getDownloadURL();
            return { id: pic.id, url: newUrl, ...pic.data() }
        }
        catch (error) {
            this.setState({ paints: [], loading: false, error: "Error" });
            throw (error);
        }
    }

    getPics = async id => {
        try {
            const paintsResp = await this.paintsRef.doc(id).collection('pics').get();
            const paints = paintsResp.docs.map(async pic => {
                return await this.getDownloadUrl(pic);
            });
            Promise.all(paints).then(completed => {
                if(completed.length === 0 )
                {
                    this.setState({ paints: completed, loading: false, error: 'Brak wystaw do wyświetlenia' });
                }
                else {
                    this.setState({ paints: completed, error: false });
                }
            });
        }
        catch (error) {
            this.setState({ paints: [], loading: false, error: "Error" });
        }
    }

    async componentDidMount() {
        if (this.state.styles === null) {
            try {
                const resp = await this.paintsRef.get();
                const styles = resp.docs.map(style => {
                    return { id: style.id, ...style.data() }
                });
                await this.setState({ styles, selectedStyleID: styles[0].id });
                this.getPics(this.state.selectedStyleID);
            }
            catch (error) {
            }
        }
    }

    handleChange = async styleID => {
        this.setState({ loading: true });
        this.imageLoadedCount = 0;
        try {
            this.getPics(styleID);
            this.setState({ selectedStyleID: styleID });
        }
        catch (error) {
            let verifiedError = onErrorHandler(error);
            if (verifiedError === 404) {
                this.setState({ paints: null, error: 'Brak obrazów w tej kategorii', selectedStyleID: styleID });
            }
        }
    }

    generatePaintFromState = () => {
        return {
            title: this.state.title,
            src: this.state.src,
            xdim: this.state.xdim,
            ydim: this.state.ydim,
            styleID: this.state.styleID
        };
    }

    onEditPaint = async (e) => {
        this.setState({ loading: true, error: false });
        let editedPaint = this.generatePaintFromState();
        if (document.getElementById('picture').files[0] !== undefined) {
            let file = document.getElementById('picture').files[0];
            if (file.name !== this.state.src) {
                editedPaint.src = `${editedPaint.styleID}/${file.name}`;
                let picRef = this.storageRef.child(`${editedPaint.src}`);
                try {
                    await picRef.put(file);
                }
                catch (error) {
                    this.setState({ loading: false, error: true });
                }
            }
        }
        try {
            const tempPaint = this.paintsRef.doc(editedPaint.styleID).collection('pics').doc(this.state.id);
            await tempPaint.update(editedPaint);
            editedPaint.id = this.state.id;
            let index = this.state.paints.findIndex((paint) => paint.id === editedPaint.id);
            let updatedArr = this.state.paints;
            if (editedPaint.styleID === this.state.selectedStyleID) {
                editedPaint.url = await this.storageRef.child(editedPaint.src).getDownloadURL();
                updatedArr[index] = editedPaint;
                this.setState({ paints: updatedArr, loading: false, error: false });
            }
            else {
                updatedArr.splice(index, 1);
                this.setState({ paints: updatedArr, loading: false, error: false });
            }
            document.getElementById('cancel').click();
            document.getElementById('picture').value = '';
        }
        catch (error) {
            let verifiedError = onErrorHandler(error);
            if (verifiedError === 400) {
                // Error on validation
            }
            if (verifiedError === 404) {
                // Not found paint  
            }
        }
    };

    onAddPaint = async () => {
        this.setState({loading: true});
        let newPaint = this.generatePaintFromState();
        let file = document.getElementById('picture').files[0];
        newPaint.src = `${this.state.styleID}/${file.name}`;
        let picRef = this.storageRef.child(`${newPaint.src}`);
        try {
            await picRef.put(file);
            newPaint.url = await picRef.getDownloadURL();
            let tempRef = this.paintsRef.doc(newPaint.styleID).collection('pics');
            const docRef = await tempRef.add(newPaint);
            newPaint.id = docRef.id;
            let updatedArr = this.state.paints ? this.state.paints : [];
            if (newPaint.styleID === this.state.selectedStyleID) {
                updatedArr.push(newPaint);
                this.setState({ paints: updatedArr, error: null, loading: false });
            } else {
                this.setState({ error: null, loading: false });
            }
            document.getElementById('cancel').click();
            document.getElementById('picture').value = '';
        }
        catch(error) {
            console.log(error);
            this.setState({loading: false, error: true});
            document.getElementById('cancel').click();
            document.getElementById('picture').value = '';
        }
    };

    onDeletePaint = async (paint) => {
        this.setState({loading: true});
        try {
        const paintRef = this.paintsRef.doc(paint.styleID).collection('pics').doc(paint.id);    
        await paintRef.delete();
        let updatedArr = this.state.paints.filter(oldPaint => oldPaint.id !== paint.id);
        let error = updatedArr.length === 0 ? 'Brak obrazów w tej kategorii' : null;
        this.setState({ paints: updatedArr, error: error, loading: false });
        }
        catch(error){
            this.setState({ loading: false });
            let verifiedError = onErrorHandler(error);
            if (verifiedError === 404) {
                // Not found paint to delete
            }
        }
    }

    openBlankModal = () => {
        this.setState({
            id: null,
            title: '',
            src: '',
            xdim: '',
            ydim: '',
            styleID: this.state.selectedStyleID
        });
        document.getElementById('openModal').click();
    }

    openEditModal = (paint) => {
        this.setState({
            id: paint.id,
            title: paint.title,
            src: paint.src,
            xdim: paint.xdim,
            ydim: paint.ydim,
            styleID: this.state.selectedStyleID
        });
        document.getElementById('openModal').click();
    }


    renderDropDownList = () => {
        if (this.state.styles)
            return this.state.styles.map(style => {
                return (
                    <option value={style.id} key={style.id}>{style.name}</option>
                );
            });
        return null
    };

    onImageLoaded = () =>{
        this.imageLoadedCount++;
        if(this.imageLoadedCount === this.state.paints.length) {
            this.setState({loading: false});
        }
    }

    renderPaints = () => {
        if (!this.state.error && this.state.paints)
            return this.state.paints.map(paint => {
                return (
                    <div className="paint" key={paint.id}>
                        <div className='thumb'>
                            <img onLoad={this.onImageLoaded} className="img-thumbnail" src={paint.url} alt={paint.title} />
                        </div>
                        <div className="description">
                            <span>{paint.title}</span>
                            <span>{paint.xdim} x {paint.ydim} cm</span>
                        </div>
                        <span className="exh-buttons">
                            <i className="far fa-edit icon" onClick={() => this.openEditModal(paint)}></i>
                            <i className="fas fa-trash icon" onClick={() => this.onDeletePaint(paint)}></i>
                        </span>
                    </div>
                );
            });
        
        if(this.state.error)
            return <div className="admin-page-content mt-4"><div className="alert alert-primary">{this.state.error}</div></div>
        else {
            return <div></div>
        }
    };

    renderModalForm = () => {
        let form = (
            <>
                <div className="form-group row">
                    <label htmlFor="title">Tytuł</label>
                    <input className="form-control" onChange={(e) => {
                        this.formErrors.title = e.target.value.length < 3;
                        this.setState({ title: e.target.value })
                    }}
                        value={this.state.title} type='text' name='name' />
                </div>
                <div className="form-group row">
                    <label htmlFor="xdim">Szerokość</label>
                    <input className="form-control" onChange={(e) => {
                        this.formErrors.ydim = e.target.value < 50 || e.target.value > 10000;
                        this.setState({ xdim: e.target.value })
                    }}
                        value={this.state.xdim} type='text' name='xdim' />
                </div>
                <div className="form-group row">
                    <label htmlFor="ydim">Wysokość</label>
                    <input className="form-control" onChange={(e) => {
                        this.formErrors.ydim  = e.target.value < 50 || e.target.value > 10000;
                        this.setState({ ydim: e.target.value })
                    }}
                        value={this.state.ydim} type='text' name='ydim' />
                </div>
                <div className="form-group row">
                    <label htmlFor="style">Technika</label>
                    <select className="form-control" value={this.state.styleID} onChange={(e) => this.setState({ styleID: e.target.value })}>
                        {this.renderDropDownList()}
                    </select>
                </div>
                <div className="form-group row">
                    <label htmlFor="picture">Zdjęcie</label>
                    <input className="form-control" type='file' id='picture' name='picture' />
                </div>
            </>
        );


        return (
            <ModalForm title={'Zarządzaj obrazami'}
                id={this.state.id}
                add={this.onAddPaint}
                edit={this.onEditPaint}
                openBlankModal={this.openBlankModal}
                errors={this.formErrors}
                sendingFiles={true}>
                {form}
            </ModalForm>
        );
    };

    render() {
        return (
            <div className="admin-page-content">
                <div className="admin-add-container" style={{ justifyContent: 'space-between' }}>
                    <select className="form-control col-8" value={this.state.selectedStyleID} onChange={(e) => this.handleChange(e.target.value)}>
                        {this.renderDropDownList()}
                    </select>
                    {this.renderModalForm()}
                </div>
                {this.renderPaints()}
                {this.state.loading && ReactDOM.createPortal(<Loading fullPage={true} />, document.querySelector('body'))}
            </div>
        )
    }
}


export default PaintsAdmin;
import React from 'react';
import ReactDOM from 'react-dom';
import onErrorHandler from '../../../helperFunctions/onErrorHandler';
import './admin-exh.css';
import ModalForm from '../modalForm';
import Loading from '../../loading/loading';
import FirebaseContext from '../../../api/firebaseContext';

class ExhibitionsAdmin extends React.Component {
    static contextType = FirebaseContext;
    
    //DB Reference
    exhRef = this.context.firestore.collection("exhibitions");

    state = { exhibitions: null, error: null, city: '', place: '', date: '', id: null, loading: true };

    //Errors object, which is sended to Modal Form
    errors = { place: null, city: null, date: null};

    async componentDidMount() {
        try {
            const resp = await this.exhRef.orderBy('date', 'desc').get();
            let exhArray = resp.docs.map(exh => {
                return {id: exh.id, ...exh.data()}; 
            });
            this.setState({exhibitions: exhArray, loading: false});
        }
        catch(error) {
            this.setState({loading:false});
            let verifiedError = onErrorHandler(error);
            if (verifiedError === 404) {
                //No exh available
            }
        }
    }

    deleteExh = async (exh) => {
        try {
            this.setState({loading: true});
            await this.exhRef.doc(exh.id).delete()
            let updatedExh = await this.state.exhibitions.filter((oldExh) => (oldExh !== exh));
            updatedExh.sort((a, b) => b.date - a.date);
            this.setState({ exhibitions: updatedExh, loading: false });
        }
        catch(error) {
            this.setState({loading: false});
            let verifiedError = onErrorHandler(error);
            if(verifiedError === 404){
            console.log('Nie znaleziono wystawy');
            }
        }
    }

    addExh = async () => {
        this.setState({loading: true});
        let date = new Date(this.state.date).getTime();
        let newExh = { place: this.state.place, city: this.state.city, date: date };

        try{
            const docRef = await this.exhRef.add(newExh);
            let newExhArray = this.state.exhibitions;
            newExhArray.push({id: docRef.id, ...newExh});
            newExhArray.sort((a, b) => b.date - a.date);
            this.setState({ exhibitions: newExhArray, loading: false });
            document.getElementById('cancel').click();
        }
        catch(error) {
            this.setState({loading: false});
            onErrorHandler(error);
        }
    }

    editExh = async () => {
        this.setState({loading: true});
        let date = new Date(this.state.date).getTime();
        let newExh = { place: this.state.place, city: this.state.city, date: date };
        newExh.id = this.state.id;
        try {
            await this.exhRef.doc(newExh.id).update(newExh);
            let index = this.state.exhibitions.findIndex((exh) => exh.id === newExh.id);
            let newArr = this.state.exhibitions;
            newArr[index] = newExh;
            newArr.sort((a, b) => b.date - a.date);
            this.setState({ exhibitions: newArr, loading: false });
            document.getElementById('cancel').click();
        }
        catch(error) {
            this.setState({loading: false});
            let verifiedError = onErrorHandler(error);
            if(verifiedError===400){
               //error on validation on backend side 
            }
        }
    }

    openEditModal = (exh) => {
        let date = new Date(exh.date);
        let formattedData = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate() + 1)).slice(-2)}`;
        this.setState({ city: exh.city, place: exh.place, date: formattedData, id: exh.id });
        document.getElementById('openModal').click();

    }

    openBlankModal = () => {
        this.setState({ city: '', place: '', date: '', id: null });
        document.getElementById('openModal').click();
    }

    renderExhList = () => {
        if (this.state.exhibitions !== null) {
            return this.state.exhibitions.map(exh => {
                let formatedDate = `${new Date(exh.date).getFullYear()}`;
                return (<div className="exh exh-admin mt-1" key={exh.id}>
                    <span className="date">{formatedDate}</span>
                    <span>{exh.place}, {exh.city}</span>
                    <span className="exh-buttons">
                        <i onClick={() => this.openEditModal(exh)} className="far fa-edit icon"></i>
                        <i onClick={() => this.deleteExh(exh)} className="fas fa-trash icon"></i>
                    </span>
                </div>);
            })
        }
        else {
            if (!this.state.loading)
            return <div className="alert alert-primary">{this.state.error}</div>
        }

    }

    renderModal = () => {
        const form = (
             <React.Fragment>
                    <div className="form-group row mt-3">
                        <label htmlFor="place">Miejsce wystawy</label>
                        <input
                            value={this.state.place}
                            onChange={(e) =>{this.errors.place = !(e.target.value.length > 2 && e.target.value.length < 30);
                                             this.setState({ place: e.target.value })}}
                            className="form-control"
                            name="place"
                            type="text"
                            placeholder="Miejsce wystawy" />
                    </div>
                    <div className="form-group row mt-3">
                        <label htmlFor="city">Miasto wystawy</label>
                        <input
                            value={this.state.city}
                            onChange={(e) =>{this.errors.city = !(e.target.value.length > 2 && e.target.value.length < 30); 
                                             this.setState({ city: e.target.value })}}
                            className="form-control"
                            name="city"
                            type="text"
                            placeholder="Miasto wystawy" />
                    </div>
                    <div className="form-group row mt-3">
                        <label htmlFor="date">Data wystawy</label>
                        <input
                            value={this.state.date}
                            onChange={(e) => {this.errors.date = !(new Date(e.target.value) > new Date('1960-01-01')) && (new Date(e.target.value) < new Date());
                                              this.setState({ date: e.target.value })}}
                            className="form-control"
                            min="1960-01-01" 
                            max={new Date().toISOString().slice(0,10)}
                            name="date"
                            type="date" />
                    </div>
                </React.Fragment>);
        return (
            <ModalForm title={'Zarządzaj wystawami'}
                       id={this.state.id} 
                       add={this.addExh} 
                       edit={this.editExh} 
                       openBlankModal={this.openBlankModal}
                       errors={this.errors}
                       sendingFiles= {false}>
                {form}
            </ModalForm>
        );
    }

    render() {
        return (<div className="admin-page-content">
            {this.renderModal()}
            {this.renderExhList()}
            {this.state.loading && ReactDOM.createPortal(<Loading fullPage={true} />, document.querySelector("body"))}
        </div>);
    }
}

export default ExhibitionsAdmin;
import React from 'react';
import exhApi from '../../../api/exhibitions';
import onErrorHandler from '../../../helperFunctions/onErrorHandler';

import './admin-exh.css';
import ModalForm from '../modalForm';

class exhibitionsAdmin extends React.Component {

    state = { exhibitions: null, error: null, city: '', place: '', date: '', exhID: null };

    errors = { place: null, city: null, date: null};

    componentDidMount() {
        exhApi.get('index/')
            .then((response) => {
                let exhArray = response.data.sort((a, b) => b.date - a.date);
                this.setState({ exhibitions: exhArray });
            })
            .catch((error) => {
                let verifiedError = onErrorHandler(error);
                if(verifiedError === 404){
                    this.setState({ error: 'Brak wystaw do wyświetlenia' });
                }
                console.log(error.response)
            });
    }


    deleteExh = (exh) => {
        exhApi.delete(`delete/${exh.exhibitionID}`,  { headers: {'Authorization': "bearer " + localStorage.getItem('jwt')}})
            .then(async () => {
                let updatedExh = await this.state.exhibitions.filter((oldExh) => (oldExh !== exh));
                updatedExh.sort((a, b) => b.date - a.date);
                this.setState({ exhibitions: updatedExh });
            }).catch((error) => {
                let verifiedError = onErrorHandler(error);
                if(verifiedError === 404){
                    console.log('Nie znaleziono wystawy');
                }
            });
    }


    addExh = () => {
        let date = new Date(this.state.date).getTime();
        let newExh = { place: this.state.place, city: this.state.city, date: date };

        exhApi.post('add/', newExh,  { headers: {'Authorization': "bearer " + localStorage.getItem('jwt')}})
            .then((response) => {
                let newExh = this.state.exhibitions;
                newExh.push(response.data);
                newExh.sort((a, b) => b.date - a.date);
                this.setState({ exhibitions: newExh });
                document.getElementById('cancel').click();
            })
            .catch((error) => {
                console.log(error);
                let verifiedError = onErrorHandler(error);
                if(verifiedError===400){
                    //error on validation on backend side 
                }
            });
    }


    editExh = () => {
        let date = new Date(this.state.date).getTime();
        let newExh = { place: this.state.place, city: this.state.city, date: date };
        newExh.exhibitionID = this.state.exhID;
        exhApi.put(`update/${newExh.exhibitionID}`, newExh,  { headers: {'Authorization': "bearer " + localStorage.getItem('jwt')}})
            .then((response) => {
                let index = this.state.exhibitions.findIndex((exh) => exh.exhibitionID === newExh.exhibitionID);
                let newArr = this.state.exhibitions;
                newArr[index] = newExh;
                newArr.sort((a, b) => b.date - a.date);
                this.setState({ exhibitions: newArr });
                document.getElementById('cancel').click();
            }).catch((error) => {
                let verifiedError = onErrorHandler(error);
                if(verifiedError===400){
                    //error on validation on backend side 
                }
            });
    }


    openEditModal = (exh) => {
        let date = new Date(exh.date);
        let formattedData = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate() + 1)).slice(-2)}`;
        this.setState({ city: exh.city, place: exh.place, date: formattedData, exhID: exh.exhibitionID });
        document.getElementById('openModal').click();

    }

    openBlankModal = () => {
        this.setState({ city: '', place: '', date: '', exhID: null });
        document.getElementById('openModal').click();
    }

    renderExhList = () => {
        if (this.state.exhibitions !== null) {
            return this.state.exhibitions.map(exh => {
                let formatedDate = `${new Date(exh.date).getFullYear()}`;
                return (<div className="exh exh-admin mt-1" key={exh.exhibitionID}>
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
            return <div className="alert alert-primary">{this.state.error}</div>
        }

    }

    renderModal = () => {
        const form = (
             <>
                    <div className="form-group row mt-3">
                        <label htmlFor="place">Miejsce wystawy</label>
                        <input
                            value={this.state.place}
                            onChange={(e) =>{(e.target.value.length > 2 && e.target.value.length < 30) ? this.errors.place = true : this.errors.place = false; 
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
                            onChange={(e) =>{(e.target.value.length > 2 && e.target.value.length < 30) ? this.errors.city = true : this.errors.city = false; 
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
                            onChange={(e) => {(new Date(e.target.value) > new Date('1960-01-01')) && (new Date(e.target.value) < new Date()) ? this.errors.date = true : this.errors.date = false;
                                              this.setState({ date: e.target.value })}}
                            className="form-control"
                            min="1960-01-01" 
                            max={new Date().toISOString().slice(0,10)}
                            name="date"
                            type="date" />
                    </div>
                </>);


        return (
            <ModalForm title={'Zarządzaj wystawami'}
                       id={this.state.exhID} 
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
        </div>);
    }
}

export default exhibitionsAdmin;
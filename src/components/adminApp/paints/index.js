import React from 'react';
import ModalForm from '../modalForm';
import updatePic from '../../../helperFunctions/updatePic';
import paintApi from '../../../api/paints';
import styleApi from '../../../api/styles';
import onErrorHandler from '../../../helperFunctions/onErrorHandler';


class PaintsAdmin extends React.Component{
    state= {paints: null, 
            selectedStyleID: 0, 
            styles: null, 
            error: null, 
            //Paint from form
            paintID: null,
            title: '',
            src: '',
            xdim: '',
            ydim: '',
            styleID: 0
    }

    formErrors= {
        title: null,
        xdim: null,
        ydim: null
    }

    componentDidMount(){
        if(this.state.styles===null){
            
            styleApi.get('index/')
            .then((response)=>{
                this.setState({styles: response.data, selectedStyleID: response.data[0].styleID});
            }).then(()=>{
                paintApi.get(`index/${this.state.selectedStyleID}`).then(response=>{
                    this.setState({paints: response.data});
                });
            })
            .catch(error=>{
                let verifiedError = onErrorHandler(error);
                if(verifiedError === 404){
                    this.setState({ error: 'Brak wystaw do wyświetlenia' });
                }

            });
        }
    }



    handleChange= (styleID)=>{
        paintApi.get(`index/${styleID}`).then(response=>{
            this.setState({paints: response.data, error: null, selectedStyleID: styleID});
        }).catch(error=>{
            let verifiedError = onErrorHandler(error);
            if(verifiedError===404){
                this.setState({paints: null, error: 'Brak obrazów w tej kategorii', selectedStyleID: styleID}); 
            }
        });
    }

    generatePaintFromState = () =>{
        return {
            title: this.state.title,
            src: this.state.src,
            xdim: this.state.xdim,
            ydim: this.state.ydim,
            styleID: this.state.styleID
        };
    }

    onEditPaint = async (e) =>{
        let editedPaint = this.generatePaintFromState();
        editedPaint.paintID = this.state.paintID;
        if (document.getElementById('picture').files[0] !== undefined) {
            let file = document.getElementById('picture').files[0];
            if (file.name !== this.state.src) {
                editedPaint.src = `/img/${file.name}`;
                await updatePic(file, 'paints', localStorage.getItem('jwt'));
            }   
        }
        paintApi.put(`update/${this.state.paintID}`, editedPaint,  { headers: {'Authorization': "bearer " + localStorage.getItem('jwt')}})
            .then((response) => {
                let index = this.state.paints.findIndex((paint) => paint.paintID === editedPaint.paintID);
                    let updatedArr = this.state.paints;
                if (editedPaint.styleID === parseInt(this.state.selectedStyleID)) {
                    updatedArr[index] = editedPaint;
                    this.setState({ paints: updatedArr });
                }
                else{
                    updatedArr.splice(index, 1);
                    this.setState({paints: updatedArr});
                }
                document.getElementById('cancel').click();
                document.getElementById('picture').value= '';
            }).catch((error) => {
                
                let verifiedError = onErrorHandler(error);
                if(verifiedError === 400){
                    // Error on validation
                }

                if(verifiedError === 404){
                    // Not found paint  
                }
        });
    };

    onAddPaint = async (e)=>{
        let newPaint = this.generatePaintFromState();
        let file = document.getElementById('picture').files[0];
        newPaint.src = `/img/${file.name}`;
        await updatePic(file, 'paints', localStorage.getItem('jwt'));
        paintApi.post('add/', newPaint,  { headers: {'Authorization': "bearer " + localStorage.getItem('jwt')}})
            .then((response) => {
                    let updatedArr = this.state.paints ? this.state.paints : [];
                    if (newPaint.styleID === this.state.selectedStyleID) {
                        updatedArr.push(response.data);
                        this.setState({ paints: updatedArr, error: null });
                }
                document.getElementById('cancel').click();
                document.getElementById('picture').value= '';
            }).catch((error) => {
                let verifiedError = onErrorHandler(error);
                if(verifiedError === 400){
                    // Error on validation
                }
        });
    };

    onDeletePaint = async (paint)=>{
        paintApi.delete(`delete/${paint.paintID}`,  { headers: {'Authorization': "bearer " + localStorage.getItem('jwt')}}).then(()=>{
            let updatedArr = this.state.paints.filter(oldPaint => oldPaint.paintID !== paint.paintID);
            let error = updatedArr.length === 0 ? 'Brak obrazów w tej kategorii' : null;
            this.setState({paints: updatedArr, error: error});
        }).catch((error)=>{
            let verifiedError = onErrorHandler(error);
            if(verifiedError === 404){
                // Not found paint to delete
            }
        });
    }

    openBlankModal= ()=>{
        this.setState({
            paintID: null,
            title: '',
            src: '',
            xdim: '',
            ydim: '',
            styleID: this.state.selectedStyleID});
        document.getElementById('openModal').click();
    }

    openEditModal= (paint)=>{
        this.setState({
            paintID: paint.paintID,
            title: paint.title,
            src: paint.src,
            xdim: paint.xdim,
            ydim: paint.ydim,
            styleID: paint.styleID});
        document.getElementById('openModal').click();
    }


    renderDropDownList=()=>{
        return this.state.styles.map(style=>{
            return(
            <option value={style.styleID} key={style.styleID}>{style.name}</option>
            );
        });
    };

    renderPaints=()=>{
        if(this.state.paints!==null && this.state.error===null)
        return this.state.paints.map(paint=>{
            return(
                <div className="paint" key={paint.paintID}>
                    <div className='thumb'>
                        <img className="img-thumbnail" src={paint.src} alt={paint.title} />
                    </div>
                    <div className="description">
                        <span>{paint.title}</span>
                        <span>{paint.xdim} x {paint.ydim} cm</span>
                    </div>
                    <span className="exh-buttons">
                            <i className="far fa-edit icon" onClick={()=>this.openEditModal(paint)}></i>
                            <i className="fas fa-trash icon" onClick={()=> this.onDeletePaint(paint)}></i>
                    </span>
                </div>
            );
            });
            
        return <div className="admin-page-content"><div className="alert alert-primary">{this.state.error}</div></div>
    };

    renderModalForm=()=>{
        let form=(
               <>
                    <div className="form-group row">
                        <label htmlFor="title">Tytuł</label>
                        <input className="form-control" onChange={(e) =>{ e.target.value.length > 3 ? this.formErrors.title= true : this.formErrors.title= false; 
                                                                          this.setState({ title: e.target.value })}} 
                                                                          value={this.state.title} type='text' name='name' />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="xdim">Szerokość</label>
                        <input className="form-control" onChange={(e) =>{e.target.value > 50 && e.target.value < 10000 ? this.formErrors.xdim = true : this.formErrors.xdim = false;
                                                                        this.setState({ xdim: e.target.value })}}
                                                                        value={this.state.xdim} type='text' name='xdim' />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="ydim">Wysokość</label>
                        <input className="form-control" onChange={(e) =>{e.target.value > 50 && e.target.value < 10000 ? this.formErrors.ydim = true : this.formErrors.ydim = false;
                                                                 this.setState({ ydim: e.target.value })}}
                                                                 value={this.state.ydim} type='text' name='ydim' />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="style">Technika</label>
                        <select className="form-control" value={this.state.styleID} onChange={(e)=> this.setState({styleID: e.target.value})}>
                            {this.renderDropDownList()}
                        </select>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="picture">Zdjęcie</label>
                        <input className="form-control" type='file' id='picture' name='picture' />
                    </div>
                </>
        );


        return(
        <ModalForm title={'Zarządzaj obrazami'} 
                   id={this.state.paintID} 
                   add={this.onAddPaint} 
                   edit={this.onEditPaint} 
                   openBlankModal={this.openBlankModal}
                   errors= {this.formErrors}
                   sendingFiles= {true}>
            {form}
        </ModalForm>
        );
    };

    render(){
        if(this.state.styles!==null)
        return(
            <div className="admin-page-content">
                <div className="admin-add-container" style={{justifyContent: 'space-between'}}>
                    <select className="form-control col-8" value={this.state.selectedStyleID} onChange={(e)=> this.handleChange(e.target.value)}>
                        {this.renderDropDownList()}
                    </select>
                    {this.renderModalForm()}
                </div>

                {this.renderPaints()}
            </div>
        )
        else {
            return <div>Ładowanie</div>
        }
    }
}


export default PaintsAdmin;
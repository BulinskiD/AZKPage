import React from 'react';

import onErrorHandler from '../../../helperFunctions/onErrorHandler';
import FirebaseContext from '../../../api/firebaseContext';
import Loading from '../../loading/loading';
import './exhibitions.css';




class Exhibitions extends React.Component{
    static contextType = FirebaseContext;

    exhRef = this.context.firestore.collection('exhibitions');
    
    state={exhArray: [], loading: true}

    async componentDidMount(){
        try{
        const resp = await this.exhRef.orderBy('date', 'desc').get();
        let exhArray = resp.docs.map(exh => {
            return {id: exh.id, ...exh.data()}; 
            });
        this.setState({exhArray, loading: false});
        }
        catch(error) {
            let verifiedError = onErrorHandler(error);
            if (verifiedError === 404) {
                //No exh available
            }
        }
    }

    renderExhibition= ()=>
    {
        return this.state.exhArray.map(exh=>{
            let date= new Date(exh.date);
            let formatedDate= `${date.getFullYear()}`;
            return <div className="exh" key={exh.id}><span className="date">{formatedDate}</span><span>{exh.place}, {exh.city}</span></div>
        });
    }
   
    render(){
        return (
            <div id="exhibitions"><div className="exhShape d-lg-block d-none" data-aos="fade-right"
            data-aos-duration="3000" />
            <div className="exhShapeRight d-lg-block d-none" data-aos="fade-in"
                data-aos-duration="3000" />
            <div className="offset-lg-4 col-lg-8 col-12 offset-0"><h2>Wystawy</h2>
            {this.renderExhibition()}
            </div>
            {this.state.loading && <Loading fullPage={false} />}</div>
        );
    }
}

export default Exhibitions;
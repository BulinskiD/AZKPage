import React from 'react';

import onErrorHandler from '../../../helperFunctions/onErrorHandler';
import FirebaseContext from '../../../api/firebaseContext';
import Loading from '../../loading/loading';
import './exhibitions.css';

class Exhibitions extends React.Component{
    static contextType = FirebaseContext;

    //DB Reference
    exhGroupRef = this.context.firestore.collection("exhibitions").doc('group').collection('exhibitions');
    exhIndividualsRef = this.context.firestore.collection("exhibitions").doc('individuals').collection('exhibitions');

    exhRef = this.exhIndividualsRef;

    state={exhArray: [], loading: true, selectedExh: 'individual'}

    selectExh = (exh) =>{
        this.setState({loading: true});
        if(exh === 'group') {
            this.exhRef = this.exhGroupRef;
            this.setState({selectedExh: 'group'});
        } else {
            this.exhRef = this.exhIndividualsRef;
            this.setState({selectedExh: 'individual'});
        } 
        this.fetchExh();
    }

    fetchExh = async () => {
        try {
            const resp = await this.exhRef.orderBy('date', 'desc').get();
            let exhArray = resp.docs.map(exh => {
                return { id: exh.id, ...exh.data() };
            });
            this.setState({ exhArray, loading: false });
        }
        catch (error) {
            let verifiedError = onErrorHandler(error);
            if (verifiedError === 404) {
                //No exh available
            }
        }
    }

    componentDidMount() {
        this.fetchExh();
    }

    renderExhibition= ()=>
    {
        return this.state.exhArray.map(exh=>{
            let date= new Date(exh.date);
            let formatedDate= `${date.getFullYear()}`;
            return <div className="exh" key={exh.id}><span className="date">{formatedDate}</span><span>{exh.place}, {exh.city}</span></div>
        });
    }
   
    renderTabs = () =>{
        return (<div className="tabs-nav">
              <span className={this.state.selectedExh === 'individual' ? 'selected' : ''} onClick={() => this.selectExh('individual')}>Wystawy indywidualne</span>
              <span className={this.state.selectedExh === 'group' ? 'selected' : ''} onClick={() => this.selectExh('group')}>Wystawy grupowe</span>
        </div>);
    }
    render(){
        return (
            <div id="exhibitions"><div className="exhShape d-lg-block d-none" data-aos="fade-right"
            data-aos-duration="3000" />
            <div className="exhShapeRight d-lg-block d-none" data-aos="fade-in"
                data-aos-duration="3000" />
            <div className="offset-lg-4 col-lg-8 col-12 offset-0 exhibitions-container"><h2>Wystawy</h2>
            {this.renderTabs()}
            {!this.state.loading && this.renderExhibition()}
            {this.state.loading && <Loading fullPage={false} />}</div>
            </div>
        );
    }
}

export default Exhibitions;
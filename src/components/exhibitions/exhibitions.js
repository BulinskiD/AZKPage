import React from 'react';

import exhApi from '../../api/exhibitions';
import onErrorHandler from '../../helperFunctions/onErrorHandler';
import './exhibitions.css';




class exhibitions extends React.Component{

    
    state={exhArray: []}

    async componentDidMount(){
        await exhApi.get('index/')
                .then((response)=>{
                    let exhArray= response.data.sort((a, b)=> b.date - a.date);
                    this.setState({exhArray: exhArray})})
                .catch((error)=>{
                    let verifiedError = onErrorHandler(error);
                    if(verifiedError===404){
                        //No exh available 
                    }
                    });
    }
   
    renderExhibition= ()=>
    {
        return this.state.exhArray.map(exh=>{
            let date= new Date(exh.date);
            let formatedDate= `${date.getFullYear()}`;
            return <div className="exh" key={exh.exhibitionID}><span className="date">{formatedDate}</span><span>{exh.place}, {exh.city}</span></div>
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
            </div></div>
        );
    }
}

export default exhibitions;
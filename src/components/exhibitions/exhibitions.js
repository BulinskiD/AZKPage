import React from 'react';

import './exhibitions.css';


const exhArray= [{date:'2011', place:'GCK', city:'Gorlice', id:1},
{date:'2011', place:'Gorlickie Centrum Kultury', city:'Gorlice', id:2},
{date:'2011', place:'GCK', city:'Gorlice', id:3},
{date:'2011', place:'GCK', city:'Gorlice', id:4}]


export default ()=>{
    return (
        <div id="exhibitions"><div className="exhShape d-lg-block d-none" data-aos="fade-right"
        data-aos-duration="3000" />
        <div className="exhShapeRight d-lg-block d-none" data-aos="fade-in"
             data-aos-duration="3000" />
        <div className="offset-lg-4 col-lg-8 col-12 offset-0"><h2>Wystawy</h2>
        {renderExhibition()}
        </div></div>
    );
}

const renderExhibition= ()=>
{
   return exhArray.map(exh=>{
        return <div className="exh" key={exh.id}><span className="date">{exh.date}</span><span>{exh.place}, {exh.city}</span></div>
    });
}
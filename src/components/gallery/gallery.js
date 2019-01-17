import React from 'react';
import ReactDOM from 'react-dom';
import { Element } from 'react-scroll'
import { animateScroll as scroll} from 'react-scroll';
import './gallery.css';

import SelectedGallery from '../selectedGallery/selectedGallery';

class Gallery extends React.Component{

    state={selectedGalleryId: null, selectedGalleryTitle: ''};
    

    //To be replaced by fetching data from api
    styleNames=[{styleId: 1, title:'Malarstwo', src:'img/malarstwo.jpg'},
                 {styleId: 2, title:'Pastele', src: 'img/pastele.jpg'},
                 {styleId: 3, title:'Akwarele', src: 'img/akwarele.jpg'},
                 {styleId: 4, title:'Grafika', src:'img/grafika.jpg' }];


    onGallerySelected= (style)=>{
        this.setState({selectedGalleryId: style.styleId, selectedGalleryTitle: style.title});
    }

    renderMenu= ()=>{
        return this.styleNames.map(style=>{
            return (<div onClick={()=>this.onGallerySelected(style)} key={style.styleId} className="picture" style={{ backgroundImage: `url(${style.src})`}}>
            <span className="center">{style.title}</span></div>);
            });
        }

    
    closeGallery= ()=>{
        this.setState({selectedGalleryId: null, selectedGalleryTitle: ''});
        let offset=ReactDOM.findDOMNode(this)
        .getBoundingClientRect().top;
        scroll.scrollMore(offset);
    }



    render(){
    return (
        <div>
        <div id="gallery">
        <div className="left2 d-lg-block d-none" data-aos="fade-right" data-aos-duration="3000" ><span>Galeria</span></div>
        <div className="col-lg-8 offset-lg-4 offset-0 col-12">
        <h2>Galeria</h2>
        <div className="galleryMenu">
        {this.renderMenu()}
        </div>
        </div>
        </div>
        <Element name="selectedGallery"><SelectedGallery closeGallery={this.closeGallery} id={this.state.selectedGalleryId} title={this.state.selectedGalleryTitle} /></Element>
        </div>
    );
}
}


export default Gallery;
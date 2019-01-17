import React from 'react';
import ReactDOM from 'react-dom';
import { animateScroll as scroll} from 'react-scroll';

import './selectedGallery.css';



class SelectedGallery extends React.Component{

    images= [
    {title: 'Testowy Tytuł', xdim: 30, ydim: 30, year: 2000, src:'img/triangle1.JPG',styleId:1, paintId: 1},
    {title: 'Testowy Tytuł', xdim: 30, ydim: 30, year: 2000, src:'img/triangle2.JPG',styleId:1, paintId: 2},
    {title: 'Testowy Tytuł', xdim: 30, ydim: 30, year: 2000, src:'img/triangle3.JPG',styleId:1, paintId: 3},
    {title: 'Testowy Tytuł', xdim: 30, ydim: 30, year: 2000, src:'img/triangle4.JPG',styleId:1, paintId: 4}
    ]

    componentDidUpdate(){
        if(this.props.id!=null){
        let offset=ReactDOM.findDOMNode(this)
        .getBoundingClientRect().top;
        scroll.scrollMore(offset);
        }
    }

    openImageFullScreen=(image)=>{
        console.log(image);
    }

    renderImage=()=>{
       return this.images.map(image=>{
        return(<div className="paint" key={image.paintId}>
        <div className='thumb' onClick={()=>{this.openImageFullScreen(image)}}>
        <img className="img-fluid img-thumbnail" src={image.src} alt={image.title} />
        </div>
        <div className="description">
        <span>{image.title}</span>
        <span>{image.xdim} x {image.ydim} cm</span>
        <span>{image.year}</span>
        </div>
        </div>)});

    }
    

    render(){
    if(this.props.id === null){
    return null;
    }
    else{
        return (
        <div className="selectedGallery">
        <div className="close" onClick={this.props.closeGallery}><i className="fas fa-arrow-up"></i></div>
        <div className="galleryShape d-lg-block d-none" data-aos="fade-in" data-aos-duration="3000" />
        <div className="offset-lg-4 offset-0 col-lg-8 col-12 ">
        <h2>{this.props.title}</h2>
        
        {this.renderImage()}</div>
        </div>
        );
    }
}
}


export default SelectedGallery;



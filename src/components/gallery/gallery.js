import React from 'react';
import ReactDOM from 'react-dom';
import { Element } from 'react-scroll'
import { animateScroll as scroll} from 'react-scroll';
import styleApi from '../../api/styles';
import onErrorHandler from '../../helperFunctions/onErrorHandler';

import SelectedGallery from '../selectedGallery/selectedGallery';
import './gallery.css';

class Gallery extends React.Component{

    state={selectedGalleryId: null, 
           selectedGalleryTitle: '',
           styleNames: []};
    

    onGallerySelected= (style)=>{
        this.setState({selectedGalleryId: style.styleID, selectedGalleryTitle: style.name});
    }


    async componentDidMount(){
     styleApi.get('index/').then((response=>{
        this.setState({styleNames: response.data});
     })).catch((error)=>{
        let verifiedError = onErrorHandler(error);
        if(verifiedError===404){
            //No exh available 
        }
     });  
    }

    renderMenu= ()=>{
        return this.state.styleNames.map(style=>{
            return (<div onClick={()=>this.onGallerySelected(style)} key={style.styleID} 
                    className="picture" style={{ backgroundImage: `url(${style.picSrc})`}}>
                    <span className="center">{style.name}</span></div>);
            });
        }

    
    closeGallery= ()=>{
        let offset=ReactDOM.findDOMNode(this)
        .getBoundingClientRect().top;
        scroll.scrollMore(offset);
        this.setState({selectedGalleryId: null, selectedGalleryTitle: ''});
    }

    closeGalleryOnError= (error) =>{
        this.setState({selectedGalleryId: null, selectedGalleryTitle: ''});
        console.log(error)
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
        {this.state.selectedGalleryId!==null ? 
        <Element name="selectedGallery"><SelectedGallery 
                                         closeGallery={this.closeGallery} 
                                         closeGalleryOnError= {this.closeGalleryOnError}
                                         id={this.state.selectedGalleryId} 
                                         title={this.state.selectedGalleryTitle}/></Element> : ''}
        </div>
    );
}
}


export default Gallery;
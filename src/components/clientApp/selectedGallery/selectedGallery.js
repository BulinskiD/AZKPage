import React from 'react';
import ReactDOM from 'react-dom';
import { animateScroll as scroll} from 'react-scroll';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 

import onErrorHandler from '../../../helperFunctions/onErrorHandler';
import paintApi from '../../../api/paints';
import './selectedGallery.css';



class SelectedGallery extends React.Component{

    state= {styleID: this.props.id, 
            isOpen: false,
            paints: [],
            photoIndex: null};

    
    fetchPaints= ()=>{
        paintApi.get(`index/${this.props.id}`)
        .then((response)=>{
            this.setState({paints: response.data, styleID: this.props.id});})
        .catch((error)=>{
            this.props.closeGalleryOnError(error);
            let verifiedError = onErrorHandler(error);
            if(verifiedError===404){
                //No paints available 
                // TOO DOO Show it on screen
                console.log("no paints");
            }
        });
    }
    
    componentDidMount(){
        this.fetchPaints();
    }

    componentDidUpdate(){
        if(this.state.styleID !== this.props.id){
            this.fetchPaints();
        }
        let offset=ReactDOM.findDOMNode(this)
        .getBoundingClientRect().top;
        scroll.scrollMore(offset);
    }

    openImageFullScreen=(index)=>{
       this.setState({ isOpen: true, photoIndex: index});
    }

    renderImage= ()=>{
       return this.state.paints.map((image, index)=>{
        return(<div className="paint" onClick={() => { this.openImageFullScreen(index) }} key={image.paintID}>
               <div className='thumb'>
                   <img className="img-thumbnail" src={image.src} alt={image.title} />
               </div>
               <div className="description">
                   <span>{image.title}</span>
                   <span>{image.xdim} x {image.ydim} cm</span>
               </div>
           </div>)
       });
    }


    renderLightbox(){
        const {photoIndex, isOpen} = this.state;
        let paints= this.state.paints;
        return(
        <div>
        {isOpen && (
          <Lightbox
            imageTitle= {paints[photoIndex].title}
            imagePadding= {70}
            mainSrc={paints[photoIndex].src}
            nextSrc={photoIndex+1 < paints.length ? paints[(photoIndex + 1) % paints.length].src : undefined}
            prevSrc={photoIndex !==0 ? paints[(photoIndex - 1) % paints.length].src : undefined}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + paints.length - 1) % paints.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % paints.length,
              })
            }
          />
        )}
      </div>);
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
                <div className="offset-lg-4 offset-0 col-lg-8 col-12">
                    <h2>{this.props.title}</h2>

                    {this.renderImage()}
                    {this.renderLightbox()}</div>
            </div>
        );
    }
}
}


export default SelectedGallery;



import React from 'react';
import ReactDOM from 'react-dom';
import { Element } from 'react-scroll'
import { animateScroll as scroll } from 'react-scroll';
import onErrorHandler from '../../../helperFunctions/onErrorHandler';
import SelectedGallery from '../selectedGallery/selectedGallery';
import Loading from '../../loading/loading';
import FirebaseContext from '../../../api/firebaseContext';

import './gallery.css';

class Gallery extends React.Component {
    static contextType = FirebaseContext;

    styleRef = this.context.firestore.collection("styles");

    storageRef = this.context.storage;

    state = {
        selectedGalleryId: null,
        selectedGalleryTitle: '',
        styleNames: [],
        loading: true 
    };
    imagesLoadedCount = 0;

    onGallerySelected = (style) => {
        this.setState({ selectedGalleryId: style.id, selectedGalleryTitle: style.name});
    }

    async componentDidMount() {
        this.setState({loading: true});
        try{
        let styleNames = await this.styleRef.get();
        styleNames = styleNames.docs.map(async style => {
            let newUrl = await this.storageRef.child(style.data().src).getDownloadURL();
            return {id: style.id, url: newUrl,...style.data()}
        });

        //Await for all promises to be completed, then set state
        Promise.all(styleNames).then(completed => {
            this.setState({styleNames: completed});
        });
        }
        catch(error){
            //TO DO CHANGE ERROR HANDLING!!
            let verifiedError = onErrorHandler(error);
            if (verifiedError === 404) {
            }
        }
    }

    onImagesLoaded = () => {
        this.imagesLoadedCount++;
        if(this.state.styleNames.length === this.imagesLoadedCount){
            this.imagesLoadedCount = 0;
            this.setState({loading: false});
        }
    }

    preloadImage = (url) => {
        let a = new Image();
        a.src = url;
        a.onload = this.onImagesLoaded;
    }

    renderMenu = () => {
        return <div className="galleryMenu">
            {this.state.styleNames.map(style => {
                this.preloadImage(style.url);
                if (!this.state.loading)
                    return (<div onClick={() => this.onGallerySelected(style)} key={style.id}
                        className="picture" style={{ backgroundImage: `url(${style.url})` }}>
                        <span className="center">{style.name}</span></div>);
                else
                    return "";
            })}
            {this.state.loading && <Loading fullPage={false} />}
        </div>
    }

    closeGallery = () => {
        let offset = ReactDOM.findDOMNode(this)
            .getBoundingClientRect().top;
        scroll.scrollMore(offset);
        this.setState({ selectedGalleryId: null, selectedGalleryTitle: '' });
    }

    closeGalleryOnError = (error) => {
        this.setState({ selectedGalleryId: null, selectedGalleryTitle: '' });
    }

    render() {
        return (
            <React.Fragment>
                <div id="gallery">
                    <div className="left2 d-lg-block d-none" data-aos="fade-right" data-aos-duration="3000" ><span>Galeria</span></div>
                    <div className="col-lg-8 offset-lg-4 offset-0 col-12">
                        <h2>Galeria</h2>
                            {this.renderMenu()}
                    </div>
                </div>
                {this.state.selectedGalleryId !== null ?
                    <Element name="selectedGallery"><SelectedGallery
                        closeGallery={this.closeGallery}
                        closeGalleryOnError={this.closeGalleryOnError}
                        id={this.state.selectedGalleryId}
                        title={this.state.selectedGalleryTitle} /></Element> : ''}
            </React.Fragment>
        );
    }
}

export default Gallery;
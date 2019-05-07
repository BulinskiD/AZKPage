import React from 'react';
import ReactDOM from 'react-dom';
import { animateScroll as scroll } from 'react-scroll';
import Lightbox from 'react-image-lightbox';

import Loading from '../../loading/loading';
import FirebaseContext from '../../../api/firebaseContext';
import 'react-image-lightbox/style.css';
import './selectedGallery.css';


class SelectedGallery extends React.Component {
    static contextType = FirebaseContext;
    paintRef = this.context.firestore;
    storageRef = this.context.storage;

    state = {
        isOpen: false,
        paints: [],
        photoIndex: null,
        loading: true,
        error: false
    };

    getPics = async () => {
        try {
            const tempRef = this.paintRef.collection('styles').doc(this.props.id).collection('pics');
            const response = await tempRef.get();
            const paints = response.docs.map(async pic => {
                try {
                let newUrl = await this.storageRef.child(pic.data().src).getDownloadURL();
                return { id: pic.id, url: newUrl, ...pic.data() }
                }
                catch(error) {
                    this.setState({paints: [], loading: false, error: true});
                    throw(error);
                }
            });
            this.scrollToStart();
            Promise.all(paints).then(completed => {
                this.setState({ paints: completed, loading: false, error: false });
            });
        }
        catch (error) {
            this.setState({paints: [], loading: false, error: true});
            console.log(error);
        }
    }

    componentDidMount() {
        this.getPics();
    }

    componentDidUpdate(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.setState({loading: true});
            this.getPics();
        }
    }

    openImageFullScreen = (index) => {
        this.setState({ isOpen: true, photoIndex: index });
    }

    scrollToStart = () => {
        let offset = ReactDOM.findDOMNode(this)
            .getBoundingClientRect().top;
        scroll.scrollMore(offset);
    }

    renderImage = () => {
        return this.state.paints.map((image, index) => {
            return (<div className="paint" onClick={() => { this.openImageFullScreen(index) }} key={image.id}>
                <div className='thumb'>
                    <img onLoad={ this.onImageLoaded }className="img-thumbnail" src={image.url} alt={image.title} />
                </div>
                <div className="description">
                    <span>{image.title}</span>
                    <span>{image.xdim} x {image.ydim} cm</span>
                </div>
            </div>)
        });
    }

    renderLightbox() {
        const { photoIndex, isOpen } = this.state;
        let paints = this.state.paints;
        return (
            <div>
                {isOpen && (
                    <Lightbox
                        imageTitle={paints[photoIndex].title}
                        imagePadding={70}
                        mainSrc={paints[photoIndex].url}
                        nextSrc={photoIndex + 1 < paints.length ? paints[(photoIndex + 1) % paints.length].url : undefined}
                        prevSrc={photoIndex !== 0 ? paints[(photoIndex - 1) % paints.length].url : undefined}
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

    render() {
        if (this.props.id === null) {
            return null;
        }
        else {
            return (
                <div className="selectedGallery">
                    <div className="close" onClick={this.props.closeGallery}><i className="fas fa-arrow-up"></i></div>
                    <div className="galleryShape d-lg-block d-none" data-aos="fade-in" data-aos-duration="3000" />
                    <div className="selectedGallery offset-lg-4 offset-0 col-lg-8 col-12">
                        <h2>{this.props.title}</h2>

                        {(this.state.error && !this.state.loading) && <div>Error!</div>}
                        {(!this.state.error && !this.state.loading) && this.renderImage()}
                        {(!this.state.error && !this.state.loading) && this.renderLightbox()}
                        {this.state.loading && <Loading fullPage={false} />}
                    </div>
                </div>
            );
        }
    }
}


export default SelectedGallery;



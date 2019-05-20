import React from 'react';
import ReactDOM from 'react-dom';
import { animateScroll as scroll } from 'react-scroll';
import Lightbox from 'react-image-lightbox';

import Loading from '../../loading/loading';
import Paginator from '../../paginator/paginator';
import FirebaseContext from '../../../api/firebaseContext';
import 'react-image-lightbox/style.css';
import './selectedGallery.css';


class SelectedGallery extends React.Component {
    static contextType = FirebaseContext;
    paintRef = this.context.firestore;
    storageRef = this.context.storage;
    itemsOnPage = 5; //Items on page
    imagesLoaded = 0;

    state = {
        isOpen: false,
        currentPage: 1,
        pages: null,
        paints: [],
        paintsList: [],
        photoIndex: null,
        loading: true,
        error: false
    };

    //Pagination
    onPageChangeHandler = async (currentPage) => {
        if(currentPage !== this.state.currentPage){
            await this.setState({currentPage, loading: true});
            this.getPaintsOnPage();
        }
    }

    onImageLoaded = () =>{
        if(this.state.loading) {
            this.imagesLoaded++;
            if(this.imagesLoaded === this.state.paints.length) {
                this.setState({ loading: false });
                this.imagesLoaded = 0;
            }
        }
    }

    getPaintsOnPage = async (paintsList = this.state.paintsList) => {
        const pagination = this.getPagination(paintsList);
        const paints = pagination.paintsOnPage.map(async pic => {
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
            this.setState({ paints: completed, error: false, pages: pagination.pages });
        });
    }

    getPagination = (paintsList) => {
        const paintsLength = paintsList.docs.length;
        let pages = paintsLength/this.itemsOnPage;
        pages = Math.ceil(pages);
        let startAt = (this.state.currentPage - 1) * this.itemsOnPage;  
        let endAt = startAt + this.itemsOnPage;
        return {paintsOnPage: paintsList.docs.slice(startAt, endAt), pages};
    }
 
    getPics = async () => {
        try {
            const tempRef = this.paintRef.collection('styles').doc(this.props.id).collection('pics');
            const response = await tempRef.get();
            this.getPaintsOnPage(response);
            this.setState({paintsList: response});
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
            this.setState({loading: true, paints: []});
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
            return (
            <div className={this.state.loading ? "paint d-none" : "paint"} onClick={() => { this.openImageFullScreen(index) }} key={image.id}>
                <div className='thumb'>
                    <img onLoad={ this.onImageLoaded } className="img-thumbnail" src={image.url} alt={image.title} />
                </div>
                <div className="description">
                    <span>{image.title}</span>
                    <span>{image.xdim} x {image.ydim} cm</span>
                </div>
            </div>);
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

                        {(!this.state.error) && this.renderImage()}
                        {(!this.state.error && !this.state.loading) && this.renderLightbox()}
                        {(!this.state.error && !this.state.loading) && 
                        <Paginator pages={this.state.pages} 
                                   onPageChange={this.onPageChangeHandler} 
                                   currentPage={this.state.currentPage} />}

                        {this.state.loading && <Loading fullPage={false} />}

                    </div>
                </div>
            );
        }
    }
}

export default SelectedGallery;
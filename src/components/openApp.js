import React from 'react';
import { Element } from 'react-scroll'



import Header from './header/header';
import StartingComp from './startingComp/startingComp';
import Bio from './bio/bio';
import Gallery from './gallery/gallery';
import Exhibitions from './exhibitions/exhibitions';
import Contact from './contact/contact';
import Footer from './footer/footer';

class openApp extends React.Component {

    render(){
        return (
            <div id="container">
                <Header />
                <StartingComp />
                <Element name="bio"><Bio /></Element>
                <Element name="gallery"><Gallery /></Element>
                <Element name="exhibitions"><Exhibitions /></Element>
                <Element name="contact"><Contact /></Element>
                <Footer />
            </div>
        );
    }
}


export default openApp;
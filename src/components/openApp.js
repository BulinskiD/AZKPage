import React from 'react';
import { Element } from 'react-scroll'

import Header from './clientApp/header/header';
import StartingComp from './clientApp/startingComp/startingComp';
import Bio from './clientApp/bio/bio';
import Gallery from './clientApp/gallery/gallery';
import Exhibitions from './clientApp/exhibitions/exhibitions';
import Contact from './clientApp/contact/contact';
import Footer from './clientApp/footer/footer';

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
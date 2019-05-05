import './header.css';
import * as Scroll from 'react-scroll';
import { animateScroll as scroll, scrollSpy } from 'react-scroll';

import React from 'react';


class Header extends React.Component {

  scrollToTop = (e) => {
    e.preventDefault();
    scroll.scrollToTop();
    scrollSpy.update();
  };

  scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  scrollTo = () => {
    scroll.scrollTo(100);
  };
  scrollMore = () => {
    scroll.scrollMore(100);
  }

  componentDidMount() {

    scrollSpy.update();

  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a onClick={this.scrollToTop} href="/" className="navbar-brand">
            <div className="border-logo-path"><div className="logo-path"><div className="logo-content">
              <img src="img/logo.jpg" alt="logo" className="img-fluid" />
              <span>ALINA <br /> ZACHARIASZ <br />KUCIAKOWSKA<br /></span>
            </div>
            </div></div>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Scroll.Link activeClass="active" hashSpy={true} spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive} className="nav-item nav-link text-uppercase" to="bio">Bio</Scroll.Link>
              <Scroll.Link activeClass="active" hashSpy={true} spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive} className="nav-item nav-link text-uppercase" to="gallery">Galeria</Scroll.Link>
              <Scroll.Link activeClass="active" hashSpy={true} spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive} className="nav-item nav-link text-uppercase" to="exhibitions">Wystawy</Scroll.Link>
              <Scroll.Link activeClass="active" hashSpy={true} spy={true} smooth={true} duration={500} onSetActive={this.handleSetActive} className="nav-item nav-link text-uppercase" to="contact">Kontakt</Scroll.Link>
            </div>
          </div>
        </nav>
      </header>);

  }

}

export default Header;
import React from 'react';
import {FacebookProvider, Page} from 'react-facebook';
import './footer.css';

export default ()=>{
    return (
        <footer className="footer">

            <div className="d-none d-md-block fb">
                <FacebookProvider appId="Alina-Zachariasz-Kuciakowska-1613764655579606/">
                    <Page width="600" href="https://www.facebook.com/Alina-Zachariasz-Kuciakowska-1613764655579606/" />
                </FacebookProvider>   
            </div>

            <div className="info-content d-flex flex-row justify-content-around w-100 align-items-around flex-md-column">
                <span>Alina Zachariasz-Kuciakowska &copy; <br /> 
                Wszelkie prawa zastrzeżone.</span>
                <span>Projekt graficzny: <br />Eliza Kuciakowska
                      <br />Wykonanie: <br />Dawid Buliński </span>
            </div>
        </footer>

    );

}
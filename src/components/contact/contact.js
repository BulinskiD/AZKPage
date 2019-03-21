import React from 'react';

import './contact.css';


export default () => {
    return (
        <div id="contact">
            <div className="contactData d-lg-block d-none" data-aos="fade-right"
                data-aos-duration="3000">
                Alina Zachariasz-Kuciakowska <br />
                ul. Biecka 48, 38-300 Gorlice<br />
                +48 514 518 990 <br />
                zacharianka@gmail.com <br />
            </div>
            <div className="offset-lg-4 col-lg-8 offset-0 col-12"><h2>Kontakt</h2>

                <form className="contact-form">
                    <div className="form-row">
                        <label htmlFor="name" className="col-lg-2">Imię i nazwisko:</label>
                        <input type="name" className="form-control col-lg-5" id="name" placeholder="Imię i nazwisko" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="mail" className="col-lg-2">Adres e-mail:</label>
                        <input type="mail" className="form-control col-lg-5" id="mail" placeholder="Adres e-mail" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="title" className="col-lg-2">Temat wiadomości:</label>
                        <input type="title" className="form-control col-lg-5" id="title" placeholder="Temat wiadomości" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="content" className="col-lg-2">Treść wiadomości:</label>
                        <textarea type="content" className="form-control col-lg-5" id="content" rows="5" />
                    </div>

                    <button className="btn btn-dark" name="proba">Prześlij</button>
                </form>
            </div>
        </div>
    );
}
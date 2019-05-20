import FirebaseContext from '../../../api/firebaseContext'
import React from 'react';

import './contact.css';


class Contact extends React.Component{
    static contextType = FirebaseContext;

    state= {name: '', email: '', title: '', content: '', error: null, submited: false, loading: false};

    contactRef = this.context.firestore.collection("contact");

    onFormSubmit = async (e) => {
        e.preventDefault();
        if(this.state.name !== '' && this.state.name.length < 100 &&
            this.state.email !== '' && this.state.email.length < 100 &&
            this.state.title !== '' && this.state.title.length < 200 &&
            this.state.content !== '' && this.state.content.length < 1000) {
                //Submit

            try {
                await this.contactRef.add({
                    name: this.state.name,
                    email: this.state.email,
                    title: this.state.title,
                    content: this.state.content
                });
                this.setState({ submited: true, error: null });
            }
            catch(error) {
                console.log(error);
                this.setState({ error: "Coś poszło nie tak... Spróbuj ponownie później!" });
            }
            }
            else {
                this.setState({ error: "Podano niewłaściwe wartości!" });
            }
    }

    renderForm = () => { return (
        <form className="contact-form" onSubmit={e=> this.onFormSubmit(e)}>
                    <div className="form-row">
                        <label htmlFor="name" className="col-lg-2">Imię i nazwisko:</label>
                        <input type="name" onChange={e => this.setState({name: e.target.value})}
                            value={this.state.name} className="form-control col-lg-5" id="name" placeholder="Imię i nazwisko" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="mail" className="col-lg-2">Adres e-mail:</label>
                        <input type="email" onChange={e => this.setState({email: e.target.value})}
                         value={this.state.email} className="form-control col-lg-5" id="mail" placeholder="Adres e-mail" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="title" className="col-lg-2">Temat wiadomości:</label>
                        <input type="title" className="form-control col-lg-5" 
                        onChange={e => this.setState({title: e.target.value})} value={this.state.title}
                        id="title" placeholder="Temat wiadomości" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="content" className="col-lg-2">Treść wiadomości:</label>
                        <textarea type="content" 
                        onChange={e => this.setState({content: e.target.value})} value={this.state.content}
                        className="form-control col-lg-5" id="content" rows="5" />
                    </div>

                    <button className="btn btn-dark" name="send">Prześlij</button>
                </form>
                );
    }

    renderThanks = () => { return(
        <div className="thanks-container">
            <span>Dziękujemy za przesłanie wiadomości! <br />
                Wkrótce odpowiemy!</span>
        </div>);
    }
    
    
    render() {
    return (
        <div id="contact">
            <div className="contact-data d-lg-block d-none" data-aos="fade-right"
                data-aos-duration="3000">
                Alina Zachariasz-Kuciakowska <br />
                ul. Biecka 48, 38-300 Gorlice<br />
                +48 514 518 990 <br />
                zacharianka@gmail.com <br />
            </div>
            <div className="offset-lg-4 col-lg-8 offset-0 col-12"><h2>Kontakt</h2>
                {this.state.error!==null ? <div className="alert alert-danger m-4 mb-0">{this.state.error}</div> : null}
                {!this.state.submited ? this.renderForm(): this.renderThanks()}
            </div>
        </div>
    );
    }
}

export default Contact;
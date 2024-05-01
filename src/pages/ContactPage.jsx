import React from 'react';
import '../App.css';

export default function ContactPage() {
    return (
        <div className="section contact">
            
            <div className="part1">
                <h1>Kontakt</h1>
                <p>kontakt@agnieszkaklimczak.com</p>
                <p>Instagram: @agnieszkaklimczak</p>
                <p>Facebook: @agnieszkaklimczak</p>
            </div>

            <div className="part2">
                <form action="https://formsubmit.co/agnieszka.klimczak.malarstwo@gmail.com" method="POST" className="contact-form">
                    <input type="hidden" name="_next" value="http://localhost:3000/thanks.html" />
                    <input className="contact-input" type="text" name="firstName" placeholder="Imię" required />
                    <input className="contact-input" type="text" name="lastName" placeholder="Nazwisko" required />
                    <input className="contact-input" type="e-mail" name="email" placeholder="E-mail" required />
                    <input className="contact-input" type="text" name="company" placeholder="Firma" />
                    <textarea  name="message" required></textarea>
                    <input type="submit" className="regular-button" value="Wyślij" />
                </form>
            </div>

        </div>
    )
}
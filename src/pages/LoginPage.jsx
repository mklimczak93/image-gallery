import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useLogin } from '../hooks/useLogin';
// import {auth} from '../firebase.js';
// import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        // signInWithEmailAndPassword(auth, email, password)
        // .then((credentials) => {
        //     console.log('User logged in: ', credentials)
        // })
        // .catch((error) => {
        //     console.log(error.message)
        // })
    }

    return (
        <div className="section login">
            <h1>Zaloguj się</h1>
            <p>
                To jest prywatna część strony. Jeśli nie jesteś jej właścicielem, proszę wróć na 
                <Link to="/" className="link underlined"> stronę główną.</Link>
            </p>
            {error && <div className="error">
                <p>{error.message}</p>
            </div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="login-label">E-mail:</label>
                <input 
                className="login-input" 
                type="email" 
                name="username"
                value = {email}
                onChange = { (e) => setEmail(e.target.value) }
                required/>

                <label className="login-label">Hasło:</label>
                <input 
                className="login-input" 
                type="password" 
                name="password" 
                value={password}
                onChange = { (e) => setPassword(e.target.value) }
                required/>
                <button className="regular-button">Zaloguj się</button>
            </form>
        </div>
    )
}
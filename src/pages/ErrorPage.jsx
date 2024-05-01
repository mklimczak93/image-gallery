import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';


export default function ErrorPage() {
    return (
        <div className="section error">
            <h3>Error 404</h3>
            <Link to="/" className="link underlined">Wróć do strony głównej.</Link>
        </div>
    )
}
import { useState } from "react";
import { useAuthContext } from './useAuthContext';
import {auth} from '../firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        signInWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
            console.log('User logged in: ', credentials)
            //storing JWT in browser in localStorage, so the user is still logged in
            localStorage.setItem('user', JSON.stringify(credentials));
            //updating authContext with the user email, using dispatch
            dispatch({type: 'LOGIN', payload: credentials});
            //
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error.message)
            setIsLoading(false);
            setError(error.message);
        })
    };

    return { login, isLoading, error }
}
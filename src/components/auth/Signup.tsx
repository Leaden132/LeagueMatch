import React from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import {useRef, useState} from 'react';
import {Container} from 'react-bootstrap';
import {useAuth} from '../../contexts/AuthContext';
import {useHistory, Link} from 'react-router-dom'


export default function Signup() {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
    const {signup} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<boolean>();
    const history = useHistory();

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (passwordRef.current && passwordConfirmRef.current && emailRef.current) {

            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError('Passwords do not match!');
            }

        try {
            setError('');
            setLoading(true);

            console.log(emailRef.current.value);
            let email = emailRef.current.value.toString();
            let password = passwordRef.current.value;

            await signup({email: email, password: password})
            history.push('/');
        } catch(err) {
            console.log(err);
            setError('failed to create account')
        }

        setLoading(false)

    }
    }

    return (
        <div>
            <section className="authentication">
                <div className="spacer"></div>
                <div className="loginContainer">
                    
                    <form onSubmit={handleSubmit}>
                        <h3>Log In</h3>
                        <label htmlFor="email">Email</label>
                        <input className="emailInput" id="email" name="email" type="email" ref={emailRef} required></input>

                        <label htmlFor="password">Password</label>
                        <input className="passwordInput" id="password" name="password" type="password" ref={passwordRef} required></input>

                        <label htmlFor="passwordConfirm">Password Confirmation</label>
                        <input className="passwordConfirmInput" id="passwordConfirm" name="passwordConfirm" type="password" ref={passwordConfirmRef} required></input>

                        <p>Already have an account? <Link to="/login"><span>Log In!</span></Link></p>

                        <button type="submit">Log In</button>
                    </form>
                    
                </div>

            </section>
    
        </div>

    )


}
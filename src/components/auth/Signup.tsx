import React from 'react';
import {useRef, useState} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {useHistory, Link} from 'react-router-dom'
import firebase from "../../config/firebase";



export default function Signup() {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
    const displayNameRef = useRef<HTMLInputElement | null>(null);
    const {signup} = useAuth();
    const [error, setError] = useState('');
    // const [loading, setLoading] = useState<boolean>();
    const history = useHistory();

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (passwordRef.current && passwordConfirmRef.current && emailRef.current && displayNameRef.current) {

            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError('Passwords do not match!');
            }

        try {
            setError('');
            console.log(emailRef.current.value);
            let email = emailRef.current.value.toString();
            let password = passwordRef.current.value;
            let displayName = displayNameRef.current.value;

            await signup(email, password).then((cred:any)=>{
                    const userId = cred.user.uid;

                    console.log(userId);

                    if (cred.additionalUserInfo.isNewUser) {
                      try {
                        const userInfoRef = firebase.database().ref(userId);
                        userInfoRef.set({id:userId, searches: {id:userId}, championList: {id:userId}});

                        console.log(userInfoRef);
                      } catch (err) {
                        setError('Could not set initial articles');
                        console.log(error);
                      }
                    }

                    cred.user.updateProfile({
                        displayName: displayName
                    }).then(()=>{
                        history.push('/');
                    })
            })
            
            
        } catch(err) {
            console.log(err);
            setError('failed to create account')
        }


    }
    }


    return (
        <div>
            <section className="authentication">
                <div className="spacer"></div>
                <div className="loginContainer">
                    
                    <form onSubmit={handleSubmit}>
                        <h3>Sign Up</h3>
                        <label htmlFor="email">Email</label>
                        <input className="emailInput" id="email" name="email" type="email" ref={emailRef} required></input>

                        <label htmlFor="displayName">Display Name</label>
                        <input className="displayNameInput" id="displayName" name="displayName" type="text" ref={displayNameRef} required></input>

                        <label htmlFor="password">Password</label>
                        <input className="passwordInput" id="password" name="password" type="password" ref={passwordRef} required></input>

                        <label htmlFor="passwordConfirm">Password Confirmation</label>
                        <input className="passwordConfirmInput" id="passwordConfirm" name="passwordConfirm" type="password" ref={passwordConfirmRef} required></input>

                        <p>Already have an account? <Link to="/login"><span>Log In!</span></Link></p>

                        <button type="submit">Sign Up</button>
                    </form>
                    
                </div>

            </section>
    
        </div>

    )


}
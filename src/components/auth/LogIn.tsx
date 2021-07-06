import React from 'react';
import {useRef, useState} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {useHistory, Link} from 'react-router-dom'


export default function SignIn() {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    // const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [displayError, setDisplayError] = useState(false);
    // const [loading, setLoading] = useState<boolean>();
    const history = useHistory();
    const [shakeTrigger, setShakeTrigger] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (passwordRef.current && emailRef.current) {

        try {
            setError('');
            // setLoading(true);

            console.log(emailRef.current.value);
            let email = emailRef.current.value.toString();
            let password = passwordRef.current.value;

            await login({email: email, password: password})
            history.push('/');

        } catch(err) {
            console.log(error);

                // alert('this champion is already in your list!')
                setDisplayError(true);
                setShakeTrigger('loginError');
          
                setTimeout(()=>{
                  setShakeTrigger('');
                },1000)

          

            setError('failed to login');
            setDisplayError(true);
        }
        // setLoading(false)
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

                        <p>Don't have account yet? <Link to="/signup"><span>Sign Up!</span></Link></p>

                        <button type="submit">Log In</button>
                        {displayError ? <p className={`${shakeTrigger} loginFail`}>There is no matching Email / Password for your input</p> : null}
                    </form>
                    
                </div>

            </section>
    
        </div>
    )


}
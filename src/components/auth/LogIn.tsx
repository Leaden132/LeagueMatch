import React from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import {useRef, useState} from 'react';
import {Container} from 'react-bootstrap';
import {useAuth} from '../../contexts/AuthContext';
import {useHistory, Link} from 'react-router-dom'


export default function SignIn() {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    // const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
    const {login, currentUser} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<boolean>();
    const history = useHistory();

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (passwordRef.current && emailRef.current) {

        try {
            setError('');
            setLoading(true);

            console.log(emailRef.current.value);
            let email = emailRef.current.value.toString();
            let password = passwordRef.current.value;

            await login({email: email, password: password})
            history.push('/');

            console.log()
        } catch(err) {
            console.log(err);
            setError('failed to create an acount')
        }

        setLoading(false)

    }
    }

    return (
        <div>
            <section className="authentication">


            </section>


            <Container className="d-flex align-items-center justify-content-center"
            style={{minHeight:"100vh"}}>
            <div className="w-100" style={{maxWidth: '400px'}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {currentUser && currentUser.email}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="Submit">Sign In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Create an account - <Link to='/signin'>Sign Up!</Link>
            </div>
            </div>
            </Container>
        </div>
    )


}
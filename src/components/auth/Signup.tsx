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
            setError('failed to Sign In')
        }

        setLoading(false)

    }
    }

    return (
        <div>
            <Container className="d-flex align-items-center justify-content-center"
            style={{minHeight:"100vh"}}>
            <div className="w-100" style={{maxWidth: '400px'}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="passwordConfirm">
                            <Form.Label>password confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="Submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to='/login'>Log In!</Link>
            </div>
            </div>
            </Container>
        </div>
    )


}
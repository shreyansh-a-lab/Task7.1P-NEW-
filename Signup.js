import React, { useRef, useState } from 'react';
import { useAuth } from './Authentication';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import './Signup.css';

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuth(); // Custom authentication hook
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const enteredPassword = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (!enteredPassword || !confirmPassword) {
            return setError('Password fields cannot be empty.');
        }
        if (enteredPassword !== confirmPassword) {
            return setError('Passwords do not match.');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, enteredPassword);
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="body2">
            <div className="signup">
                <h1>Create Your First Dev@Deakin Account</h1>
                {error && <div className="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label>
                        NAME*
                        <input className="input" type="text" ref={nameRef} required />
                    </label>
                    <label>
                        Email*
                        <input className="input" type="email" ref={emailRef} required />
                    </label>
                    <label>
                        Password*
                        <input className="input" type="password" ref={passwordRef} required />
                    </label>
                    <label>
                        Confirm Password*
                        <input className="input" type="password" ref={confirmPasswordRef} required />
                    </label>
                    <button disabled={loading} className="button" type="submit">
                        SIGN UP!!
                    </button>
                </form>
            </div>
            <div className="acc">
                Already have an account? <Link to="/login">Log In !!</Link>
            </div>
        </div>
    );
};

export default Signup;

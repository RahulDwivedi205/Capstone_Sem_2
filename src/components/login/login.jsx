import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginSignup = ({ setToken }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const savedUser = JSON.parse(localStorage.getItem('user'));

        if (isLogin) {
            if (savedUser && savedUser.email === email && savedUser.password === password) {
                const fakeToken = "loggedin-token-123";
                localStorage.setItem('token', fakeToken);
                setToken(fakeToken);
                setError('');
                navigate('/home');
            } else {
                setError('Invalid email or password');
            }
        } else {
            if (savedUser && savedUser.email === email) {
                setError('User already exists');
            } else {
                localStorage.setItem('user', JSON.stringify({ email, password }));
                const fakeToken = "registered-token-456";
                localStorage.setItem('token', fakeToken);
                setToken(fakeToken);
                setError('');
                navigate('/home');
            }
        }
    };

    return (
        
        <div className="login-wrapper" >
            
           
             <h1 style={{
                textAlign: 'center',
                marginTop: '40px',
                marginBottom: '150px',
                color: "#fff",
                fontFamily: 'Segoe UI',
                fontWeight: '600'
            }}>
                Welcome to Rahul's Website
            </h1>
           

            <div className="login-container">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <p>
                    {isLogin ? "New user?" : "Already have an account?"}{' '}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'blue',
                            cursor: 'pointer'
                        }}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginSignup;

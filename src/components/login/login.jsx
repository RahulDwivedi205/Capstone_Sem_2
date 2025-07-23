import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {

            console.log('Login:', { username, password });
            alert(`Logged in as ${username}`);
            navigate('/home');
        } else {
            console.log('Signup:', { username, email, password });
            alert(`Signed up as ${username}`);

            
        }
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {!isLogin && (
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>

                <p>
                    {isLogin ? 'New user?' : 'Already have an account?'}{' '}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginSignup;

import React, { useState } from 'react';
import '/src/Components/SignInPage/signinpage.css';

const SignInForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        password: ''
    });
    const [isLogin, setIsLogin] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const response = await fetch('http://localhost:3001/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password
                    })
                });
                if (response.ok) {
                    alert('Logged in successfully');
                    // Handle successful login, e.g., redirect or set authentication state
                } else {
                    alert('Failed to log in');
                }
            } else {
                const response = await fetch('http://localhost:3001/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        password: formData.password
                    })
                });
                if (response.ok) {
                    alert('User added successfully');
                } else {
                    alert('Failed to add user');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <h2>{isLogin ? 'Login' : 'Sign In'}</h2>
                
                {isLogin ? (
                    <>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            required 
                        />

                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </>
                ) : (
                    <>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                        
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                        
                        <label htmlFor="phone">Phone Number</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                        />

                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </>
                )}
                
                <button type="submit">{isLogin ? 'Login' : 'Sign In'}</button>
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Switch to Sign In' : 'Switch to Login'}
                </button>
            </form>
        </div>
    );
};

export default SignInForm;

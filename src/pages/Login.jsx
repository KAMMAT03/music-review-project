import React from 'react'
import '../styles/login.css'

export default function Login(props){
    const [registered, setRegistered] = React.useState(false);

    const [credentials, setCredentials] = React.useState({
        username: "",
        password: ""
    })

    function toggleRegistered(){
        setRegistered(prev => !prev);
    }

    function submit(event){
        event.preventDefault();
        fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        }).then((response) => response.json())
        .then((json) => console.log(json));
    }

    function handleChange(event){
        const {name, value} = event.target;

        setCredentials(prev => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <div className="login">
            <h1>{registered ? 'Register' : 'Login'}</h1>
            <form className="login-form" action="">
                <input
                    className='login-input'
                    name='username'
                    value={credentials.username}
                    type="text"
                    placeholder="username"
                    onChange={handleChange}
                />
                <input
                    className='login-input'
                    name='password'
                    value={credentials.password}
                    type="password"
                    placeholder="password"
                    onChange={handleChange}
                />
                <button onClick={submit} className='login-button'>Login</button>
            </form>
            <div className='login-toggle'>
                <span>
                    {registered ? 'Already registered?' : 'Don\'t have an account yet?'}
                </span>
                <button onClick={toggleRegistered} className='register-button'>
                    {registered ? 'Login' : 'Register'}
                </button>
            </div>
        </div>
    )
}
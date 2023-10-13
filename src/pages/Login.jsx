import React from 'react'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';

export default function Login(props){
    const [registered, setRegistered] = React.useState(false);

    const [message, setMessage] = React.useState("");

    const navigate = useNavigate();

    const [credentials, setCredentials] = React.useState({
        username: "",
        password: "",
        confpassword: ""
    })

    function toggleRegistered(){
        setRegistered(prev => !prev);
    }

    function submitRegister(event){
        event.preventDefault();

        if (credentials.password !== credentials.confpassword){
            setMessage("Passwords do not match!");
            return;
        }

        const response = fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password
            })
        }).then((response) => {
            return response;
        })

        if (response.status === 200){
            console.log(response)
            // response.json().then(json => {
            //     navigate("/search");
            // })
        } else {
            // response.json().then(json =>{
            //     setMessage(json.message);
            // })
            console.log("cos nie tak");
        }
    }

    function submitLogin(event){
        event.preventDefault();

        fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password
            })
        }).then((response) => {
            console.log(response.status);
            return response.json();
        })
        .then(json => console.log(json));
    }

    function handleChange(event){
        const {name, value} = event.target;

        setCredentials(prev => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <div className='login-div'>
            <div className="login">
                <h1>{registered ? 'Login' : 'Register'}</h1>
                <p style={{color: 'red'}}>{message}</p>
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
                    {!registered &&
                    <input
                        className='login-input'
                        name='confpassword'
                        value={credentials.confpassword}
                        type="password"
                        placeholder="confirm password"
                        onChange={handleChange}
                    />}
                    <button onClick={registered ? submitLogin : submitRegister} className='login-button'>{registered ? 'Login' : 'Register'}</button>
                </form>
                <div className='login-toggle'>
                    <span>
                        {registered ? 'Don\'t have an account yet?' : 'Already registered?'}
                    </span>
                    <button onClick={toggleRegistered} className='register-button'>
                        {registered ? 'Register' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    )
}
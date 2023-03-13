import React, {useState} from "react";
import './styles/auth.css'
import { mainAxios } from "../utils/mainAxios";
import {Link} from 'react-router-dom'

function Login(){
    
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleInput = (event: any) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    async function handleSubmit (event: any){
        event.preventDefault();
        
        mainAxios.post('/auth/login', user)
        .then(response => {
            console.log(response.data.token);
            localStorage.setItem("token", response.data.token)
        })
        .catch(err => console.log(err))
    }

    return (
        <div id="login">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" onChange={handleInput} id="username" name="username" placeholder="Enter your username"/>
                <label htmlFor="password">Password:</label>
                <input type="password" onChange={handleInput} id="password" name="password" placeholder="Enter your password"/>
                <span>Don't have an account</span>
                <Link to = '/register'>Sign up</Link>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}
export default Login;
import React, {useState, useContext} from "react";
import './styles/auth.css'
import { mainAxios } from "../utils/mainAxios";
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from "../context/myContext";

function Login(){
    
    const navigate = useNavigate();
    const {isAuth, setIsAuth} = useContext(UserContext)
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
            localStorage.setItem("token", response.data.token)
        })
        .catch(err => console.log(err))
        setIsAuth(true)
        navigate('/');
        
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
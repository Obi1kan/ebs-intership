import React, {useState} from 'react'
import { mainAxios } from '../utils/mainAxios'
import {useNavigate, Link} from 'react-router-dom'

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        permission: "user"
    })

    const handleInput = (event: any) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        mainAxios.post('/auth/register', user)
        .then(response => localStorage.setItem("token", response.data.token))
        .catch(err => console.log(err))
        navigate('/')
    }

    return (
        <div id="register">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text"  id="name" name="name" placeholder="Enter your name" onChange={handleInput}/>
                <label htmlFor="username">Username:</label>
                <input type="text"  id="username" name="username" placeholder="Enter your username" onChange={handleInput}/>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" placeholder='sample@mail.com' onChange={handleInput}/>
                <label htmlFor="password">Password:</label>
                <input type="password"  id="password" name="password" placeholder="Enter your password" onChange={handleInput}/>
                <span>Already have an account</span>
                <Link to = '/login'>Login</Link>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
export default Register
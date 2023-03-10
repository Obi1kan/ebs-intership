import React from "react";
import './styles/login.css'

function Login(){
    return (
        <div id="login">
            <form>
  <label htmlFor="username">Username:</label>
  <input type="text" id="username" name="username" placeholder="Enter your username"/>
  <label htmlFor="password">Password:</label>
  <input type="password" id="password" name="password" placeholder="Enter your password"/>
  <input type="submit" value="Submit"/>
</form>

        </div>
    )
}
export default Login;
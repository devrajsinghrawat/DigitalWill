import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
export default function RegisterForm() {

    //const history = useHistory()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:3000/addUser", user)
            .then( res => {
                //alert(res.data.message);
                history.push("/login")
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input type="text" name="name" placeholder="Your Name" onChange={ handleChange }></input>
            <input type="email" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button">Login</div>
        </div>
    )
}


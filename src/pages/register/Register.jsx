import React from 'react'
import { Link } from 'react-router-dom'
import './register.css'
import { useState } from 'react'
import axios from 'axios'

export default function Register() {
    const [username,setUsername]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [error,setError]= useState(false)
    

    const handlSubmit = async (e)=>{
        e.preventDefault();
        setError(false)
        try{
            const res = await axios.post("/auth/register", { 
                username,
                email,
                password
            })
            res.data && window.location.replace("/login")
        }catch(err){
            setError(true)
        }
    }
    return (
        <div className="register">
            <span className="register-title">Register</span>
            <form  className="register-form" onSubmit={e=>handlSubmit(e)}>
                <label >Email</label>
                <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
                <label >Username</label>
                <input type="text" placeholder="user name"  onChange={e=>setUsername(e.target.value)}/>
                <label >Password</label>
                <input type="password" onChange={e=>setPassword(e.target.value)} />
                
            <button className="register-btn"><Link className="link" to='/login'>Login</Link></button>
            <button type="submit" className="login-btn">Register</button>
            </form>
            {error && <span>User Already exits</span>}
        </div>
    )
}

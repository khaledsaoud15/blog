
import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom'
import { Context} from '../../context/Context';
import './login.css'

export default function Login() {

    const userRef = useRef()
    const passwordrRef = useRef()
    const {dispatch,isFetching} = useContext(Context)



    const handlSubmit = async (e)=>{
        e.preventDefault();
        try{
            dispatch({type:"LOGIN_START"})
            const res = await axios.post("/auth/login", {
                username:userRef.current.value,
                password:passwordrRef.current.value,
            })
            dispatch({type:"LOGIN_SUCCES",payload:res.data})
        }catch(err){
            dispatch({type:"LOGIN_FAILURE"})
        }
    }
    
   
    return (
        <div className="login">
            <span className="login-title">Login</span>
            <form  className="login-form" onSubmit={handlSubmit}>
                <label >Username</label>
                <input type="text" placeholder="username...."  ref={userRef}/>
                <label >Password</label>
                <input type="password" ref={passwordrRef} />
                <button type="submit" className="login-btn" disabled={isFetching}>Login</button>
                <button className="register-btn"><Link className='link' to='/register'>Register</Link></button>
            </form>
        </div>
    )
}

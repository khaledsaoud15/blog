import React, { useContext } from 'react'
import './TopBar.css'
// import profileImg from '../../images/people.jpg'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

const TopBar = () => {
    const {user , dispatch} = useContext(Context)
    const PF = "http://localhost:5000/images/"

    const handlLogout = ()=>{
        dispatch({type:"LOGOUT"})
    }
    return (
        
            <div className="top">
               <div className="top-left">
                   <i className=" top-icon fab fa-facebook-square"></i>
                   <i className=" top-icon fab fa-twitter-square"></i>
                   <i className=" top-icon fab fa-pinterest-square"></i>
                   <i className=" top-icon fab fa-instagram-square"></i>
               </div>
               <div className="top-center">
                    <ul className="top-list">
                        <li className="top-list-item"><Link className="link" to='/' >HOME</Link></li>
                        <li className="top-list-item"><Link  className="link" to='/'>ABOUT</Link></li>
                        <li className="top-list-item"><Link  className="link" to='/'>CONTACT</Link></li>
                        <li className="top-list-item"><Link  className="link" to='/write'>WRITE</Link></li>
                        <li className="top-list-item" onClick={handlLogout}>
                            {user && 'LOGOUT'}
                        </li>
                    </ul>
               </div>
               <div className="top-right">
                   {user ? (
                   <Link to="/settings">
                        <img className="top-img" src={PF+user.profilePic} alt="porfile picture" />
                   </Link>
                        ) : (<ul className="top-list">
                   <li className="top-list-item"><Link className="link" to='/login'>LOGIN</Link></li>
                   <li className="top-list-item"><Link className="link" to='/register'>REGISTER</Link></li>
                   </ul>)}
                  
                   <i className=" top-search fas fa-search"></i>

               </div>
            </div>
    )
}

export default TopBar

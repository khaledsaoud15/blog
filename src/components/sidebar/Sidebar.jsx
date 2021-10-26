import React, { useEffect, useState } from 'react'
import './sidebar.css'
import sideBarImage from '../../images/sidebarimg.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SideBar = () => {
    const [cat,setCat]= useState([])

    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axios.get("/cat")
            setCat(res.data)
        }
        getCats()
    },[])
    return (
            <div className="sidebar">
                <div className="side-bar-item">
                    <span className="side-bar-title">
                        ABOUT ME
                    </span>
                    <img src={sideBarImage} alt="img"  className="side-bar-img"/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptas perspiciatis fuga asperiores optio possimus alias odio</p>

                </div>
                <div className="side-bar-item">
                    <span className="side-bar-title">CATEGORIES</span>
                    <ul className="side-bar-list">
                        {cat.map((c)=>(
                       <>
                            <Link className="link" to={`/?cat=${c.name}`} >

                            <li className="side-bar-list-item">{c.name}</li>
                            </Link>
                        </>
                        ))}
                    </ul>
                </div>
                <div className="side-bar-item">
                    <span className="side-bar-title">FOLLOW US</span>
                    <div className="side-bar-social">
                        <i className=" side-bar-icon fab fa-facebook-square"></i>
                        <i className=" side-bar-icon fab fa-twitter-square"></i>
                        <i className=" side-bar-icon fab fa-pinterest-square"></i>
                        <i className=" side-bar-icon fab fa-instagram-square"></i>
                    </div>
                </div>
            </div>
    )
}

export default SideBar

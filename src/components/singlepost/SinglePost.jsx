import React, { useContext, useEffect, useState } from 'react'
import './singlepost.css'
// import SinglePostImg from '../../images/singlepost.jpg'
// import SideBar from '../sidebar/Sidebar'
import { useLocation } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Context from '../../context/Context'

const SinglePost = () => {
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post , setPost] = useState({})
    const PF = "http://localhost:5000/images/"
    const {user} = useContext(Context)
    const [title,setTitle] =useState("")
    const [desc,setDesc] =useState("")
    const [updateMode,setUpdateMode] =useState(false)

    useEffect(()=> {
        const getPost = async ()=>{
            const res = await axios.get("/posts/"+path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    },[path])

    const handlDelete = async ()=>{
        try{
            await axios.delete(`/posts/${post._id}` ,{ data:{username:user.username}})
            window.location.replace("/")
        }catch{
            console.log("erro");
        }
    }

    const handleUpdate = async ()=>{
        try{
            await axios.put(`/posts/${post._id}` ,{username:user.username , title,desc})
            setUpdateMode(false)
        }catch{
            console.log("erro");
        }
    }

    return (
        <div className="single-post">
            <div className="single-post-wrapper">
                {post.photo && (

                <img src={ PF + post.photo} alt="single" className="single-post-img" />
                )}{
                    updateMode ? <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="single-post-title-input" autoFocus={true}/> : (

                    <h1 className="single-post-title">
                    {title}
                   {post.username === user?.username && 
                    <div className="single-post-edit">
                        <i className=" single-post-icon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                        <i className=" single-post-icon far fa-trash-alt" onClick={handlDelete}></i>
                    </div>
                    }
                    </h1>
                    )
                }
                <div className="single-post-info">
                    <Link className="link" to={`/?user=${post.username}`}>
                    <span className="single-post-author">Auhtor: <b>{post.username}</b></span>
                    </Link>
                    <span className="single-post-date">{new Date (post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? <input type="text" value={desc} className="single-post-desc-input" onChange={(e)=>setDesc(e.target.value)} /> : 
              (  <p className="single-post-desc">
                   {desc}
                </p>)
                }
                {updateMode && <button className="single-post-btn" onClick={handleUpdate}>Update</button>}
                
            </div>
        </div>
    )
}

export default SinglePost

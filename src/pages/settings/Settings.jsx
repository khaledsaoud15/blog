import React, { useContext, useState } from 'react'
import './settings.css'
import SideBar from '../../components/sidebar/Sidebar'
import Context from '../../context/Context'
import axios from 'axios'


export default function Settings() {
    const {user,dispatch} = useContext(Context)
    const [file,setFile] = useState(null)
    const [username,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [upload,setUpload] = useState(false)
    const PF = "http://localhost:5000/images/"


    const handlSubmit = async (e)=>{
        dispatch({type:"UPDATE_START"})
        e.preventDefault()
        const updatedUser = {
            userId:user._id,
            username,email,password
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name
            data.append("name",fileName)
            data.append("file",file)
            updatedUser.profilePic = fileName
            try {
                await axios.post("/upload", data)
                
            }catch(err){
                console.log(err);
            }
        }
        try{
            const res = await axios.put("/users/"+user._id,updatedUser)
            setUpload(true)
            dispatch({type:"UPDATE_SUCCES",payload:res.data})
        }catch(err){
            dispatch({type:"UPDATE_FAILURE"})
        }
    }


    return (
        <div className="settings">
            <div className="settings-wrapper">
                <div className="settings-title">
                    <span className="settings-update-title">
                        Update your account
                    </span>
                    <span className="settings-delete-title">
                        delete your account
                    </span>
                    
                </div>
                <form className="settings-form" onSubmit={handlSubmit}>
                    <label>Profile Picture</label>
                   <div className="settings-profilee">
                   <img src={file ? URL.createObjectURL(file) : PF+user.profilePic} alt="people" className="settings-profile-img" />
                   <label htmlFor="file-input" >
                        <i className=" settings-icon far fa-user-circle"></i>
                    </label>
                    <input type="file" id="file-input" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
                   </div>
                    <label >Username</label>
                    <input type="text" placeholder={user.username} onChange={(e)=>setUserName(e.target.value)}/>
                    <label >Email</label>
                    <input type="email" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)} />
                    <label >Password</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)}  />
                    <button className="settings-submit" type="submit">Update</button>
                    {upload && <span style={{color:"green",textAlign:"center",marginTop:"10px"}}>Profile has been updated</span>  }
                </form>
            </div>
            <SideBar/>
        </div>
    )
}


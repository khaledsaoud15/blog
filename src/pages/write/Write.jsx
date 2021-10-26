import React, { useContext, useState } from 'react'
import './write.css'
import WriteImg from '../../images/writeimg.jpg'
import axios from 'axios'
import Context from '../../context/Context'

const Write = () => {
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [file,setFile] = useState(null)
    const {user} = useContext(Context)

    const handlSubmit = async (e)=>{
        e.preventDefault()
        const newPost = {
            username:user.username,
            title,
            desc
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name
            data.append("name",fileName)
            data.append("file",file)
            newPost.photo = fileName
            try {
                await axios.post("/upload", data)
            }catch(err){
                console.log(err);
            }
        }
        try{
           const res = await axios.post("/posts",newPost)
           window.location.replace("/post/"+ res.data._id)
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="write">
            {file && 
            <img src={URL.createObjectURL(file)} alt="img" className="write-img"/>
            }
           <form className="write-form" onSubmit={handlSubmit}>
               <div className="write-form-group">
                   <label htmlFor="fileInput">
                       <i className=" write-icon fas fa-plus"></i>
                   </label>
                   <input type="file"  id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                   <input type="text" placeholder="Title" className="write-input"  autoFocus={true} onChange={e=>setTitle(e.target.value)}/>
               </div>
               <div className="write-form-group">
                   <textarea placeholder="Tell your story" type="text" className="write-input write-text" onChange={e=>setDesc(e.target.value)}></textarea>
               </div>
               <button className="write-submit" type="submit">Publish</button>
           </form>
        </div>
    )
}

export default Write

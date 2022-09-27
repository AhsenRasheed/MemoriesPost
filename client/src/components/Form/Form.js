import React, { useEffect, useState } from "react";
import useStyles from './styles.js';
import Filebase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button, Typography, Paper } from "@mui/material";
import { createPost, updatePost } from "../../actions/posts.js";
const Form = ({CurrentId, setCurrentId})=>{
    
    const [postData, setpostData] = useState({ creator:'', title:'', message:'',tags:'', selectedFile:'' });
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state)=> CurrentId ? state.posts.find((p)=> p._id === CurrentId) : null);


    useEffect(()=>{
        if(post) setpostData(post);
    }, [post])

    const handleSubmit = (error)=>{
        error.preventDefault();
        if(CurrentId){
            dispatch(updatePost(CurrentId, postData));
        }
        else{dispatch(createPost(postData));}

        clear();
    }

    const clear = ()=>{
        setCurrentId(null);
        setpostData({ creator:'', title:'', message:'',tags:'', selectedFile:'' });
    }

    return(
        <Paper classes={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit ={handleSubmit}>
            <Typography variant="h6">{CurrentId ? 'Editing': ' Creating '} a Memory</Typography>
            <TextField name="creator" variant="outlined" label="Creator" value={postData.creator} onChange={(e)=>setpostData({...postData, creator:e.target.value})}/>
            <TextField name="title" variant="outlined" label="Title"  value={postData.title} onChange={(e)=>setpostData({...postData, title:e.target.value})}/>
            <TextField name="message" variant="outlined" label="Message"  value={postData.message} onChange={(e)=>setpostData({...postData, message:e.target.value})}/>
            <TextField name="tags" variant="outlined" label="Tags" value={postData.tags} onChange={(e)=>setpostData({...postData, tags:e.target.value})}/>
        
            <div className={classes.fileInput}>
                <Filebase type='file' multiple={false} onDone={({base64}) => setpostData({...postData, selectedfile: base64})}/>
            </div>

            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" >Submit</Button>
            <Button  variant="contained" color="secondary" size="small" onClick={clear} >Clear</Button>
        </form>
        </Paper>
    )
}

export default Form;
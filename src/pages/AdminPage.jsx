import React, { useContext,useEffect,useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { AllContext } from '../hooks/AllContext';
import { Card, Container, TextField, Fab, Modal, Button, TextareaAutosize } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Redirect, useHistory } from 'react-router';
import axios from 'axios';
import { Box } from '@mui/system';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const {auth, userid, setUserid} = useContext(AllContext)
    const [poster, setPoster] = useState([])
    const [search, setSearch] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [newtitle, setNewtitle] = useState('')
    const [newbody, setNewbody] = useState('')
    const history = useHistory()
    const [id, setId] = useState(null)
    const [del, setDel] = useState(false)
    
    const filtered = (post) => {
        return post.title.toUpperCase().indexOf(search.toUpperCase()) > -1
    }

    const Loading = async() => {
        try {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userid}`)
            setPoster(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        const getPoster = async() => {
            try {
                let res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userid}`)
                setPoster(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getPoster();
        const getCookies = async() => {
            try {
              const getId = await Cookies.get('userid')
              if(getId !== null){
                setUserid(getId)
              }
        
            } catch (error) {
              console.log(error);
            }
          };
          getCookies();
    },[])
  
    if(auth){
        return (
            <Container fixed>
                <Box sx={{ display:'flex', justifyContent:'flex-end', p:1 }}>
                    <TextField className="search" label="Search" variant="outlined" onChange={(e)=>setSearch(e.target.value)}/>
                </Box>
                <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
                {poster.filter(filtered).map((item,i)=>(
                    <div key={i} style={{
                        bgcolor: 'background.paper',
                    }}>
                        <Card variant='outlined' style={{marginBottom:5}}>
                            <ListItem alignItems="flex-start" style={{border: 1, backgroundColor:`${i % 2 === 0 ? "#eee" : "#fff"}`, position:"static" }}>
                                <ListItemText
                                primary={ item.title.charAt(0).toUpperCase() + item.title.slice(1) }
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    </Typography>
                                    {item.body.charAt(0).toUpperCase() + item.body.slice(1)}
                                    </React.Fragment>
                                }
                                />
                                <Box sx={{ display:'flex', flexDirection:'column' }}>
                                    <Link to={`/admin/posts/${item.id}/edit`} style={{color:'#000'}} onClick={()=>{
                                            setEdit(true)
                                            setNewtitle(`${item.title}`)
                                            setNewbody(`${item.body}`)
                                            setId(`${item.id}`)
                                        }}>
                                        <ModeEditIcon/>
                                    </Link>
                                    <DeleteIcon onClick={()=>{
                                            setId(`${item.id}`)
                                            setDel(true)
                                        }}/>
                                </Box>
                            </ListItem>
                        </Card>
                    </div>
                ))}
                </List>
                <Box sx={{position:'fixed', bottom: 20, right:30}}>
                    <Link to="/admin/create" onClick={()=>{setOpen(true)}}>
                        <Fab color="primary" aria-label="add">
                            <AddIcon/>
                        </Fab>
                    </Link>
                </Box>
                <Modal open={open}
                    onClose={()=>{
                        history.push('/admin')
                        setOpen(false)
                        setTitle('')
                        setBody('')
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box 
                        className="modal"
                        sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth:'90%',
                        bgcolor: '#fff',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography variant="h5" sx={{marginBottom:5}}>Create Post</Typography>
                        <TextField variant="outlined" label="Title" 
                        sx={{ width:'100%',marginBottom:3 }} onChange={(e)=>setTitle(e.target.value)}/>
                        <TextareaAutosize 
                            aria-label="body"
                            placeholder="Description"
                            style={{width:'100%', minHeight:100, marginBottom:10}}
                            onChange={(e)=>setBody(e.target.value)}
                        />
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <Button variant="contained" color="primary" onClick={()=>{
                                try {
                                    const fdata = {
                                        userId: userid,
                                        title: title,
                                        body: body
                                    }
                                    axios.post('https://jsonplaceholder.typicode.com/posts',fdata).then(async(res)=>{
                                        try {
                                            setOpen(false)
                                            setTitle('')
                                            setBody('')
                                            Loading()
                                            window.location.href="/admin"
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    })
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>Save</Button> &nbsp;
                            <Button variant="contained" color="error" onClick={()=>{
                                history.push('/admin')
                                setOpen(false)
                                Loading()
                            }}>Cancel</Button>
                        </Box> 
                    </Box>
                </Modal>
                <Modal open={edit} onClose={()=>{
                    setNewbody('')
                    setNewtitle('')
                    setEdit(false)
                }}>
                    <Box
                        className="modal" 
                        sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth:'90%',
                        bgcolor: '#fff',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography variant="h5" sx={{marginBottom:5}}>Edit Post</Typography>
                        <TextField variant="outlined" label="Title" 
                        sx={{ width:'100%',marginBottom:3 }} defaultValue={newtitle} onChange={(e)=>setNewtitle(e.target.value)}/>
                        <TextareaAutosize 
                            aria-label="body"
                            placeholder="Description"
                            style={{width:'100%', minHeight:100, marginBottom:10}}
                            defaultValue={newbody}
                            onChange={(e)=>setNewbody(e.target.value)}
                        />
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <Button variant="contained" color="primary" onClick={()=>{
                                try {
                                    const fdata = {
                                        id: id,
                                        title: newtitle,
                                        body: newbody
                                    }
                                    axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`,fdata).then(async(res)=>{
                                        try {
                                            setEdit(false)
                                            setNewtitle('')
                                            setNewbody('')
                                            setId(null)
                                            Loading()
                                            window.location.href="/admin"
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    })
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>Save</Button> &nbsp;
                            <Button variant="contained" color="error" onClick={()=>{
                                history.push('/admin')
                                setEdit(false)
                                Loading()
                            }}>Cancel</Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal open={del} onClose={()=>{
                    setDel(false)
                    setId(null)

                }}>
                    <Box
                        className="modal"
                        sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth:'95%',
                        bgcolor: '#fff',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography variant="h5" sx={{marginBottom:5}}>Delete this post?</Typography>
                        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <Button variant="contained" color="primary" onClick={()=>{
                                try {
                                    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res)=>{
                                        console.log(res.status);
                                        if(res.status === 200){
                                            setDel(false)
                                            setId(null)
                                            history.push('/admin')
                                        }
                                    })
                                } catch (error) {
                                    
                                }
                            }}>Yes</Button> &nbsp; 
                            <Button variant="contained" color="error" onClick={()=>{
                                setDel(false)
                                setId(null)
                            }}>No</Button>
                        </Box>
                    </Box>
                </Modal>
            </Container>
        )
    }else{
        return (
            <Redirect to="/login"/>
        )
    }
}

export default AdminPage

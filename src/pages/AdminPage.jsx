import React, { useContext,useEffect,useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { AllContext } from '../hooks/AllContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { Card, Container, TextField, Fab, Modal, Button, TextareaAutosize } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Box } from '@mui/system';

const AdminPage = () => {
    const {auth,userid } = useContext(AllContext)
    const [poster, setPoster] = useState([])
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const Loading = async() => {
        try {
            let resp = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userid}`)
            setPoster(resp.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    const filtered = (post) => {
        return post.title.toUpperCase().indexOf(search.toUpperCase()) > -1
    }

    useEffect(()=>{
        const getPoster = async() => {
            try {
                let res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userid}`)
                setPoster(res.data)
            } catch (error) {
                console.log(error);
            }
        };
        getPoster();
    },[])
  
    if(auth){
        return (
            <Container fixed>
                <Box sx={{ display:'flex', justifyContent:'flex-end', p:1 }}>
                    <TextField label="Search" variant="outlined" onChange={(e)=>setSearch(e.target.value)}/>
                </Box>
                <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
                {poster.filter(filtered).map((item,i)=>(
                    <Card variant='outlined' style={{marginBottom:5}} key={i}>
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
                            <FavoriteIcon id={i} sx={{ color: pink[500] }}/>
                        </ListItem>
                    </Card>
                ))}
                </List>
                <Box sx={{position:'fixed', bottom: 20, right:30}}>
                    <Fab color="primary" aria-label="add" onClick={()=>{
                        setOpen(true)
                    }}>
                        <AddIcon/>
                    </Fab>
                </Box>
                <Modal open={open}
                onClose={()=>{
                    setOpen(false)
                    setTitle('')
                    setBody('')
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
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
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    })
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>Save</Button> &nbsp;
                            <Button variant="contained" color="error" onClick={()=>{
                                setOpen(false)
                                Loading()
                            }}>Cancel</Button>
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

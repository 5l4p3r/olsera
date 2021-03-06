import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, Card, CardContent, Container, Modal, Pagination, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import { Box } from '@mui/system';

const Home = () => {
    const [total, setTotal] = useState(0)
    const [poster,setPoster] = useState([])
    const [open, setOpen] = useState(false)
    const [liked, setLiked] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const getPosters = async() => {
        try {
            let resp = await axios.get('https://jsonplaceholder.typicode.com/posts')
            setTotal(resp.data.length/5)
            let res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5`)
            setPoster(res.data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        getPosters();
    },[])
    return (
        <Container fixed>
            <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
                {poster.map((item,i)=>(
                    <Card variant='outlined' style={{marginBottom:5, height:85, backgroundColor:`${i % 2 === 0 ? "#eee" : "#fff"}` }} key={i}>
                        <ListItem alignItems="flex-start" style={{border: 1, position:"static" }}>
                            <ListItemText onClick={async()=>{
                                try {
                                    let resp = await axios.get(`https://jsonplaceholder.typicode.com/posts/${item.id}`)
                                    setTitle(resp.data.title)
                                    setBody(resp.data.body)
                                    let res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${item.id}`)
                                    setLiked(res.data)
                                    setOpen(true)
                                } catch (error) {
                                    console.log(error);
                                }
                            }}
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
                            <Button variant="text" onClick={(e)=>{
                                let x = document.getElementById(`${i}`)
                                if(x.style.color === 'grey'){
                                    x.style.color = 'red'
                                }else{
                                    x.style.color = 'grey'
                                }
                            }}>
                                <FavoriteIcon id={i} style={{ color: 'grey' }} />
                            </Button>
                        </ListItem>
                    </Card>
                ))}
            </List>
            <Stack spacing={2}>
                <Pagination 
                    count={total}
                    color="primary"
                    onChange={async(event,value)=>{
                        try {
                            let res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${value}&_limit=5`)
                            setPoster(res.data)
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                />
            </Stack>
            <Modal open={open} onClose={()=>{
                setOpen(false)
                setLiked([])
                setTitle('')
                setBody('')
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
                    overflow:'scroll',
                    height:'90%',
                    p: 4,
                }}>
                    <Box>
                        <Typography variant="h5" sx={{marginBottom:3}}>{title.charAt(0).toUpperCase() + title.slice(0)}</Typography>
                        <Typography variant="p" sx={{marginBottom:2}}>{body}</Typography>
                        <Box sx={{marginBottom:2,padding:1}}>
                            <Box sx={{display:'flex', flexDirection:'row'}}>
                                    <Typography variant='h6' sx={{fontSize:14}} onClick={()=>{
                                        let x = document.getElementById('coment')
                                        if(x.style.display === 'none'){
                                            x.style.display = 'block'
                                        }else{
                                            x.style.display = 'none'
                                        }
                                    }}>Comments</Typography>
                                    <ArrowDropDownIcon onClick={()=>{
                                        let x = document.getElementById('coment')
                                        if(x.style.display === 'none'){
                                            x.style.display = 'block'
                                        }else{
                                            x.style.display = 'none'
                                        }
                                    }}/>
                                </Box> 
                            <div id="coment" style={{display:'none'}}>
                            {liked.map((item,i)=>(
                                <Card key={i}>
                                    <CardContent sx={{margin:1}}>
                                        <Typography variant='caption' sx={{ fontSize:14,fontStyle:'inherit' }}>{item.email + " - " + item.name}</Typography>
                                        <Typography sx={{ fontSize:12,fontStyle:'inherit' }}>{item.body}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                            </div>
                        </Box>
                    </Box>
                    <Box sx={{ display:'flex',alignItems:'flex-end', justifyContent:'flex-end' }}>
                        <Button color="info" variant='text' onClick={()=>{
                            setOpen(false)
                            setLiked([])
                            setTitle('')
                            setBody('')
                        }}>Close</Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    )
}

export default Home

import { Button, Card, TextField, Typography, Container, Modal } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useState } from 'react'
import { Redirect, useHistory } from 'react-router'
import { AllContext } from '../hooks/AllContext'

const Login = () => {
    const {auth,setUserid,setAuth,setPoster} = useContext(AllContext)
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [open, setOpen] = useState(false)
    const history = useHistory()

    if(auth){
        return (
            <Redirect to='/admin'/>
        )
    }else{
        return (
            <Container fixed>
                <Box sx={{p:6, display: 'flex', justifyContent:'center'}}>
                    <Card variant="outlined">
                        <Box sx={{ p: 1, bgcolor: 'grey.500', alignItems:'center'}}>
                            <Box sx={{p:1}}>
                                <Typography variant="h5">
                                    {"Login"}
                                </Typography>
                            </Box>
                            <Box sx={{p:1}}>
                                <TextField label="Userid" variant="outlined" onChange={(e)=>{setUser(e.target.value)}}/>
                            </Box>
                            <Box sx={{p:1}}>
                                <TextField label="Email" variant="outlined" onChange={(e)=>{setEmail(e.target.value)}}/>
                            </Box>
                            <Box sx={{ p:1,alignItems:'flex-end' }}>
                                <Button color="inherit" variant="contained" onClick={()=>{
                                    history.push('/')
                                }}>Cancel</Button> &nbsp;
                                <Button color="primary" variant="contained" onClick={async()=>{
                                    try {
                                        await axios.get(`https://jsonplaceholder.typicode.com/users/${user}`).then(async(res)=>{
                                            setAuth(true)
                                            setUserid(res.data.id)
                                            await Cookies.set('auth',true)
                                            await Cookies.set('userid', res.data.id)
                                            await Cookies.set('email', email)
                                        })
                                        await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user}`).then((resp)=>{
                                            setPoster(resp.data)
                                        })
                                    } catch (error) {
                                        setOpen(true)
                                    }
                                }}>Login</Button>
                            </Box>
                        </Box>
                    </Card>
                </Box>
                <Modal 
                    open={open}
                    onClose={()=>{
                        setOpen(false)
                    }}>
                        <Box
                            sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth:'95%',
                            bgcolor: '#fff',
                            borderRadius:5,
                            p: 1,
                        }}>
                            <Box>
                                <Typography variant="h6" color="initial">User id and Email not match !</Typography>
                            </Box>
                        </Box>
                </Modal>
            </Container>
        )
    }
}

export default Login

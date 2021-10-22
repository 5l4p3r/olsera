import { Button, Card, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useState } from 'react'
import { Redirect, useHistory } from 'react-router'
import { AllContext } from '../hooks/AllContext'

const Login = () => {
    const {auth,setUserid,setAuth} = useContext(AllContext)
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const history = useHistory()

    if(auth){
        return (
            <Redirect to='/admin'/>
        )
    }else{
        return (
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
                                        if(email === res.data.email){
                                            await setAuth(true)
                                            await setUserid(res.data.id)
                                            await Cookies.set('auth',true)
                                            await Cookies.set('userid', res.data.id)
                                            await Cookies.set('email', email)
                                        }else{
                                            return (
                                                alert('UserId & Email Do Not match')
                                            )
                                        }
                                    })
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>Login</Button>
                        </Box>
                    </Box>
                </Card>
            </Box>
        )
    }
}

export default Login

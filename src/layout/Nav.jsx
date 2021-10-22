import { AppBar, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { AllContext } from '../hooks/AllContext'
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';

const Nav = () => {
    const pathname = window.location.pathname
    const {auth,setAuth} = useContext(AllContext)
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(pathname.charAt(1));

    return (
        <Container fixed sx={{position:'-webkit-sticky', backgroundColor:'primary'}}>
            <Box sx={{ flexGrow:1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={()=>{
                                history.push('/')
                                handleClose()
                            }}>Home</MenuItem>
                            <MenuItem onClick={()=>{
                                history.push('/admin')
                                handleClose()
                            }}>Admin</MenuItem>
                            <MenuItem onClick={()=>{
                                Cookies.remove('auth')
                                Cookies.remove('userid')
                                setAuth(false)
                                handleClose()
                            }}>Logout</MenuItem>
                        </Menu>
                        <IconButton 
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr:2 }}
                            onClick={handleClick}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography typeof="button" variant="h6" component="div" sx={{flexGrow:1}} onClick={()=>{
                            history.push('/')
                        }}>Home</Typography>
                        {auth ? (
                            <Button color="inherit" onClick={()=>{
                                history.push('/admin')
                            }}>Admin</Button>
                        ):(
                            <Button color="inherit" onClick={()=>{
                                history.push('/login')
                            }}>Login</Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </Container>
    )
}

export default Nav

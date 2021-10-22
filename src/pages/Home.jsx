import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { Card, Container, Pagination, Stack } from '@mui/material';
import axios from 'axios';

const Home = () => {
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [poster,setPoster] = useState([])

    

    useEffect(()=>{
        const getPosters = async() => {
            try {
                let resp = await axios.get('https://jsonplaceholder.typicode.com/posts')
                setTotal(resp.data.length/5)
                let res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`)
                setPoster(res.data)
            } catch (error) {
                console.log(error);
            }
        };
        getPosters();
    },[])
    return (
        <Container fixed>
            <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
                {poster.map((item,i)=>(
                    <Card variant='outlined' style={{marginBottom:5, height:85, backgroundColor:`${i % 2 === 0 ? "#eee" : "#fff"}` }} key={i}>
                        <ListItem alignItems="flex-start" style={{border: 1, position:"static" }}>
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
            <Stack spacing={2}>
                <Pagination 
                    count={total}
                    color="primary"
                    onChange={async(event,value)=>{
                        setPage(value)
                        try {
                            let res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`)
                            setPoster(res.data)
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                />
            </Stack>
        </Container>
    )
}

export default Home

import React, { useContext } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { AllContext } from '../hooks/AllContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { Card, Container } from '@mui/material';

const Home = () => {
    const {poster} = useContext(AllContext)

    return (
        <Container maxWidth="md">
            <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
                {poster.map((item,i)=>(
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
        </Container>
    )
}

export default Home
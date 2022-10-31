import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@mui/material';
import {useDispatch} from 'react-redux';
import memories from './images/memories.png';
import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';
import {getPost} from './actions/posts.js'
import useStyles from './styles.js';


const App = ()=> {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [CurrentId, setCurrentId] = useState(null);

  useEffect(()=>{
    dispatch(getPost());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>
          Memories
          <img className={classes.image} src= {memories} alt='memories' height='60' />
        </Typography>
      </AppBar>
      <Grow in>
        <div className={classes.main}>

        <Container>
          <Grid container justifyContent='centre' alignItems='stretch' spacing ='2'>
            <Grid item xs={12} sm={7}> <Posts setCurrentId={setCurrentId}/> </Grid>
          </Grid>
        </Container>

        <Container>
          <Grid container justifyContent='centre' alignItems='stretch' spacing ='2'>
            <Grid item xs={12} sm={7}> <Form CurrentId ={CurrentId} setCurrentId={setCurrentId}/> </Grid>
          </Grid>
        </Container>
            
        </div>
      </Grow>
    </Container>
  );
}

export default App;

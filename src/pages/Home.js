import React, { useContext } from 'react';
import {useQuery} from '@apollo/react-hooks'

import {Grid,Card,Transition,Segment,Image,Divider, List} from 'semantic-ui-react'
import PostCard from '../components/PostCard.js';
import { AuthContext } from '../context/auth.js';
import PostForm from '../components/PostForm'
import {FETCH_POSTS_QUERY} from '../utils/graphql'

function Home(){
    const {user}=useContext(AuthContext)
    const{loading, data:{getPosts:posts}} = useQuery(FETCH_POSTS_QUERY);
    
    return(
        
        <Card fluid >
<Card.Content>
       <div className= 'grid'> 
       

    <Grid columns={1}>
        
    <Grid.Row className ="page-title">
    <h1>EZIM FORWARD</h1>
    <h1>Recent Posts</h1>
    </Grid.Row>   
    <Grid.Row>
        {user &&(
            <Grid.Column>
                <PostForm/>
            </Grid.Column>
            
        )}
        
      {loading ? (
          <h1>Loading post..</h1>
          
      ):(
         <Transition.Group>
             {posts && posts.map((post) =>(
            <Grid.Column key = {post.id}style ={{marginBottom:20}}>
            <PostCard post={post}/>
          </Grid.Column>
         ))}
         </Transition.Group>
      )}
      </Grid.Row>
      
    </Grid>
    
    </div>
    </Card.Content>
    </Card>
    );
    
    
    }


export default Home;
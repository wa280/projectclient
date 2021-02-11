import React,{useContext, useState,useRef} from 'react'
import gql from 'graphql-tag'
import {Link,Redirect} from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/react-hooks'
import { Button,Image,TextArea, Icon,Label,Form, Card, Grid } from 'semantic-ui-react';
import LikeButton from '../components/LikeButton';
import moment from 'moment'
import {AuthContext} from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import NewPortal from '../components/NewPortal'
function SinglePost(props){
    
    const postId =props.match.params.postId;
    const {user} =useContext(AuthContext)
    const commentInputRef = useRef(null)
    const[comment,setComment] =useState('')

    const{data:{getPost}}=useQuery(FETCH_POSTS_QUERY,{
        variables:{
            postId
        }
    });
    const[submitComment] = useMutation(SUBMIT_COMMENT_MUTATION,{
        update(){
            setComment('');
            commentInputRef.current.blur();
        },
        variables:{
            postId,
            body:comment
        }
    })
    function deletePostCallback(){
        props.history.push('/')
    }
    const [isAuth,setIsAuth] = useState(true);
    if(!isAuth){
      return<Redirect to ="/Emails"/>
    }
let postMarkup;
if(!getPost){
    postMarkup =<p> Loading post...</p>
} else{
    const{id,body,createdAt,username,comments,likes,likeCount,commentCount} = getPost;
    postMarkup =(
        <div className= 'singleCard'>
            
        <Grid>
            <Grid.Row>
            <Grid.Column width={2}>
            <Image className='photo'
          floated='right'
          size='small'
          src='/a.jpg'
        /> 
        {username}
        <Card fluid>
        <Card.Content>
        
        </Card.Content>
        </Card>
            </Grid.Column>
            <Grid.Column width={13}>
            <Card fluid>
            <Card.Content>
            <Card.Header> {username}</Card.Header>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr/>
            <Card.Content extra>
            <LikeButton user ={user} post={{id,likeCount,likes}}/>

            <Button as ="div" labelPosition ="right" onClick ={()=>console.log('Comment on Post')}>
                <Button basic color = "teal">
                    <Icon name ="comments"/>
                    messages
                    </Button>
                    <Label basic color ="teal" pointing="left">
                        {commentCount}
                    </Label>
                    <NewPortal/>
                {user && user.username === username &&(
                    <>
                     
                    <DeleteButton postId={id} callback ={deletePostCallback}/> 
                   
                    </>
                )}
                  
            </Button>
            
      
    
            </Card.Content>
            </Card>
            {
               user && <Card fluid> 
               <Card.Content>
               <p>create message</p>
               <Form className ='inputing'>
                   <div className ="ui action input fluid">
                     <input type="text" placeholder="message.." name="comment" value={comment} onChange={event =>setComment(event.target.value)} ref= {commentInputRef}/>
                     {/*<TextArea placeholder='Tell us more' style={{ minHeight: 100 }, name="comment", value={comment}, onChange={event =>setComment(event.target.value)} ref= {commentInputRef}} />*/}
                       <Button type ="submit" className="ui button teal" disabled ={comment.trim() ===''} onClick={submitComment}>
                       <Icon name ="send"/>
                        
                       </Button>
                   </div>
               </Form>
               </Card.Content>
               </Card>
            }
            {comments.map(comment =>(
                <Card fluid key ={comment.id} >
                    <Card.Content>
                        {user && user.username === comment.username &&(
                            <DeleteButton postId={id} commentId={comment.id}/>
                        )}
                       <Card.Header> 
                           {comment.username}
                       </Card.Header>
                       <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                       <Card.Description>{comment.body}</Card.Description>
                    </Card.Content>

                </Card>
            ))}
            </Grid.Column>
            </Grid.Row>
        </Grid>
        </div>
    );
}
return postMarkup;
}
const FETCH_POSTS_QUERY =gql`
query($postId: ID!){
    getPost(postId: $postId){
        id
        body
        createdAt
        username
        likeCount
        likes{
            username
        }
        commentCount
        comments{
            id
            username
            createdAt
            body
        }
    }
}
`
const SUBMIT_COMMENT_MUTATION = gql`
mutation($postId:String!,$body:String!){
    createComment(postId:$postId, body:$body){
        id
        comments{
            id
            body
            createdAt
            username
        }
        commentCount
    }
}
`; 
export default SinglePost
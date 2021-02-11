import React,{useContext, useState} from 'react'
import {Card,Button,Icon,Label,Image,Popup, List, Container}from 'semantic-ui-react'
import {Link,Redirect} from 'react-router-dom'
import moment from 'moment'
import {AuthContext} from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'


function PostCard({post:{body,createdAt,id,username,likeCount,commentCount,likes}}){
  const {user} = useContext(AuthContext)
  
  const [isAuth,setIsAuth] = useState(true);
  if(!isAuth){
    return<Redirect to ="/Emails"/>
  }
return(

  
  <div className= 'card'>
<Card fluid >
<Card.Content>
<Image
          floated='right'
          size='mini'
          src='/a.jpg'
          
        />
        
        <Image
          floated='right'
          size='mini'
          src='/a.jpg'
          
        />
        
          
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          <Container>
          {body}
          </Container>
        </Card.Description>
        
      </Card.Content>
      <Card.Content extra>
      <LikeButton user ={user} post={{id,likes,likeCount}}/>
      <Popup content="open massages" inverted trigger={
      <Button  labelPosition='right' as ={Link} to={`/posts/${id}`}>
      <Button color='teal' basic>
        <Icon name='comments' />
        messages
      </Button>
      <Label  basic color='teal' pointing='left'>
        {commentCount}
      </Label>
    </Button>
    
      }/>
    {/*<Button  labelPosition='right' onClick={()=>setIsAuth(false)} as ={Link} to={'/Emails'}>
      <Button color='teal' basic>
        <Icon name='mail' />
        email
      </Button>
      <Label  basic color='teal' pointing='left'>
      <Icon name='mail' />
      </Label>
    </Button>*/}
    {user && user.username ===username && <DeleteButton postId ={id}/>}
    
       
      </Card.Content>
</Card>
</div>
)
}
export default PostCard
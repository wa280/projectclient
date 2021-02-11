
import React from 'react'
import{Button,TextArea, Icon,Form,Loader} from 'semantic-ui-react'
import {useForm} from '../utils/hooks'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import{FETCH_POSTS_QUERY} from '../utils/graphql'
const LoaderExampleInline = () => <Loader active inline />


function PostForm(){
    const {values, onChange,onSubmit} =useForm(createPostCallback, {
        body:''
    });
    const [createPost,{error}] = useMutation(CREATE_POST_MUTATION,{
      variables:values,
      update(proxy,result){
         const data = proxy.readQuery({
          query:FETCH_POSTS_QUERY
          })
          data.getPosts=[result.data.createPost, ...data.getPosts];
          proxy.writeQuery({query:FETCH_POSTS_QUERY,data});
          values.body='';
      }  
    });
    function createPostCallback(){
        createPost()
    }
    return(
        <>
        <div className='post'>
        {/*<div class="ui active inline loader"></div>*/}
        <Form onSubmit ={onSubmit}>
            <h2 className ='createPost'>Create Post:</h2>
            <Form.Field>
            <div className='post'>

                <TextArea placeholder ="message!"
                    name="body"
                    onChange ={onChange}
                    value ={values.body}
                    error ={error ? true : false} />
                </div>  
                <Button type ="submit" color="teal">
                <Icon name ="send"/>
                {/*<div class="ui active inline loader"></div>*/}
                </Button>
            </Form.Field>   
        </Form>   
        {error &&(
        <div className ="ui error massage" style ={{marginBottom:20}}>
         <ul className ="list">
         <li>{error.graphQLErrors[0].message}</li>
         </ul>
        </div>)}
        </div> 
        </> 
    )
}
const CREATE_POST_MUTATION = gql`
mutation createPost($body:String!){
    createPost(body:$body){
        id body createdAt username
        likes{
            id username createdAt
        }
        likeCount
        comments{
            id body username createdAt
        }
        commentCount
    }
}
`
export default PostForm
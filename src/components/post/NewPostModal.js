import React, { useState } from 'react'
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { Modal, Box, TextField, Button } from '@mui/material'

export default function NewPostModal({open, onClose}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const client = useApolloClient();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
  };
  const input ={
    width: 1,
    mt:1
  }
  const btn = {
    mt:3,
    ml:1
  }
  
  // add post funtion
  const addNewPost = async () =>{
    try{
      await client.mutate({
        mutation: gql`
          mutation addPost($title: String!, $content: String){
            addPost(title: $title, content: $content){
              id
              title
              content
              author {
                name
              }
              likeGivers {
                id
              }
              createdAt
            }
          }
        `,
        variables: {
          title,
          content
        },
      }).then((res) => {
        console.log(res);
      });
      setTitle('');
      setContent('');
      onClose();
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 sx={{ m:1 }}>
            Add Post
          </h1>
          <div>
            <TextField 
              id="title_input" 
              label="Title" 
              variant="standard" 
              sx={input} 
              value={title} 
              onChange={(e)=>{setTitle(e.target.value)}}
            />
          </div>
          <div>
            <TextField 
              id="content_input" 
              label="Content" 
              variant="standard" 
              sx={input} 
              value={content}
              onChange={(e)=>{setContent(e.target.value)}}
            />
          </div>

          <div sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant='outlined' size='small' onClick={onClose} sx={btn} >close</Button>
            <Button 
              variant='contained' 
              size='small' 
              color='success' 
              sx={btn} 
              onClick={addNewPost}
            >
              add post
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

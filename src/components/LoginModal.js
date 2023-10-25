import React, { useState } from 'react'
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { Modal, Box, TextField, Button } from '@mui/material'

export default function LoginModal({open, onClose}) {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  const handleLogin = async () =>{
    try{
      console.log(email)
      await client.mutate({
        mutation: gql`
          mutation Login($email: String!, $password: String!){
            login(email: $email, password: $password){
              token
            }
          }
        `,
        variables: {
          email,
          password
        },
      }).then((res) => {
        console.log(res);
        localStorage.setItem('x-token', res.data.login.token)
      });
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
            Login
          </h1>
          <div>
            <TextField 
              id="email_input" 
              label="Email" 
              variant="standard" 
              sx={input} 
              value={email} 
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div>
            <TextField 
              id="password_input" 
              label="Password" 
              variant="standard" 
              sx={input} 
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>

          <div sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant='outlined' size='small' onClick={onClose} sx={btn} >close</Button>
            <Button 
              variant='contained' 
              size='small' 
              color='success' 
              sx={btn} 
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

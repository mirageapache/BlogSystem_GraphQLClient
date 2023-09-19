import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { gql, useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

import PostCard from './PostCard';
import NewPostModal from './NewPostModal';

export default function Posts() {
  const [status, setStatus] = useState('rerender')
  const [modalOpen, setModalOpen] = useState(false);
  const [postData, setPostData] = useState();
  const client = useApolloClient();

  const getPostsList = gql`
    query getPostsList{
      posts{
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
    `;  
    
    // fetch post data
  const getPostData = () =>{
    client.query({
      query: getPostsList
    }).then((res) => {
      console.log(res);

      if(res.loading){
        setStatus('loading');
      }
      else if(res.error){
        setStatus('error');
      }
      else if(res.data){
        setStatus('success')
        setPostData(res.data)
      }  
    });  
  }

  const handleModalClose = () =>{
    setStatus('rerender')
    setModalOpen(false)
    // getPostData();
  }

  useEffect(() => {
    console.log(status)
    if(status === 'rerender'){
      getPostData()
    }
  },[postData,status])

return (
    <>
    {(status === 'loading') && <p>Loading...</p> }
    {(status === 'error') && <pre>{error.message}</pre> }
    {(status === 'success') &&
      <div>
      <h1>Post List</h1>
      <Button variant="contained" onClick={() => setModalOpen(true)}>New Post</Button>
      <div>
        {postData.posts.map(post => 
          <PostCard key={post.id} data={post} />
        )}
      </div>
      <NewPostModal open={modalOpen} onClose={handleModalClose} />
    </div>
    }
   </> 
  )
}



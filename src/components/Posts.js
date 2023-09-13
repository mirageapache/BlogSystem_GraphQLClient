import React from 'react'
import { Card, CardContent, Typography, CardActions } from '@mui/material';
import { Button } from '@mui/material'
import { gql, useQuery } from '@apollo/client';

export default function Posts() {
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

  const {data, loading, error} = useQuery(getPostsList);
  if(loading) return <p>Loading...</p>
  if(error) return <pre>{error.message}</pre>
  if(data) {
    return (
      <div>
        <h1>Post List</h1>
        {data.posts.map(post => 
          <PostCard key={post.id} data={post} />
        )}
      </div>
    )
  }
}


function PostCard({data}) {
  return (
    <div>
      <Card sx={{ margin: 3, minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            by {data.author.name}
          </Typography>
          <Typography variant="body2">
            {data.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  )
}

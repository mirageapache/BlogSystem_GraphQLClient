import React from 'react'
import { Card, CardContent, Typography, CardActions } from '@mui/material';
import { Button } from '@mui/material'

export default function PostCard({data}) {
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
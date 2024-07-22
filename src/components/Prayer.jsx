import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
const Prayer = ({name,time,image}) => {
    
  return (
        <Card sx={{maxWidth:365}} style={{marginInline:"30px" ,marginTop:'14px'}}>
            <CardMedia 
                sx={{height:140}}
                image={image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component="div">
                    {name}
                </Typography>
                <Typography variant='h2' color="text.secondary">
                    {time}
                </Typography>
            </CardContent>
        </Card>
      )
}

export default Prayer
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function TileImage(props) {
    const image = `${props.item.urls.small}`
    const user = `${props.item.user.first_name} ${props.item.user.last_name}`
    const userImage = `${props.item.user.profile_image.small}`
    // const { image, user, userImage , modalHandler } = props;
    return (
        <Card style={props.style} onClick={() => props.modalHandler(props.item)}>
            <CardMedia
                component="img"
                height="300px"
                style={{objectFit : "cover"}}
                image={image}
                alt="green iguana"
            />
            <CardContent>
                <Stack direction="row" spacing={2}>
                    <Avatar alt="user image" src={userImage} />
                    <Typography variant="body2" color="text.secondary">
                        {user}
                    </Typography>

                </Stack>

            </CardContent>
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}
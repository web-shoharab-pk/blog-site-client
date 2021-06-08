import React  from 'react';
import { Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

const Blog = ({ blog }) => {
  
    console.log(blog);
    const classes = useStyles();
    const { blogerName, blogTitle, blogDetails, imageURL } = blog;
 
    return (
     
       

            <Col className="mt-3">
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            width="400"
                            image={imageURL}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {blogTitle}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {blogDetails}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                           BLOG WRITER: {blogerName}
                        </Button>
                    </CardActions>
                </Card>
            </Col>
      
    );
};

export default Blog;
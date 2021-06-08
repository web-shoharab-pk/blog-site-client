import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { UserContext } from '../../App';
import Sidebar from './Sidebar/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'; 
import CardContent from '@material-ui/core/CardContent'; 
import Typography from '@material-ui/core/Typography'; 

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Dashboard = () => {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    console.log(user.photoURL);

    return (
        <Row>
            <Col xs lg="2">
                <Sidebar />
            </Col>
            <Col className="p-5 text-center" xs lg="10">
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <img src={user && user?.photoURL} alt="" />
                         <h4>{user && user.displayName}</h4>
                         <h4>{user && user.email}</h4>
                        
                    </CardContent>
                    
                </Card>
            </Col>
        </Row>
    );
};

export default Dashboard;
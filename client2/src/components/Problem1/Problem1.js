import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { TextField, Grid } from '@mui/material';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';
import { useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
}));


const API = axios.create({baseURL: 'http://localhost:5555'});

function Problem1() {

    const [Expand, setExpand] = useState(false);
    const [Answer, setAnswer] = useState('');
    const [Submitted, setSubmitted] = useState(false);
    const [isCorrect, setCorrect] = useState(false);
    const navigate = useNavigate();

    const handleAnswer = (event) => {
        setAnswer(event.target.value);
    }
    const handleAnswerBox = () => {
        setExpand(!Expand);
    }

    const handleSubmit = () => {
        const name = localStorage.getItem('name');
        const attempt = localStorage.getItem('attempt');
        const firstCorrect = localStorage.getItem('time');
        const answer = Answer;
        const user = {
            'name': name,
            'firstCorrect': firstCorrect,
            'attempt': attempt
        };
        setSubmitted(true);
        const body = {
            "answer": answer,
            "user": user
        }
        API.post('/problem1', body)
        .then(response => {
            console.log(response)
            if (response.data.message === "Correct") {
                setCorrect(true);
            } else {
                alert("Try again! :(")
            }
        });
    }

    const handleRestart = () => {
        navigate("/", {replace: true});
    }    

    return (
        <Container maxWidth='lg'>
            {!Submitted ?
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Problem 1
                        </Typography>
                        <Typography variant="h5" component="div">
                            Muliples of 3 and 5
                        </Typography>
                        <Typography variant="body2">
                            If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. 
                            The sum of these multiples is 23. 
                            Find the sum of all the multiples of 3 or 5 below 1000.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <ExpandMore
                            expand={Expand}
                            onClick={handleAnswerBox}
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={Expand} timeout='auto' unmountOnExit>
                        <Grid item sm={12} style={{marginLeft:'50px', marginRight:'50px'}}>
                            <TextField
                                type="number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                name="Answer"
                                onChange={handleAnswer}
                                variant="filled"
                                required={true}
                                fullWidth
                                label="Answer Here"
                                value={Answer}
                            />
                        </Grid>
                        <div style={{marginTop: '5px', marginLeft: '50px', marginBottom:'20px'}}>
                            <Button type="submit" variant="contained" color="secondary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </Collapse>
                </Card>
            : 
                <Card style={{display:'flex', justifyContent:'center', marginTop: '100px'}} sx={{ minWidth: 75 }}>
                    {isCorrect?
                        <div>
                            <Typography variant="h5" component="div">
                                {`Well done ${localStorage.getItem('name')}!`}
                            </Typography>
                            <WorkspacePremiumOutlinedIcon />
                            <Typography variant="body2">
                                {`Total Attempts: ${localStorage.getItem('attempt') + 1}`}
                            </Typography>
                        </div>     
                    :
                        <div>
                            <Typography variant="h5" component="div">
                                {`Try again ${localStorage.getItem('name')}!`}
                            </Typography>
                            <SentimentDissatisfiedTwoToneIcon style={{justifyContent:'center'}}/>
                            <Typography variant="body2">
                                {`Total Attempts: ${localStorage.getItem('attempt') + 1}`}
                            </Typography>
                        </div>  
                    }
                    <Button varient="outlined" color='secondary' startIcon={<ReplayCircleFilledIcon/>} onClick={handleRestart}>
                        Restart
                    </Button>
                        
                </Card>
            }
        </Container>
    )
};

export default Problem1
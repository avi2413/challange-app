import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

const API = axios.create({baseURL: 'http://localhost:5555'});

function Home() {
    const [Problem, setProblem] = useState('');

    const [Name, setName] = useState('');
    const [Attempts, setAttempts] = useState('');
    const [Attempts2, setAttempts2] = useState('');
    const [Time, setTime] = useState('');
    const [Time2, setTime2] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setProblem(event.target.value);
        localStorage.setItem('problem', Problem);
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = () => {
        API.post('/userinfo', { "name": Name })
        .then(response => {
            console.log("Home Res: ", response.data.users[0])
            setAttempts(Number(response.data.users[0].attempts) + 1)
            setTime('')
            setAttempts2(Number(response.data.users[0].attempts2))
            setTime2('')
            localStorage.setItem('name', Name)
            localStorage.setItem('attempt', Attempts)
            localStorage.setItem('time', Time)
            localStorage.setItem('attempt2', Attempts2)
            localStorage.setItem('time2', Time2)
        });
        

        navigate(`/${Problem}`, {replace: true});
    }

    return (
        <Container maxWidth='lg'>
            <FormControl fullWidth style={{marginTop: '100px'}}>
                <InputLabel>Problem</InputLabel>
                <Select
                    value={Problem}
                    label="Select a Problem"
                    onChange={handleChange}
                >
                    <MenuItem value={"problem1"}>Multiples of 3 and 5</MenuItem>
                    <MenuItem value={"problem2"}>Largest prime factor</MenuItem>
                </Select>
            </FormControl>
            <div style={{marginTop: '35px'}}>
                <Input name="name" label="Name" handleChange={handleNameChange} />
            </div>
            <div style={{marginTop: '50px'}}>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </Container>
    )
};

export default Home
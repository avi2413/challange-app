import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import p1Route from './routes/problem1.js';
import p2Route from './routes/problem2.js';
import leaderRoute from './routes/leaderboard.js';
import infoRoute from './routes/userinfo.js';

const app = express();

app.use(cors());

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

var usr = encodeURIComponent("avi");
var password = encodeURIComponent("chall3nge#2022")
const CONNECTION_URL = `mongodb+srv://${usr}:${password}@cluster0.788x8hf.mongodb.net/?retryWrites=true&w=majority`;
const PORT = 5555;

app.use('/problem1', p1Route);
app.use('/problem2', p2Route);
app.use('/leaderboard', leaderRoute);
app.use('/userinfo', infoRoute);

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
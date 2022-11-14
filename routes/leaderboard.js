import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/', (req, res) => {
    User.find()
        .exec((err, users) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success:true, users })
        })
})

export default router;
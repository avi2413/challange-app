import express from 'express';
import User from '../models/user.js';

const router = express.Router()

router.post('/', (req, res) => {
    var sum = 0
    for (var i=0; i<1000; i++) {
        if (i%3 === 0 || i%5 === 0) {
            sum += i;
        }
    }
    // if (req.body.answer === sum) {
    //     const user = new User({
    //         name: req.body.name,
    //         problem: "P1"
    //     });
    //     user
    //         .save()
    //         .then(result => {
    //             console.log(result);
    //             res.status(201).json({message: "Correct response saved!"});
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json({error: err});
    //         });
    // } else {
    //     const user = new User({
    //         name: req.body.name,
    //         isCorrect: 0,
    //         problem: "P1"
    //     });
    //     user
    //         .save()
    //         .then(result => {
    //             console.log(result);
    //             res.status(201).json({message: "Incorrect response. Try Again! Saved anyway:)"});
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json({error: err});
    //         });
    // }
    
    var query, updates;
    var opts = { "upsert": true };
    var message;
    const attempt = Number(req.body.user.attempt) + 1;
    console.log("Calculated: ", sum);
    console.log("Attempts: ", attempt);
    if (Number(req.body.answer) === sum) {
        query = { "name": req.body.user.name };
        if (req.body.hasOwnProperty('firstCorrect')) updates = { "firstCorrect": new Date(), "attempts": attempt };
        updates = { "attempts": attempt };
        message = "Correct";
    } else {
        query = { "name": req.body.user.name };
        updates = { "attempts": attempt };
        message = "Inorrect";
    }
    
    User.findOneAndUpdate(query, updates, opts)
        .exec((err, user) => {
            if (err) return res.status(400).send(err);
            res.status(201).json({"message": message, user});
        });
})

export default router;
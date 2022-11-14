import express from 'express';
import User from '../models/user.js';

const router = express.Router()

router.post('/', (req, res) => {
    let primeFactor = [];
    for (let itr = 0; itr <= 600851475143; itr++) {
        let isFactor = 600851475143 % itr == 0;
        let isPrime = true;

        if (isFactor) {
            for (let i = 2; i < itr; i++) {
                if (itr % i == 0) {
                    isPrime = false;
                    continue;
                }
            }
        }

        if (isFactor && isPrime) {
            primeFactor.push(itr);
        }
    }
    // if (req.body.answer === primeFactor.pop()) {
    //     const user = new User({
    //         name: req.body.name,
    //         isCorrect: 1,
    //         problem: "P2" 
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
    //         problem: "P2"
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
    if (Number(req.body.answer) === primeFactor.pop()) {
        query = { "name": req.body.user.name };
        if (req.body.hasOwnProperty('firstCorrect')) updates = { "firstCorrect2": new Date(), "attempts2": attempt };
        updates = { "attempts2": attempt };
        message = "Correct";
    } else {
        query = { "name": req.body.user.name };
        updates = { "attempts2": attempt };
        message = "Inorrect";
    }
    
    User.findOneAndUpdate(query, updates, opts)
        .exec((err, user) => {
            if (err) return res.status(400).send(err);
            res.status(201).json({"message": message, user});
        });
})

export default router;